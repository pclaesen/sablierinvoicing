"use client"
import React, { useState } from 'react';
import Header from '../app/components/Header';
import WithdrawalHandler from '../app/components/WithdrawalHandler';
import { createPdf } from '../app/components/PDFHandler';
import { getEnvioData } from '@/app/components/EnvioData';
import WalletConnectButton from '../app/components/WalletConnectButton'; // Import WalletConnectButton
import styles from '../styles/page.module.css';
import { useRouter } from 'next/router';

const HomePage = ({ account, setAccount }) => {
  const [streamId, setStreamId] = useState('');
  const [confirmedRequestData, setConfirmedRequestData] = useState(null);
  const [txHash, setTxHash] = useState('');
  const [blockExplorer, setBlockExplorer] = useState('');
  const router = useRouter();

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
        <WalletConnectButton onAccountChange={setAccount} /> // Use WalletConnectButton
      ) : (
        <>
          <Header />
          <div className={styles.accountInfo}>
            Enter your Sepolia stream ID (25 for example) and withdraw.
          </div>
          <WithdrawalHandler
            account={account}
            setStreamId={setStreamId}
            setConfirmedRequestData={setConfirmedRequestData}
            setTxHash={setTxHash}
            setBlockExplorer={setBlockExplorer}
          />
          <div className={styles.accountInfo}>
            Connected Account: {account}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
