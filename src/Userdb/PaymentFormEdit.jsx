import React, { useState, useEffect } from 'react';
import styles from './PaymentForm.module.css';
import axios from 'axios';

const EditPaymentsForm = () => {
    const [formData, setFormData] = useState({
        cardHolderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        debitCardNumber: '',
        debitCardHolderName: '',
        upiId: ''
    });

    const [alertMessage, setAlertMessage] = useState('');

    // Fetch the contact information on component mount
    useEffect(() => {
        const fetchPaymentInfo = async () => {
            const membershipId = localStorage.getItem('membershipId');
            if (membershipId) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/auth/payments/${membershipId}`);
                    if (response.data) {
                        setFormData(response.data);
                    }
                } catch (error) {
                    setAlertMessage('Error fetching payment information.');
                }
            }
        };

        fetchPaymentInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const membershipId = localStorage.getItem('membershipId');
    
        if (!membershipId) {
            setAlertMessage('No membership ID found.');
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:8081/api/auth/payments/${membershipId}`, formData);
            
            if (response.status === 200) {
                alert("payment information updated successfully!");
            } else {
                setAlertMessage('Error updating payment information. Please try again.');
            }
        } catch (error) {
            setAlertMessage('');
        }
    };

    return (
        <>
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.paymentForm}>
                <h2>payment Information</h2>
                <div className={styles.formGroup}>
                    <label>Cardholder Name (Credit Card):</label>
                    <input type="text" name="cardHolderName" value={formData.cardHolderName} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Card Number (Credit Card):</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Expiration Date (Credit Card):</label>
                    <input type="month" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>CVV (Credit Card):</label>
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
                </div>

                <h3>Debit Card Information</h3>
                <div className={styles.formGroup}>
                    <label>Cardholder Name (Debit Card):</label>
                    <input type="text" name="debitCardHolderName" value={formData.debitCardHolderName} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Card Number (Debit Card):</label>
                    <input type="text" name="debitCardNumber" value={formData.debitCardNumber} onChange={handleChange} required />
                </div>

                <h3>UPI Information</h3>
                <div className={styles.formGroup}>
                    <label>UPI ID:</label>
                    <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} required />
                </div>
                
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
            {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>}
        </div>
        </>
    );
};

export default EditPaymentsForm;
