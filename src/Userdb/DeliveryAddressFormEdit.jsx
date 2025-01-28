import React, { useState, useEffect } from 'react';
import styles from './DeliveryAddressForm.module.css';
import axios from 'axios';

const EditDeliveryAddressForm = () => {
    const [formData, setFormData] = useState({
        homeNumber: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: ''
    });

    const [alertMessage, setAlertMessage] = useState('');

    // Fetch the contact information on component mount
    useEffect(() => {
        const fetchContactInfo = async () => {
            const membershipId = localStorage.getItem('membershipId');
            if (membershipId) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/auth/delivery/${membershipId}`);
                    if (response.data) {
                        setFormData(response.data);
                    }
                } catch (error) {
                    setAlertMessage('Error fetching Delivery Address information.');
                }
            }
        };

        fetchContactInfo();
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
            const response = await axios.put(`http://localhost:8081/api/auth/delivery/${membershipId}`, formData);
            
            if (response.status === 200) {
                alert("Delivery Address information updated successfully!");
            } else {
                setAlertMessage('Error updating Delivery Address information. Please try again.');
            }
        } catch (error) {
            setAlertMessage('');
        }
    };

    return (
        <>
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.deliveryForm}>
                <h2>Delivery Address Information</h2>
                <div className={styles.formGroup}>
                    <label>HomeNumber</label>
                    <input type="text" name="homeNumber" value={formData.homeNumber} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Street</label>
                    <input type="text" name="street" value={formData.street} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>state</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>PinCode</label>
                    <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
            {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>}
        </div>
        </>
    );
};

export default EditDeliveryAddressForm;
