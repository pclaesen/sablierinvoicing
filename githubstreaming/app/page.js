'use client';

import React, { useState, useEffect } from 'react';
import WalletConnectButton from './components/WalletConnectButton';
import ParentComponent from './components/ParentComponent';
import WithdrawalHandler from './components/WithdrawalHandler';
import styles from './page.module.css';

const Page = () => {
  const [account, setAccount] = useState(null);
  const [streamId, setStreamId] = useState('');

  const handleAccountChange = (newAccount) => {
    setAccount(newAccount);
  };

  useEffect(() => {
    const savedAccount = localStorage.getItem('connectedWallet');
    if (savedAccount) {
      setAccount(JSON.parse(savedAccount));
    }
  }, []);

  return (
    <>
    <div className={styles.container}>
      <div className={styles.header}>
        <WalletConnectButton onAccountChange={handleAccountChange} />
      </div>
      {/* <main className={styles.main}>
        <WithdrawalHandler account={account} setStreamId={setStreamId} />
      </main> */}
    <ParentComponent account={account} />
    </div>
    
    <div>
      {account && (
          <div className={styles['account-info']}>
            <p>Connected Account: {account}</p>
          </div>
        )}
    </div>
    </>
  );
};

export default Page;
