"use client"
import React, { useState, useEffect } from 'react';
import WithdrawalHandler from './components/WithdrawalHandler';
import { createPdf } from './components/PDFHandler';
import styles from './page.module.css';
import { ethers } from 'ethers';

const HomePage = () => {
  const [account, setAccount] = useState('');
  const [streamId, setStreamId] = useState('');
  const [confirmedRequestData, setConfirmedRequestData] = useState(null);
  const [txHash, setTxHash] = useState('');
  const [blockExplorer, setBlockExplorer] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Connection failed:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  const handleCreatePdf = async () => {
    console.log('Confirmed Request Data:', confirmedRequestData);
    if (confirmedRequestData) {
      await createPdf(confirmedRequestData, txHash, blockExplorer);
    } else {
      console.error('No confirmed request data available to create PDF');
    }
  };

  return (
    <div className={styles.container}>
      {!account ? (
        <button onClick={connectWallet} className={styles.button}>
          Connect Wallet
        </button>
      ) : (
        <>
          <WithdrawalHandler
            account={account}
            setStreamId={setStreamId}
            setConfirmedRequestData={setConfirmedRequestData}
            setTxHash={setTxHash}
            setBlockExplorer={setBlockExplorer}
            confirmedRequestData={confirmedRequestData}
          />
          <button 
            onClick={handleCreatePdf} 
            className={styles.button} 
            disabled={!confirmedRequestData} 
            blockExplorer={blockExplorer}
            style={{
              backgroundColor: !confirmedRequestData ? 'grey' : '',
              cursor: !confirmedRequestData ? 'not-allowed' : 'pointer',
            }}
          >
            Create PDF
          </button>
          <div className={styles.accountInfo}>
            Connected Account: {account}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
