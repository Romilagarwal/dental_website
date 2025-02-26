import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import './ClinicStatusWidget.scss';

interface ClinicStatus {
  isOpen: boolean;
  nextOpeningTime: string | null;
  schedule: {
    weekdays: string;
    sunday: string;
  };
}

const ClinicStatusWidget: React.FC = () => {
  const [status, setStatus] = useState<ClinicStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClinicStatus = async () => {
      try {
        const response = await axios.get('/api/clinic/status');
        setStatus(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching clinic status:', err);
        setError('Could not load clinic status');
      } finally {
        setLoading(false);
      }
    };

    fetchClinicStatus();
    
    // Poll for status updates every minute
    const intervalId = setInterval(fetchClinicStatus, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="clinic-status-widget loading">
        <FiClock className="icon" />
        <span>Checking clinic status...</span>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="clinic-status-widget error">
        <FiAlertCircle className="icon" />
        <span>Unable to check clinic status</span>
      </div>
    );
  }

  return (
    <motion.div 
      className={`clinic-status-widget ${status.isOpen ? 'open' : 'closed'}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FiClock className="icon" />
      <div className="status-content">
        <span className="status-label">
          {status.isOpen ? 'Open Now' : 'Closed Now'}
        </span>
        {!status.isOpen && status.nextOpeningTime && (
          <span className="next-opening">
            Opens {new Date(status.nextOpeningTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ClinicStatusWidget; 