import React, { useState, useEffect } from 'react';
import styles from './DependentsForm.module.css';
import axios from 'axios';

const EditDependentsForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        relationship: '',
        age: '',
        address: '',
        healthCondition: '',
        chronicIllness: '',
        chronicIllnessDetails: '',
        allergies: '',
        medications: '',
        emergencyContactName: '',
        emergencyContactPhone: ''
    });

    const [alertMessage, setAlertMessage] = useState('');

    // Fetch the contact information on component mount
    useEffect(() => {
        const fetchContactInfo = async () => {
            const membershipId = localStorage.getItem('membershipId');
            if (membershipId) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/auth/dependent/${membershipId}`);
                    if (response.data) {
                        setFormData(response.data);
                    }
                } catch (error) {
                    setAlertMessage('Error fetching dependents information.');
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
            const response = await axios.put(`http://localhost:8081/api/auth/dependent/${membershipId}`, formData);
            
            if (response.status === 200) {
                alert("Dependents information updated successfully!");
            } else {
                setAlertMessage('Error updating dependents information. Please try again.');
            }
        } catch (error) {
            setAlertMessage('');
        }
    };

    return (
        <>
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.dependentsForm}>
                <h2>Dependent Information</h2>
                 <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Relationship:</label>
                    <input
                        type="text"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h4>Address Information</h4>
                <div className={styles.formGroup}>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h4>Health Information</h4>
                <div className={styles.formGroup}>
                    <label>Do they have any chronic illness?</label>
                    <select
                        name="chronicIllness"
                        value={formData.chronicIllness}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                {formData.chronicIllness === 'Yes' && (
                    <div className={styles.formGroup}>
                        <label>Details of Chronic Illness:</label>
                        <textarea
                            name="chronicIllnessDetails"
                            value={formData.chronicIllnessDetails}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label>Any allergies?</label>
                    <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Current Medications:</label>
                    <textarea
                        name="medications"
                        value={formData.medications}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h4>Emergency Contact</h4>
                <div className={styles.formGroup}>
                    <label>Emergency Contact Name:</label>
                    <input
                        type="text"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Emergency Contact Phone:</label>
                    <input
                        type="tel"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
            {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>}
        </div>
        </>
    );
};

export default EditDependentsForm;
