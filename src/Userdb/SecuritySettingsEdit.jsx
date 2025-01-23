import React, { useState, useEffect } from 'react';
import styles from './SecuritySettings.module.css';
import axios from 'axios';

const EditSecurityForm = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        securityQuestion: '',
        securityAnswer: ''
    });

    const [alertMessage, setAlertMessage] = useState('');

    // Fetch the contact information on component mount
    useEffect(() => {
        const fetchSecurityInfo = async () => {
            const membershipId = localStorage.getItem('membershipId');
            if (membershipId) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/auth/security/${membershipId}`);
                    if (response.data) {
                        setFormData(response.data);
                    }
                } catch (error) {
                    setAlertMessage('Error fetching security information.');
                }
            }
        };

        fetchSecurityInfo();
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
            const response = await axios.put(`http://localhost:8081/api/auth/security/${membershipId}`, formData);
            
            if (response.status === 200) {
                alert("security information updated successfully!");
            } else {
                setAlertMessage('Error updating security information. Please try again.');
            }
        } catch (error) {
            setAlertMessage('');
        }
    };

    return (
        <>
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.securityForm}>
                <h2>Account Security</h2>
                <div className={styles.formGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your new password"
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm your new password"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Security Question (optional):</label>
                    <input
                        type="text"
                        name="securityQuestion"
                        value={formData.securityQuestion}
                        onChange={handleChange}
                        placeholder="Set a security question"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Security Answer:</label>
                    <input
                        type="text"
                        name="securityAnswer"
                        value={formData.securityAnswer}
                        onChange={handleChange}
                        placeholder="Provide an answer"
                    />
                </div>

                <button type="submit" className={styles.submitButton}>Save Security Settings</button>
            </form>

            {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
        </div>
        </>
    );
};

export default EditSecurityForm;
