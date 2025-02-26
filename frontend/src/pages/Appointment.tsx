import React from 'react';
import { motion } from 'framer-motion';
import AppointmentScheduler from '../components/AppointmentScheduler/AppointmentScheduler';

const Appointment: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Schedule Your Appointment
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Choose your preferred date and time for your dental appointment. 
          We'll confirm your appointment within 2 hours during business hours.
        </p>
        <AppointmentScheduler />
      </div>
    </motion.div>
  );
};

export default Appointment; 