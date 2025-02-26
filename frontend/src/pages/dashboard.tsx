import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiFileText, FiUser, FiClipboard } from 'react-icons/fi';
import Head from 'next/head';
import PatientPortal from '../components/PatientPortal/PatientPortal';
import { useAuth } from '../context/AuthContext';
import appointmentService from '../services/appointmentService';
import ProtectedRoute from '../components/ProtectedRoute';

// Define type for Appointment
interface Appointment {
  _id: string;
  date: string;
  time: string;
  service: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        try {
          const response = await appointmentService.getMyAppointments();
          const allAppointments = response.data || [];
          setAppointments(allAppointments);
          
          // Split appointments into upcoming and past
          const now = new Date();
          const upcoming = allAppointments.filter((apt: Appointment) => 
            new Date(apt.date) >= now && apt.status !== 'canceled'
          );
          const past = allAppointments.filter((apt: Appointment) => 
            new Date(apt.date) < now || apt.status === 'canceled'
          );
          
          setUpcomingAppointments(upcoming);
          setPastAppointments(past);
        } catch (err) {
          console.error('Error fetching appointments:', err);
        } finally {
          setLoadingAppointments(false);
        }
      }
    };
    
    if (!isLoading && user) {
      fetchAppointments();
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    return null; // ProtectedRoute component will handle redirect
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatServiceName = (service: string) => {
    return service
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l: string) => l.toUpperCase());
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>{t('dashboard.title')} | Dr. Reishu Agarwal Dental Clinic</title>
        <meta name="description" content={t('dashboard.metaDescription')} />
      </Head>
      
      <PatientPortal />
      
      <motion.div 
        className="dashboard-welcome"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.name}</h1>
        <p className="text-gray-600 mb-8">Manage your appointments and dental records</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Stats */}
          <motion.div 
            className="stats-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <FiClipboard className="text-blue-600 text-xl mr-2" />
              <h2 className="text-xl font-semibold">Your Dental Summary</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-item">
                <div className="stat-value">{upcomingAppointments.length}</div>
                <div className="stat-label">Upcoming Appointments</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{pastAppointments.length}</div>
                <div className="stat-label">Past Appointments</div>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div 
            className="actions-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <FiCalendar className="text-blue-600 text-xl mr-2" />
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => router.push('/appointments')}
                className="action-button"
              >
                <FiCalendar className="action-icon" />
                <span>Book Appointment</span>
              </button>
              
              <button 
                onClick={() => router.push('/contact')}
                className="action-button"
              >
                <FiUser className="action-icon" />
                <span>Contact Us</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Dashboard; 