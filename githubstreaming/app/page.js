"use client"
import React, { useState } from 'react';
import WalletConnectButton from './components/WalletConnectButton';
import RequestHandler from './components/RequestHandler';
import InputForm from './components/InputForm';
import styles from './page.module.css';

const Page = () => {
  const [account, setAccount] = useState(null);

  const handleAccountChange = (account) => {
    setAccount(account);
  };

  const handleSubmit = (inputValue) => {
    console.log('Submitted value:', inputValue);
  };

  return (
    <div className={styles.container}>
      <h1>My App</h1>
      <div className={styles['button-group']}>
        <WalletConnectButton onAccountChange={handleAccountChange} />
        <RequestHandler account={account} />
      </div>
      {account && (
        <div className={styles['account-info']}>
          <p>Connected Account: {account}</p>
        </div>
      )}
      <InputForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Page;
