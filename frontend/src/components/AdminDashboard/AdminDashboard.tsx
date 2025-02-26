import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar, FiUsers, FiBriefcase, FiDollarSign,
  FiPieChart, FiSettings, FiBell, FiMessageSquare
} from 'react-icons/fi';
import DashboardStats from './DashboardStats.tsx';
import AppointmentList from './AppointmentList.tsx';
import PatientList from './PatientList.tsx';
import './AdminDashboard.scss';

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ComponentType;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs: DashboardTab[] = [
    { id: 'overview', label: 'Overview', icon: FiPieChart },
    { id: 'appointments', label: 'Appointments', icon: FiCalendar },
    { id: 'patients', label: 'Patients', icon: FiUsers },
    { id: 'treatments', label: 'Treatments', icon: FiBriefcase },
    { id: 'payments', label: 'Payments', icon: FiDollarSign },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="admin-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-header">
          <h2>Admin Dashboard</h2>
          <button className="notifications-btn">
            <FiBell />
            <span className="notification-badge">3</span>
          </button>
        </div>
        <div className="nav-tabs">
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
      </nav>

      <main className="dashboard-content">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && <DashboardStats />}
          {activeTab === 'appointments' && <AppointmentList />}
          {activeTab === 'patients' && <PatientList />}
          {/* Add other tab contents */}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
