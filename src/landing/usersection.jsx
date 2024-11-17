import React, { useState, useEffect } from 'react';
import styles from './UserPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook for navigation

const UserSection = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [membershipId, setMembershipId] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const storedMembershipId = localStorage.getItem('membershipId');
    if (storedMembershipId) {
      setMembershipId(storedMembershipId);
    } else {
      setError('No membership ID found in local storage');
    }
  }, []);

  const handleSubscribe = async () => {
    if (!membershipId) {
      setError('Membership ID is required.');
      return;
    }
    setError('');

    try {
      const response = await axios.get(`http://localhost:8081/api/auth/customer-details`, {
        params: { membershipId: membershipId }
      });

      if (response.status === 200) {
        const customer = response.data;
        setEmail(customer.email);
        setMobile(customer.phone);
        setSuccess('Profile fetched successfully.');

        // Store email in local storage
        localStorage.setItem('email', customer.email);

        // Send OTP to the user
        await sendOtp(customer.email);
      }
    } catch (error) {
      setError('Failed to fetch profile. Please try again.');
      console.log(error);
    }
  };

  const sendOtp = async (email) => {
    try {
      // API call to send OTP
      await axios.post('http://localhost:8081/api/auth/send-otp', { email });
      // Redirect user to OTP validation page after sending OTP
      navigate('/validate-otp'); // Use navigate for redirect
    } catch (error) {
      setError('Error sending OTP. Please try again.');
      console.log(error);
    }
  };

  return (
    <div className={styles.userPageContainer}>
      <div className={styles.userHeader}>
        <h1>Welcome to Your Dashboard</h1>
        <p>Explore your account and manage your profile settings.</p>
      </div>

      <div className={styles.userDetails}>
        <div className={styles.userInfo}>
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className={styles.userAvatar}
          />
          <h2>John Doe</h2>
          <p>Membership ID: {membershipId || 'Loading...'}</p>
        </div>

        <div className={styles.userActions}>
          <button onClick={handleSubscribe} className={styles.profileBtn}>My Profile</button>
        </div>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}

      <div className={styles.userFooter}>
        <p>&copy; 2024 My Application. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default UserSection;
