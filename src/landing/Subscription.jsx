import { useState } from 'react';
import axios from 'axios';
import styles from './Subscription.module.css';

const Subscription = () => {
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubscribe = async () => {
        if (!email || !mobile || !dob) {
            setError('All fields are required: email, mobile number, and date of birth.');
            setSuccess('');
            return;
        }

        // Clear any previous error messages
        setError('');

        try {
            const data = { email, phone: mobile, dob };
            const response = await axios.post('http://localhost:8081/api/auth/users', data);

            if (response.status === 200) {
                setSuccess('Subscription successful! Please check your email for further steps.');
                setEmail('');
                setMobile('');
                setDob('');
            }
        } catch (error) {
            setError('Failed to subscribe. Please try again.');
        }
    };

    return (
        <section className={styles.subscriptionContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.formContainer}>
                    <h2>Subscribe to Our Service</h2>
                    <p className={styles.description}>
                        Stay updated with our latest updates and exclusive offers. Join us today!
                    </p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="date"
                        placeholder="Enter your date of birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className={styles.inputField}
                    />
                    <button onClick={handleSubscribe} className={styles.subscribeButton}>
                        Subscribe
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                </div>
                <div className={styles.imageContainer}>
                    <img
                        src="https://res.cloudinary.com/dmdiia2yv/image/upload/v1737627310/ev_img_pe31dq.webp"
                        alt="Engaging subscription visual"
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
};

export default Subscription;
