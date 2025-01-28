import React, { useState, useEffect } from 'react';
import styles from './DependentsForm.module.css';
import axios from 'axios';

const EditHealthConditionsForm = () => {
    const [formData, setFormData] = useState({
        hasChronicIllness: '',
        chronicIllnessDetails: '',
        allergies: '',
        currentMedications: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
    });

    const [alertMessage, setAlertMessage] = useState('');

    // Fetch the contact information on component mount
    useEffect(() => {
        const fetchContactInfo = async () => {
            const membershipId = localStorage.getItem('membershipId');
            if (membershipId) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/auth/healthConditions/${membershipId}`);
                    if (response.data) {
                        setFormData(response.data);
                    }
                } catch (error) {
                    setAlertMessage('Error fetching Health Conditions information.');
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
            const response = await axios.put(`http://localhost:8081/api/auth/healthConditions/${membershipId}`, formData);
            
            if (response.status === 200) {
                alert("Health Conditions information updated successfully!");
            } else {
                setAlertMessage('Error updating Health Conditions information. Please try again.');
            }
        } catch (error) {
            setAlertMessage('');
        }
    };

    return (
        <>
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
                <h2>Health Condition Information</h2>
                <div className={styles.formGroup}>
                    <label>Do you have any chronic illness?</label>
                    <select
                        name="hasChronicIllness"
                        value={healthData.hasChronicIllness}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {errors.hasChronicIllness && <span className={styles.error}>{errors.hasChronicIllness}</span>}
                </div>

                {healthData.hasChronicIllness === 'Yes' && (
                    <div className={styles.formGroup}>
                        <label>Details of Chronic Illness:</label>
                        <textarea
                            name="chronicIllnessDetails"
                            value={healthData.chronicIllnessDetails}
                            onChange={handleChange}
                            required
                        />
                        {errors.chronicIllnessDetails && <span className={styles.error}>{errors.chronicIllnessDetails}</span>}
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label>Do you have any allergies?</label>
                    <textarea
                        name="allergies"
                        value={healthData.allergies}
                        onChange={handleChange}
                        required
                    />
                    {errors.allergies && <span className={styles.error}>{errors.allergies}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Are you currently taking any medications?</label>
                    <textarea
                        name="currentMedications"
                        value={healthData.currentMedications}
                        onChange={handleChange}
                        required
                    />
                    {errors.currentMedications && <span className={styles.error}>{errors.currentMedications}</span>}
                </div>

                <h3>Emergency Contact</h3>
                <div className={styles.formGroup}>
                    <label>Emergency Contact Name:</label>
                    <input
                        type="text"
                        name="emergencyContactName"
                        value={healthData.emergencyContactName}
                        onChange={handleChange}
                        required
                    />
                    {errors.emergencyContactName && <span className={styles.error}>{errors.emergencyContactName}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Emergency Contact Phone:</label>
                    <input
                        type="tel"
                        name="emergencyContactPhone"
                        value={healthData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                    />
                    {errors.emergencyContactPhone && <span className={styles.error}>{errors.emergencyContactPhone}</span>}
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
            {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>}
        </div>
        </>
    );
};

export default EditHealthConditionsForm;
