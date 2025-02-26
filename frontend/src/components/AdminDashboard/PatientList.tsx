import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiCalendar, FiFileText, FiSearch } from 'react-icons/fi';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contact: {
    phone: string;
    email: string;
  };
  lastVisit: string;
  upcomingAppointment?: string;
  medicalHistory: string[];
}

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const patients: Patient[] = [
    {
      id: '1',
      name: 'John Doe',
      age: 35,
      gender: 'male',
      contact: {
        phone: '+91 98765 43210',
        email: 'john@example.com'
      },
      lastVisit: '2024-01-15',
      upcomingAppointment: '2024-02-25',
      medicalHistory: ['Root Canal (2023)', 'Teeth Cleaning (2023)', 'Cavity Filling (2022)']
    },
    // Add more patients...
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.phone.includes(searchTerm) ||
    patient.contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-list">
      <div className="list-header">
        <h2>Patients Directory</h2>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="patients-grid">
        {filteredPatients.map((patient) => (
          <motion.div
            key={patient.id}
            className="patient-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="patient-header">
              <div className="patient-avatar">
                <FiUser className="avatar-icon" />
              </div>
              <div className="patient-basic-info">
                <h3>{patient.name}</h3>
                <p>{patient.age} years • {patient.gender}</p>
              </div>
            </div>

            <div className="patient-contact">
              <p><FiPhone className="icon" /> {patient.contact.phone}</p>
              <p><FiMail className="icon" /> {patient.contact.email}</p>
            </div>

            <div className="patient-visits">
              <p>
                <FiCalendar className="icon" />
                Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
              </p>
              {patient.upcomingAppointment && (
                <p className="upcoming">
                  Next Appointment: {new Date(patient.upcomingAppointment).toLocaleDateString()}
                </p>
              )}
            </div>

            <button
              className="view-history-btn"
              onClick={() => setSelectedPatient(patient.id === selectedPatient ? null : patient.id)}
              type="button"
            >
              <FiFileText /> View Medical History
            </button>

            <AnimatePresence>
              {selectedPatient === patient.id && (
                <motion.div
                  className="medical-history"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4>Medical History</h4>
                  <ul>
                    {patient.medicalHistory.map((record, index) => (
                      <li key={index}>{record}</li>
                    ))}
                  </ul>
                  <div className="action-buttons">
                    <button className="edit-btn" type="button">Edit Details</button>
                    <button className="schedule-btn" type="button">Schedule Appointment</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
