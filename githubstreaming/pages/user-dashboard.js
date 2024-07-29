// user-dashboard.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
      const { streamId, withdrawnAmount, sablierContractAddress, transactionHash } = invoiceData;
      handleRequest(streamId, withdrawnAmount, sablierContractAddress, transactionHash); // Call function to handle request
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

  const filteredRequests = requests.filter(request => 
    (request.contentData.streamID) && 
    (request.payee.value.toLowerCase() === account.toLowerCase() || request.payer.value.toLowerCase() === account.toLowerCase())
  );

  const handleCreateInvoice = (streamId, withdrawnAmount, sablierContractAddress, transactionHash) => {
    setInvoiceData({ streamId, withdrawnAmount, sablierContractAddress, transactionHash });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
      </div>
      <div className={styles.main}>
        {account ? (
          <>
            <div className={styles.accountInfo}>
              Connected Account: {account}
            </div>
            <div className={styles.requests}>
              <h2>Your Sablier withdrawals</h2>
              {loading ? (
                <p className={styles.loading}>Loading envio data...</p>
              ) : envioData.length > 0 ? (
                envioData.map((data, index) => (
                  <div key={index} className={styles.requestItem}>
                    <p>Block Number: {data.number}</p>
                    <p>Date and time: {new Date(data.timestamp * 1000).toLocaleString()}</p>
                    <p>Amount: {Number((data.data) / 10e5)} {tokenDetails[`0x${data.topic3.slice(26)}`]?.symbol || "Loading..."}</p>
                    <p>Stream ID: {Number(data.topic1)}</p>
                    <p>Withdrawal transaction hash: {data.transaction_hash}</p>
                    <p>Sablier contract address: {data.address}</p>
                    <button 
                      onClick={() => handleCreateInvoice(Number(data.topic1), Number((data.data) * 10e6), data.address, data.transaction_hash)}
                      className={styles.button}
                    >
                      Create Invoice
                    </button>
                  </div>
                ))
              ) : (
                <p>No previous withdrawals found.</p>
              )}
            </div>
            <div className={styles.requests}>
              <h2>Your invoices</h2>
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
