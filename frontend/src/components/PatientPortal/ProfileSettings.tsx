import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  medicalHistory: {
    allergies: string[];
    conditions: string[];
    medications: string[];
  };
}

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: '123 Main St, Shahjahanpur, UP',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+91 98765 43211',
      relation: 'Spouse'
    },
    medicalHistory: {
      allergies: ['Penicillin'],
      conditions: ['Hypertension'],
      medications: ['Amlodipine']
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    setIsEditing(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
  };

  return (
    <div className="profile-settings">
      <h3 className="text-xl font-bold mb-6">Profile Settings</h3>

      <div className="settings-sections">
        <motion.section
          className="personal-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>Personal Information</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.name}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            {/* Add more form fields */}
            <div className="form-actions">
              {!isEditing ? (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </motion.section>

        <motion.section
          className="medical-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4>Medical Information</h4>
          <div className="medical-history">
            <div className="history-item">
              <h5>Allergies</h5>
              <ul>
                {profile.medicalHistory.allergies.map((allergy) => (
                  <li key={allergy}>{allergy}</li>
                ))}
              </ul>
            </div>
            {/* Add more medical history sections */}
          </div>
        </motion.section>

        <motion.section
          className="security"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4>Security</h4>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="change-password-btn">
              Change Password
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
};

export default ProfileSettings; 