import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Header from '../app/components/Header';
import styles from '../styles/page.module.css';
import { createClient } from '@supabase/supabase-js';
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { getEnvioData } from '../app/components/EnvioData';
import { getTokenDetails } from '../app/components/TokenLibrary'; 
import { handleRequest } from '../app/components/RequestHandler';
import { checkInvoiceExists, checkInvoiceNumberExists, fetchCompanyDetails } from '../app/components/SB_Helpers';
import { getRequestIdData } from '../app/components/RequestIdData';
import { createPdfRequestId } from '../app/components/CreatePDFRequestId';
import CustomerDetailsModal from '../app/components/CustomerDetailsModal';

const supabaseUrl = 'https://rnogylocxdeybupnqeyt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const UserDashboard = ({ account }) => {
  const [envioData, setEnvioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenDetails, setTokenDetails] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [buttonState, setButtonState] = useState({});
  const [invoiceExistsState, setInvoiceExistsState] = useState({});
  const [requestIdData, setRequestIdData] = useState({});
  const [companyDetails, setCompanyDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTransactionData, setModalTransactionData] = useState(null);

  const router = useRouter();
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: { 
      baseURL: "https://sepolia.gateway.request.network/",
    },
  });

  useEffect(() => {
    if (!account) {
      router.push('/');
    } else {
      fetchEnvioData();
      checkCompanyDetails(account);
    }
  }, [account]);

  async function fetchEnvioData() {
    setLoading(true);
    try {
      const data = await getEnvioData(account);
      data.sort((a, b) => b.timestamp - a.timestamp);
      setEnvioData(data);

      const uniqueTokenAddresses = [...new Set(data.map(item => `0x${item.topic3.slice(26)}`))];
      const tokenDetailsPromises = uniqueTokenAddresses.map(getTokenDetails);
      const tokenDetailsArray = await Promise.all(tokenDetailsPromises);

      const newTokenDetails = tokenDetailsArray.reduce((acc, details) => {
        acc[details.address] = details;
        return acc;
      }, {});

      setTokenDetails(newTokenDetails);

      const invoiceExistsPromises = data.map(item => checkInvoiceExists(item.transaction_hash));
      const invoiceExistsResults = await Promise.all(invoiceExistsPromises);

      const newInvoiceExistsState = invoiceExistsResults.reduce((acc, result, index) => {
        acc[data[index].transaction_hash] = result.exists ? result.invoiceNumber : null;
        return acc;
      }, {});

      setInvoiceExistsState(newInvoiceExistsState);

      let requestIdDataMap = {};
      for (const transactionHash in newInvoiceExistsState) {
        if (newInvoiceExistsState[transactionHash]) {
          const requestId = await loadRequestIdFromSupabase(transactionHash);
          const requestData = await getRequestIdData(requestId);
          requestIdDataMap[transactionHash] = requestData;
        }
      }

      setRequestIdData(requestIdDataMap);

    } catch (error) {
      console.error('Error fetching envio data:', error);
    } finally {
      setLoading(false);
    }
  }

  const checkCompanyDetails = async (account) => {
    const data = await fetchCompanyDetails(account);
    setCompanyDetails(data);
  };

  const handleInputChange = (key, event) => {
    const value = event.target.value;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleCreateInvoice = async (streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key, tokenAddress) => {
    if (!companyDetails) {
      console.error('Company details are not available.');
      return;
    }
  
    const invoiceNumberExists = await checkInvoiceNumberExists(invoiceNumber);
    if (invoiceNumberExists) {
      alert('This invoice number already exists. Please use a different number.');
      return;
    }
  
    const tokenDecimals = tokenDetails[tokenAddress]?.decimals;
    const bigNumberValue = ethers.BigNumber.from(withdrawnAmount);
    const formattedAmount = ethers.utils.formatUnits(bigNumberValue, tokenDecimals);
  
    setModalTransactionData({ 
      streamId, 
      withdrawnAmount: withdrawnAmount,  // Pass the original withdrawnAmount
      formattedAmount: formattedAmount,  // Pass the formatted amount for display
      sablierContractAddress, 
      transactionHash, 
      invoiceNumber, 
      key,
      tokenAddress  // Pass the tokenAddress
    });
    setShowModal(true);
  };

  const saveInvoiceDataToSupabase = async (invoiceNumber, transactionHash, requestId, account, key) => {
    const invoiceNumberExists = await checkInvoiceNumberExists(invoiceNumber);
    if (invoiceNumberExists) {
      console.error('Invoice number already exists:', invoiceNumber);
    } else {
      const { data, error } = await supabase
        .from('invoices')
        .upsert({ invoice_number: invoiceNumber, transaction_hash: transactionHash, request_id: requestId, user_address: account });

      if (error) {
        console.error('Error saving invoice data:', error);
      } else {
        setInputValues(prevValues => ({ ...prevValues, [key]: '' }));
        setInvoiceExistsState(prevState => ({ ...prevState, [transactionHash]: invoiceNumber }));
      }
    }
  };

  const loadRequestIdFromSupabase = async (transactionHash) => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('request_id')
        .eq('transaction_hash', transactionHash)
        .single();

      if (error) {
        console.error('Error loading requestId from Supabase:', error);
        return null;
      }

      return data.request_id;
    } catch (error) {
      console.error('Unexpected error loading requestId from Supabase:', error);
      return null;
    }
  };

  const handleViewInvoice = async (transactionHash) => {
    if (!companyDetails) {
      console.error('Company details are not available.');
      return;
    }

    const requestId = await loadRequestIdFromSupabase(transactionHash);
    if (requestId) {
      const requestData = await getRequestIdData(requestId);
      await createPdfRequestId(requestData);
    } else {
      console.error('Request ID not found.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalTransactionData(null);
  };

  const handleModalConfirm = async (transactionData, customerDetails) => {
    if (transactionData) {
      const { streamId, withdrawnAmount, formattedAmount, sablierContractAddress, transactionHash, invoiceNumber, key, tokenAddress } = transactionData;
      
      setButtonState(prevState => ({ ...prevState, [key]: 'loading' }));
  
      // Ensure withdrawnAmount is a positive integer
      const amountAsInt = BigInt(withdrawnAmount).toString();  // Ensure it's a string representation of a BigInt
  
      const tokenSymbol = tokenDetails[tokenAddress]?.symbol || 'Unknown';
  
      try {
        const result = await handleRequest(
          streamId, 
          amountAsInt, 
          formattedAmount.toString(),  // Pass the formatted amount as a string
          tokenSymbol,
          sablierContractAddress, 
          transactionHash, 
          invoiceNumber, 
          companyDetails, 
          customerDetails
        );
  
        if (result.success) {
          await saveInvoiceDataToSupabase(invoiceNumber, transactionHash, result.requestId, account, key);
          setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
        } else {
          setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
        }
      } catch (error) {
        console.error('Error handling request:', error);
        setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
      }
      handleModalClose();
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        Your Sablier withdrawals
        {account ? (
          <>
            <div className={styles.accountInfo}>
              Connected Account: {account}
            </div>
            <div className={styles.requests}>
              {loading ? (
                <p>Loading withdrawal data...</p>
              ) : envioData.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date and Time</th>
                      <th>Amount</th>
                      <th>Stream ID</th>
                      <th>Transaction Hash</th>
                      <th>Invoice Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {envioData.map((data) => {
                    const key = data.transaction_hash;
                    const tokenAddress = `0x${data.topic3.slice(26)}`;
                    const tokenDecimals = tokenDetails[tokenAddress]?.decimals;

                    // Convert withdrawnAmount (data.data) to BigNumber and format it correctly
                    const bigNumberValue = ethers.BigNumber.from(data.data);
                    const formattedAmount = tokenDecimals !== undefined 
                      ? ethers.utils.formatUnits(bigNumberValue, tokenDecimals)
                      : "Loading..."; // Fallback for when tokenDecimals is not available

                    const invoiceNumber = invoiceExistsState[key];

                    // Trimmed Transaction Hash
                    const trimmedHash = `${key.slice(0, 6)}...${key.slice(-6)}`;

                    return (
                      <tr key={key} className={styles.requestItem}>
                        <td>{new Date(data.timestamp * 1000).toLocaleString()}</td>
                        <td>{formattedAmount} {tokenDetails[tokenAddress]?.symbol || "Loading..."}</td>
                        <td>{Number(data.topic1)}</td>
                        <td>{trimmedHash}</td>
                        <td>
                          {invoiceNumber ? (
                            <span className={styles.invoiceCreated}>{invoiceNumber}</span>
                          ) : (
                            <input 
                              type="text" 
                              value={inputValues[key] || ''} 
                              onChange={(event) => handleInputChange(key, event)}
                              placeholder="Enter invoice number"
                              className={styles.input}
                            />
                          )}
                        </td>
                        <td>
                          {invoiceNumber && companyDetails ? (
                            <button 
                              onClick={() => handleViewInvoice(key)}
                              className={`${styles.button} ${buttonState[key] === 'loading' ? styles.buttonLoading : ''} ${buttonState[key] === 'success' ? styles.buttonSuccess : ''}`}
                            >
                              View Invoice
                            </button>
                          ) : invoiceNumber && !companyDetails ? (
                            <button 
                              onClick={() => router.push('/user-profile')}
                              className={`${styles.button} ${buttonState[key] === 'loading' ? styles.buttonLoading : ''} ${buttonState[key] === 'success' ? styles.buttonSuccess : ''}`}
                            >
                              Insert Details
                            </button>
                          ) : !invoiceNumber && companyDetails ? (
                            <button 
                              onClick={() => handleCreateInvoice(
                              Number(data.topic1), 
                              data.data,
                              data.address, 
                              data.transaction_hash, 
                              inputValues[key] || '', 
                              key,
                              tokenAddress
                            )}
                              className={`${styles.button} ${buttonState[key] === 'loading' ? styles.buttonLoading : ''} ${buttonState[key] === 'success' ? styles.buttonSuccess : ''}`}
                              disabled={!inputValues[key] || buttonState[key] === 'loading'}
                            >
                              {buttonState[key] === 'loading' ? 'Creating Invoice...' : 'Create Invoice'}
                            </button>
                          ) : (
                            <button 
                              onClick={() => router.push('/user-profile')}
                              className={`${styles.button} ${buttonState[key] === 'loading' ? styles.buttonLoading : ''} ${buttonState[key] === 'success' ? styles.buttonSuccess : ''}`}
                            >
                              Insert Company Details
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              ) : (
                <p>No previous withdrawals found.</p>
              )}
            </div>
          </>
        ) : (
          <p>Please connect your account to view your requests.</p>
        )}
      </div>

      {showModal && modalTransactionData && (
        <CustomerDetailsModal
          isOpen={showModal}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          transactionData={modalTransactionData}
        />
      )}
    </div>
  );
};

export default UserDashboard;
