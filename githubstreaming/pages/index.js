"use client"
import React, { useState } from 'react';
import WithdrawalHandler from '../app/components/WithdrawalHandler';
import { createPdf } from '../app/components/PDFHandler';
import { getEnvioData } from '@/app/components/EnvioData';
import styles from '../styles/page.module.css';
import { useRouter } from 'next/router';

const HomePage = ({ account, setAccount }) => {
  const [streamId, setStreamId] = useState('');
  const [confirmedRequestData, setConfirmedRequestData] = useState(null);
  const [txHash, setTxHash] = useState('');
  const [blockExplorer, setBlockExplorer] = useState('');
  const router = useRouter();

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
    if (confirmedRequestData) {
      await createPdf(confirmedRequestData, txHash, blockExplorer);
      setConfirmedRequestData(null);
    } else {
      console.error('No confirmed request data available to create PDF');
    }
  };

  const goToDashboard = () => {
    router.push('/user-dashboard');
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
          <button onClick={goToDashboard} className={styles.button}>
            Go to Dashboard
          </button>
          <button onClick={() => getEnvioData(account)} className={styles.button}>
            Envio
          </button>
        </>
      )}
    </div>
  );
};

export default HomePage;
