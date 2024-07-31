import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../app/components/Header';
import styles from '../styles/page.module.css';
import { RequestNetwork, Types } from "@requestnetwork/request-client.js";
import { getEnvioData } from '../app/components/EnvioData';
import { getTokenDetails } from '../app/components/TokenLibrary'; // Ensure this path is correct
import { handleRequest } from '../app/components/RequestHandler'; // Ensure this path is correct

const UserDashboard = ({ account }) => {
  const [requests, setRequests] = useState([]);
  const [envioData, setEnvioData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({});
  const [invoiceData, setInvoiceData] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [buttonState, setButtonState] = useState({});

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
            setButtonState(prevState => ({ ...prevState, [key]: 'success' }));
            setTimeout(() => {
              setButtonState(prevState => ({ ...prevState, [key]: 'default' }));
              setInputValues(prevValues => ({ ...prevValues, [key]: '' }));
            }, 5000);
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
    } catch (error) {
      console.error('Error fetching envio data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateInvoice = (streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key) => {
    setInvoiceData({ streamId, withdrawnAmount, sablierContractAddress, transactionHash, invoiceNumber, key });
    setButtonState(prevState => ({ ...prevState, [key]: 'loading' }));
  };

  const handleInputChange = (key, event) => {
    setInputValues(prevValues => ({ ...prevValues, [key]: event.target.value }));
  };

  const filteredRequests = requests.filter(request => 
    (request.contentData.streamID) && 
    (request.payee.value.toLowerCase() === account.toLowerCase() || request.payer.value.toLowerCase() === account.toLowerCase())
  );

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
              <h2>Your Sablier Withdrawals</h2>
              {loading ? (
                <p className={styles.loading}>Loading envio data...</p>
              ) : envioData.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Block Number</th>
                      <th>Date and Time</th>
                      <th>Amount</th>
                      <th>Stream ID</th>
                      <th>Withdrawal Transaction Hash</th>
                      <th>Sablier Contract Address</th>
                      <th>Invoice Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {envioData.map((data) => {
                      const key = data.transaction_hash; // Use transaction hash as unique key
                      return (
                        <tr key={key} className={styles.requestItem}>
                          <td>{data.number}</td>
                          <td>{new Date(data.timestamp * 1000).toLocaleString()}</td>
                          <td>{Number((data.data) / 10e5)} {tokenDetails[`0x${data.topic3.slice(26)}`]?.symbol || "Loading..."}</td>
                          <td>{Number(data.topic1)}</td>
                          <td>{data.transaction_hash}</td>
                          <td>{data.address}</td>
                          <td>
                            <input 
                              type="text" 
                              value={inputValues[key] || ''} 
                              onChange={(event) => handleInputChange(key, event)}
                              placeholder="Enter invoice number"
                              className={styles.input}
                            />
                          </td>
                          <td>
                            <button 
                              onClick={() => handleCreateInvoice(Number(data.topic1), Number((data.data) * 10e6), data.address, data.transaction_hash, inputValues[key] || '', key)}
                              className={`${styles.button} ${buttonState[key] === 'loading' ? styles.buttonLoading : ''} ${buttonState[key] === 'success' ? styles.buttonSuccess : ''}`}
                              disabled={!inputValues[key] || buttonState[key] === 'loading'}
                            >
                              {buttonState[key] === 'loading' ? 'Creating invoice...' : buttonState[key] === 'success' ? 'Invoice Created' : 'Create Invoice'}
                            </button>
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
            {/* <div className={styles.requests}>
              <h2>Your Invoices</h2>
              {loading ? (
                <p className={styles.loading}>Loading requests...</p>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((request, index) => (
                  <div key={index} className={styles.requestItem}>
                    <p>Request ID: {request.requestId}</p>
                    <p>Stream ID: {request.contentData.streamID}</p>
                    <p>Amount: {request.expectedAmount / 10e5} USDC</p>
                    <p>Payee: {request.payee.value}</p>
                    <p>Payer: {request.payer.value}</p>
                    <p>Withdrawal tx: {request.contentData.txHashWithdrawFromStream}</p>
                  </div>
                ))
              ) : (
                <p>No requests found.</p>
              )}
            </div> */}
          </>
        ) : (
          <p>Please connect your account to view your requests.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
