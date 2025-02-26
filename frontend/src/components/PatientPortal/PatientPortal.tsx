import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCalendar, FiFileText, FiCreditCard, FiSettings, FiX, FiClock } from 'react-icons/fi';
import DentalRecords from './DentalRecords';
import AppointmentHistory from './AppointmentHistory';
import PaymentHistory from './PaymentHistory';
import ProfileSettings from './ProfileSettings';
import './PatientPortal.scss';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import appointmentService from '../../services/appointmentService';

interface TabProps {
  id: string;
  label: string;
  icon: React.ComponentType;
}

const PatientPortal: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const tabs: TabProps[] = [
    { id: 'records', label: 'Dental Records', icon: FiFileText },
    { id: 'appointments', label: 'Appointments', icon: FiCalendar },
    { id: 'payments', label: 'Payments', icon: FiCreditCard },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'records':
        return <DentalRecords />;
      case 'appointments':
        return <AppointmentHistory />;
      case 'payments':
        return <PaymentHistory />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    }
  }, [activeTab]);
  
  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await appointmentService.getMyAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProfileUpdateSuccess(false);
    
    try {
      await updateProfile({
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone
      });
      setProfileUpdateSuccess(true);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPasswordUpdateSuccess(false);
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    try {
      await axios.put('/api/auth/updatepassword', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordUpdateSuccess(true);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError('Failed to update password. Please check your current password.');
    }
  };
  
  const handleCancelAppointment = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.cancelAppointment(id);
        fetchAppointments();
      } catch (error) {
        console.error('Error cancelling appointment:', error);
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="patient-portal">
      <div className="portal-header">
        <div className="user-info">
          <div className="avatar">
            <FiUser />
          </div>
          <div className="details">
            <h2>John Doe</h2>
            <p>Patient ID: P123456</p>
          </div>
        </div>
      </div>

      <div className="portal-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        className="portal-content"
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'appointments' && (
          <div className="appointments-tab">
            <h2>My Appointments</h2>
            
            {isLoading ? (
              <div className="loading">Loading your appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="no-appointments">
                <p>You don't have any appointments scheduled.</p>
                <motion.a 
                  href="/appointments" 
                  className="book-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.a>
              </div>
            ) : (
              <div className="appointments-list">
                {appointments.map((appointment: any) => (
                  <div 
                    key={appointment._id} 
                    className={`appointment-card ${appointment.status}`}
                  >
                    <div className="appointment-header">
                      <span className={`status-badge ${appointment.status}`}>
                        {appointment.status === 'scheduled' ? 'Upcoming' : 
                         appointment.status === 'completed' ? 'Completed' : 
                         appointment.status === 'canceled' ? 'Canceled' : 
                         appointment.status === 'rescheduled' ? 'Rescheduled' : 'No-show'}
                      </span>
                      {appointment.status === 'scheduled' && (
                        <button 
                          className="cancel-button"
                          onClick={() => handleCancelAppointment(appointment._id)}
                        >
                          <FiX /> Cancel
                        </button>
                      )}
                    </div>
                    
                    <div className="appointment-details">
                      <div className="detail-item">
                        <FiCalendar />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="detail-item">
                        <FiClock />
                        <span>{appointment.time}</span>
                      </div>
                      <h3 className="service-name">
                        {appointment.service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </h3>
                      {appointment.message && (
                        <div className="appointment-message">
                          <strong>Additional Notes:</strong>
                          <p>{appointment.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h2>My Profile</h2>
            
            {error && <div className="error-message">{error}</div>}
            {profileUpdateSuccess && (
              <div className="success-message">Profile updated successfully!</div>
            )}
            
            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <motion.button 
                type="submit" 
                className="update-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Update Profile
              </motion.button>
            </form>
          </div>
        )}
        
        {activeTab === 'password' && (
          <div className="password-tab">
            <h2>Change Password</h2>
            
            {error && <div className="error-message">{error}</div>}
            {passwordUpdateSuccess && (
              <div className="success-message">Password updated successfully!</div>
            )}
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input 
                  type="password" 
                  id="currentPassword" 
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                />
                <small>Password must be at least 6 characters long</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <motion.button 
                type="submit" 
                className="update-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Update Password
              </motion.button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PatientPortal; 