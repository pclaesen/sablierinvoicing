// CustomerDetailsModal.js
import React, { useState } from 'react';
import styles from '../../styles/modal.module.css'; // Adjust path as needed

const CustomerDetailsModal = ({ isOpen, onClose, onConfirm, transactionData }) => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [vatNumber, setVatNumber] = useState('');

  const handleConfirm = () => {
    const details = {
      companyName,
      address,
      postalCode,
      city,
      country,
      vatNumber
    };
    onConfirm(transactionData, details);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Customer Details</h2>
        <label>
          Company Name
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <label>
          Address
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Postal Code
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </label>
        <label>
          City
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          Country
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </label>
        <label>
          Company/VAT Number
          <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
        </label>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
