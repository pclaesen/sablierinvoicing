import React, { useState, useEffect } from 'react';
import styles from '../../styles/modal.module.css'; // Import the updated modal CSS file

const CustomerDetailsModal = ({ isOpen, onClose, onConfirm, transactionData }) => {
  const [customerDetails, setCustomerDetails] = useState({
    companyName: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    vatNumber: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    const isValid = customerDetails.address && customerDetails.postalCode && customerDetails.city && customerDetails.country;
    setIsFormValid(isValid);
  }, [customerDetails]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onConfirm(transactionData, customerDetails);
      onClose(); // Close the modal after confirming
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Enter Customer Details</h2>
        <form className={styles.modalForm}>
          <label className={styles.formLabel}>
            Company Name*
            <input
              type="text"
              name="companyName"
              value={customerDetails.companyName}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </label>
          <label className={styles.formLabel}>
            Address*
            <input
              type="text"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            Postal Code*
            <input
              type="text"
              name="postalCode"
              value={customerDetails.postalCode}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            City*
            <input
              type="text"
              name="city"
              value={customerDetails.city}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            Country*
            <input
              type="text"
              name="country"
              value={customerDetails.country}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            Company/VAT Number
            <input
              type="text"
              name="vatNumber"
              value={customerDetails.vatNumber}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </label>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.button}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`${styles.button} ${isFormValid ? styles.buttonEnabled : styles.buttonDisabled}`}
              disabled={!isFormValid} // Disable the button if the form is not valid
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
