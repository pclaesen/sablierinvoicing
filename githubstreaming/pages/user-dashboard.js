import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../app/components/Header';
import styles from '../styles/page.module.css';
import { createClient } from '@supabase/supabase-js';
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { getEnvioData } from '../app/components/EnvioData';
import { getTokenDetails } from '../app/components/TokenLibrary'; 
import { handleRequest } from '../app/components/RequestHandler';
import { checkInvoiceExists } from '../app/components/SB_Helpers';
import { getRequestIdData } from '../app/components/RequestIdData';
import { createPdfRequestId} from '../app/components/CreatePDFRequestId';

// Initialize Supabase client
const supabaseUrl = 'https://rnogylocxdeybupnqeyt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // Ensure this env variable is set
const supabase = createClient(supabaseUrl, supabaseKey);

const UserDashboard = ({ account }) => {
  const [requests, setRequests] = useState([]);
  const [envioData, setEnvioData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({});
  const [invoiceData, setInvoiceData] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [buttonState, setButtonState] = useState({});
  const [invoiceExistsState, setInvoiceExistsState] = useState({});
  const [requestIdData, setRequestIdData] = useState({});

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
    }
  }, [account]);

  useEffect(() => {
    if (invoiceData) {
      const { streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key } = invoiceData;
      handleRequest(streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber)
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
      const data = await getEnvioData(account);
      setEnvioData(data);

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
      for (const transactionHash in newInvoiceExistsState) {
        if (newInvoiceExistsState[transactionHash]) {
          const requestId = await loadRequestIdFromSupabase(transactionHash);
          const requestData = await getRequestIdData(requestId);
          setRequestIdData(prevState => ({ ...prevState, [transactionHash]: requestData }));
        }
      }

    } catch (error) {
      console.error('Error fetching envio data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateInvoice = async (streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key) => {
    setInvoiceData({ streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key });
    setButtonState(prevState => ({ ...prevState, [key]: 'loading' }));
  };

  const handleInputChange = (key, event) => {
    setInputValues(prevValues => ({ ...prevValues, [key]: event.target.value }));
  };

  const saveInvoiceDataToSupabase = async (invoiceNumber, transactionHash, requestId, key) => {
    const { error } = await supabase
      .from('invoices')
      .insert([{ invoice_number: invoiceNumber, transaction_hash: transactionHash, request_id: requestId }]);

    if (error) {
      console.error('Error saving invoice data to Supabase:', error);
      setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
    } else {
      console.log('Invoice data saved successfully.');
      setInvoiceExistsState(prevState => ({ ...prevState, [transactionHash]: invoiceNumber }));
      setButtonState(prevState => ({ ...prevState, [key]: 'success' }));
      setTimeout(() => {
        setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
        setInputValues(prevValues => ({ ...prevValues, [key]: '' }));
      }, 5000);
    }
  };

  // const saveAccountAddressToSupabase = async (account) => {
  //   const { error } = await supabase
  //     .from('companyDetails')
  //     .insert({ user_address: account }, { onConflict: 'user_address' });

  //   if (error) {
  //     console.error('Error saving account address to Supabase:', error);
  //   } else {
  //     console.log('Account address saved successfully.');
  //   }
  // };

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
    const requestId = await loadRequestIdFromSupabase(transactionHash);
    if (requestId) {
      const requestData = await getRequestIdData(requestId);
      await createPdfRequestId(requestData);
    } else {
      console.error('Request ID not found.');
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        {account ? (
          <>
            <div className={styles.accountInfo}>
              Connected Account: {account}
            </div>
            <div className={styles.requests}>
              <h2>Your Sablier withdrawals</h2>
              {loading ? (
                <p className={styles.loading}>Loading Sablier withdrawals...</p>
              ) : envioData.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Block Number</th>
                      <th>Date and Time</th>
                      <th>Amount</th>
                      <th>Stream ID</th>
                      <th>Transaction Hash</th>
                      <th>Contract Address</th>
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
                          <td>{data.number}</td>
                          <td>{new Date(data.timestamp * 1000).toLocaleString()}</td>
                          <td>{Number((data.data) / 10e5)} {tokenDetails[`0x${data.topic3.slice(26)}`]?.symbol || "Loading..."}</td>
                          <td>{Number(data.topic1)}</td>
                          <td>{data.transaction_hash}</td>
                          <td>{data.address}</td>
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
                            {invoiceNumber ? (
                              <button 
                                onClick={() => handleViewInvoice(key)}
                                className={`${styles.button} ${buttonState[key] === 'loading' ? styles.buttonLoading : ''} ${buttonState[key] === 'success' ? styles.buttonSuccess : ''}`}
                              >
                                View Invoice
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleCreateInvoice(Number(data.topic1), Number((data.data) * 10e6), data.address, data.transaction_hash, inputValues[key] || '', key)}
                                className={`${styles.button} ${buttonState[key] === 'loading' ? styles.buttonLoading : ''} ${buttonState[key] === 'success' ? styles.buttonSuccess : ''}`}
                                disabled={!inputValues[key] || buttonState[key] === 'loading'}
                              >
                                {buttonState[key] === 'loading' ? 'Creating invoice...' : 'Create Invoice'}
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
    </div>
  );
};

export default UserDashboard;
