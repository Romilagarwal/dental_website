import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiCheck, FiX } from 'react-icons/fi';

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  notes?: string;
}

const AppointmentHistory: React.FC = () => {
  const appointments: Appointment[] = [
    {
      id: '1',
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Regular Checkup',
      status: 'completed',
      notes: 'Regular cleaning and checkup completed.'
    },
    // Add more appointments...
  ];

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'completed':
        return <FiCheck className="text-green-500" />;
      case 'cancelled':
        return <FiX className="text-red-500" />;
      default:
        return <FiClock className="text-blue-500" />;
    }
  };

  return (
    <div className="appointment-history">
      <h3 className="text-xl font-bold mb-6">Appointment History</h3>

      <div className="appointments-list">
        {appointments.map((appointment) => (
          <motion.div
            key={appointment.id}
            className={`appointment-card ${appointment.status}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="appointment-header">
              <div className="date-time">
                <FiCalendar className="icon" />
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                <FiClock className="icon" />
                <span>{appointment.time}</span>
              </div>
              <div className="status">
                {getStatusIcon(appointment.status)}
                <span>{appointment.status}</span>
              </div>
            </div>

            <div className="appointment-details">
              <h4>{appointment.type}</h4>
              {appointment.notes && <p>{appointment.notes}</p>}
            </div>

            {appointment.status === 'upcoming' && (
              <div className="appointment-actions">
                <button className="reschedule-btn">Reschedule</button>
                <button className="cancel-btn">Cancel</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHistory; 