// components/ParentComponent.js
import React, { useState } from 'react';
import WithdrawalHandler from './WithdrawalHandler';
import { createPdf } from './PDFHandler';
import styles from '../page.module.css';

const ParentComponent = ({ account }) => {
  const [streamId, setStreamId] = useState('');
  const [confirmedRequestData, setConfirmedRequestData] = useState(null);

  const handleCreatePdf = async () => {
    if (confirmedRequestData) {
      await createPdf(confirmedRequestData);
    } else {
      console.error('No confirmed request data available to create PDF');
    }
  };

  return (
    <div className={styles.container}>
      <WithdrawalHandler
        account={account}
        setStreamId={setStreamId}
        setConfirmedRequestData={setConfirmedRequestData}
      />
      <button onClick={handleCreatePdf} className={styles.button}>
        Create PDF
      </button>
    </div>
  );
};

export default ParentComponent;
