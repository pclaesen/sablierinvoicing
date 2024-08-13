import React, { useEffect, useState } from 'react';
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
import CustomerDetailsModal from '../app/components/CustomerDetailsModal'; // Import the modal

const supabaseUrl = 'https://rnogylocxdeybupnqeyt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const UserDashboard = ({ account }) => {
  const [requests, setRequests] = useState([]);
  const [envioData, setEnvioData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set to true to show loading state
  const [tokenDetails, setTokenDetails] = useState({});
  const [invoiceData, setInvoiceData] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [buttonState, setButtonState] = useState({});
  const [invoiceExistsState, setInvoiceExistsState] = useState({});
  const [requestIdData, setRequestIdData] = useState({});
  const [companyDetails, setCompanyDetails] = useState(null);
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [modalTransactionData, setModalTransactionData] = useState(null); // Data for modal

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
      // Check session storage for existing data
      const sessionEnvioData = sessionStorage.getItem('envioData');
      const sessionTokenDetails = sessionStorage.getItem('tokenDetails');
      const sessionInvoiceExistsState = sessionStorage.getItem('invoiceExistsState');
      const sessionRequestIdData = sessionStorage.getItem('requestIdData');

      if (sessionEnvioData && sessionTokenDetails && sessionInvoiceExistsState && sessionRequestIdData) {
        setEnvioData(JSON.parse(sessionEnvioData));
        setTokenDetails(JSON.parse(sessionTokenDetails));
        setInvoiceExistsState(JSON.parse(sessionInvoiceExistsState));
        setRequestIdData(JSON.parse(sessionRequestIdData));
        setLoading(false); // Loading complete
      } else {
        fetchEnvioData();
      }

      checkCompanyDetails(account);
    }
  }, [account]);

  useEffect(() => {
    if (invoiceData) {
      const { streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, companyDetails, key } = invoiceData;
      handleRequest(streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, companyDetails)
        .then((result) => {
          if (result.success) {
            saveInvoiceDataToSupabase(invoiceNumber, transactionHash, result.requestId, key);
          } else {
            setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
          }
        })
        .catch(() => {
          setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
        });
      setInvoiceData(null); // Reset invoiceData after request is handled
    }
  }, [invoiceData]);

  async function fetchEnvioData() {
    setLoading(true);
    try {
        // Fetch Envio Data
        const data = await getEnvioData(account);

        // Sort data by timestamp in descending order
        data.sort((a, b) => b.timestamp - a.timestamp);

        setEnvioData(data);

        // Fetch token details
        const uniqueTokenAddresses = [...new Set(data.map(item => `0x${item.topic3.slice(26)}`))];
        const tokenDetails = await Promise.all(uniqueTokenAddresses.map(async (address) => {
            const details = await getTokenDetails(address);
            return { address, ...details };
        }));

        const tokenDetailsMap = tokenDetails.reduce((acc, curr) => {
            acc[curr.address] = curr;
            return acc;
        }, {});

        setTokenDetails(tokenDetailsMap);

        // Check if invoices exist for each transaction and get invoice numbers
        const invoiceExistsPromises = data.map(item => checkInvoiceExists(item.transaction_hash));
        const invoiceExistsResults = await Promise.all(invoiceExistsPromises);

        const newInvoiceExistsState = invoiceExistsResults.reduce((acc, result, index) => {
            acc[data[index].transaction_hash] = result.exists ? result.invoiceNumber : null;
            return acc;
        }, {});

        setInvoiceExistsState(newInvoiceExistsState);

        // Load requestId data for all transactions with an existing invoice
        let requestIdDataMap = {};
        for (const transactionHash in newInvoiceExistsState) {
            if (newInvoiceExistsState[transactionHash]) {
                const requestId = await loadRequestIdFromSupabase(transactionHash);
                const requestData = await getRequestIdData(requestId);
                requestIdDataMap[transactionHash] = requestData;
            }
        }

        // Update requestIdData state
        setRequestIdData(requestIdDataMap);

        // Save processed data to session storage
        sessionStorage.setItem('envioData', JSON.stringify(data));
        sessionStorage.setItem('tokenDetails', JSON.stringify(tokenDetailsMap));
        sessionStorage.setItem('invoiceExistsState', JSON.stringify(newInvoiceExistsState));
        sessionStorage.setItem('requestIdData', JSON.stringify(requestIdDataMap));

    } catch (error) {
        console.error('Error fetching envio data:', error);
    } finally {
        setLoading(false);
    }
  }

  const checkCompanyDetails = async (account) => {
    const data = await fetchCompanyDetails(account);
    setCompanyDetails(data);
    //console.log('Company Details:', data); // Ensure data is logged
  };

  // Define the handleInputChange function to manage the invoice number inputs
  const handleInputChange = (key, event) => {
    const value = event.target.value;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleCreateInvoice = async (streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key) => {
    if (!companyDetails) {
      console.error('Company details are not available.');
      return;
    }
  
    // Check if invoice number already exists
    const invoiceNumberExists = await checkInvoiceNumberExists(invoiceNumber);
    if (invoiceNumberExists) {
      console.error('Invoice number already exists:', invoiceNumber);
      // You might want to show an error message to the user here
      // For example:
      alert('This invoice number already exists. Please use a different number.');
      return;
    }
  
    setModalTransactionData({ streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key });
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
        // Clear input value and update state after saving
        setInputValues(prevValues => ({ ...prevValues, [key]: '' }));

        // Update session storage after saving new invoice data
        const updatedInvoiceExistsState = { ...invoiceExistsState, [transactionHash]: invoiceNumber };
        sessionStorage.setItem('invoiceExistsState', JSON.stringify(updatedInvoiceExistsState));
        setInvoiceExistsState(updatedInvoiceExistsState);
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
      const { streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key } = transactionData;
      
      // Set button state to 'loading'
      setButtonState(prevState => ({ ...prevState, [key]: 'loading' }));
  
      const result = await handleRequest(streamId, 
        withdrawnAmount, 
        sablierContractAddress, 
        transactionHash, 
        invoiceNumber, 
        companyDetails,  // This should be the company details from state
        customerDetails  // This is coming from the modal
      );
      if (result.success) {
        await saveInvoiceDataToSupabase(invoiceNumber, transactionHash, result.requestId, account, key);
        // Set button state back to 'default' after successful creation
        setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
      } else {
        // Set button state back to 'default' if there's an error
        setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
      }
      handleModalClose(); // Close the modal after processing
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
                <p>Loading data...</p>
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
                      const invoiceNumber = invoiceExistsState[key];
                      return (
                        <tr key={key} className={styles.requestItem}>
                          <td>{new Date(data.timestamp * 1000).toLocaleString()}</td>
                          <td>{Number((data.data) / 10e5)} {tokenDetails[`0x${data.topic3.slice(26)}`]?.symbol || "Loading..."}</td>
                          <td>{Number(data.topic1)}</td>
                          <td>{data.transaction_hash}</td>
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
                                Number((data.data) * 10e6), 
                                data.address, 
                                data.transaction_hash, 
                                inputValues[key] || '', 
                                key
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

      {/* Modal component */}
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
