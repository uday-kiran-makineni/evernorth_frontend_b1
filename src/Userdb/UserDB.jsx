import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAddressCard, FaCreditCard, FaHome, FaHeartbeat, FaUsers, FaLock } from 'react-icons/fa';
import styles from './UserDB.module.css';
import Headernox from '../landing/Headernox';
import Footer from '../login/Footer';
import ContactForm from './ContactForm';
import PaymentForm from './PaymentForm';
import DeliveryAddressForm from './DeliveryAddressForm';
import HealthConditionForm from './HealthConditionForm';
import DependentsForm from './DependentsForm';
import SecuritySettings from './SecuritySettings';
import EditContactForm from './ContactFormEdit';
import EditPaymentsForm from './PaymentFormEdit';
import EditDeliveryAddressForm from './DeliveryAddressFormEdit';
import EditHealthConditionsForm from './HealthConditionsFormEdit';
import EditDependentsForm from './DependentsFormEdit';
import EditSecurityForm from './SecuritySettingsEdit';

const UserDB = () => {
    const [sections, setSections] = useState([]);
    const [selectedTab, setSelectedTab] = useState(1); // Default to first tab

    useEffect(() => {
        // Retrieve membershipId from local storage
        const membershipId = localStorage.getItem('membershipId');

        if (membershipId) {
            // Fetch user data from the backend
            axios.get(`http://localhost:8081/api/auth/user-status/${membershipId}`)
                .then(response => {
                    const userData = response.data;
                    console.log(response.data);
                    const initialSections = [
                        { id: 1, title: 'Contact Information', icon: <FaAddressCard />, completed: userData.contactInformation || false },
                        { id: 2, title: 'Payment Methods', icon: <FaCreditCard />, completed: userData.paymentInformation || false },
                        { id: 3, title: 'Delivery Address', icon: <FaHome />, completed: userData.deliveryAddressInformation || false },
                        { id: 4, title: 'Health Conditions', icon: <FaHeartbeat />, completed: userData.healthInformation || false },
                        { id: 5, title: 'Add Dependents', icon: <FaUsers />, completed: userData.dependentInformation || false },
                        { id: 6, title: 'Security Settings', icon: <FaLock />, completed: userData.securityInformation || false }
                    ];
                    setSections(initialSections);
                })
                .catch(error => {
                    console.error("There was an error fetching the user data!", error);
                });
        } else {
            console.error("No membership ID found in local storage.");
        }
    }, []);

    // Callback function for updating section completion status
    const markSectionAsCompleted = (id) => {
        setSections(prevSections => prevSections.map(section =>
            section.id === id ? { ...section, completed: true } : section
        ));
    };

    const renderForm = () => {
        switch (selectedTab) {
            case 1:
                if (sections[0]?.completed) {
                    return <EditContactForm />;
                }
                return <ContactForm markAsCompleted={() => markSectionAsCompleted(1)} />;
            case 2:
                if (sections[1]?.completed) {
                    return <EditPaymentsForm />;
                }
                return <PaymentForm markAsCompleted={() => markSectionAsCompleted(2)} />;
            case 3:
                if (sections[2]?.completed) {
                    return <EditDeliveryAddressForm />;
                }
                return <DeliveryAddressForm markAsCompleted={() => markSectionAsCompleted(3)} />;
            case 4:
                if (sections[3]?.completed) {
                    return <EditHealthConditionsForm />;
                }
                return <HealthConditionForm markAsCompleted={() => markSectionAsCompleted(4)} />;
            case 5:
                if (sections[4]?.completed) {
                    return <EditDependentsForm />;
                }
                return <DependentsForm markAsCompleted={() => markSectionAsCompleted(5)} />;
            case 6:
                if (sections[5]?.completed) {
                    return <EditSecurityForm />;
                }
                return <SecuritySettings markAsCompleted={() => markSectionAsCompleted(6)} />;
            default:
                return <ContactForm markAsCompleted={() => markSectionAsCompleted(1)} />;
        }
    };

    return (
        <>
            <Headernox />
            <div className={styles.dbcontainer}>
                <h2 className={styles.dbheader}>Member Profile Setup Page</h2>
                <p className={styles.description}>Complete each section to ensure your profile is up-to-date.</p>
                <div className={styles.tabsContainer}>
                    <div className={styles.tabsColumn}>
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className={`${styles.tab} ${selectedTab === section.id ? styles.selectedTab : ''}`}
                                onClick={() => setSelectedTab(section.id)}
                            >
                                <div className={styles.groupcont}>
                                    <div className={styles.iconContainer}>{section.icon}</div>
                                    <h3 className={styles.heading}>{section.title}</h3>
                                </div>
                                <div className={styles.status}>
                                    <span className={section.completed ? styles.statusCompleted : styles.statusUncompleted}>
                                        Status: {section.completed ? 'Completed' : 'Uncompleted'}
                                    </span>
                                    <button
                                        onClick={() => setSelectedTab(section.id)}
                                        className={styles.dbbutton}
                                    >
                                        {section.completed ? 'Edit Section' : 'Complete Section'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.formContainer}>
                        {renderForm()}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserDB;
