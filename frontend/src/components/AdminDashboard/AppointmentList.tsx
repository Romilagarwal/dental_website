import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiMoreVertical } from 'react-icons/fi';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  contact: {
    phone: string;
    email: string;
  };
}

const AppointmentList: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'John Doe',
      date: '2024-02-20',
      time: '10:00 AM',
      type: 'Regular Checkup',
      status: 'scheduled',
      contact: {
        phone: '+91 98765 43210',
        email: 'john@example.com'
      }
    },
    // Add more appointments...
  ];

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    // Update appointment status logic
    console.log('Status changed:', appointmentId, newStatus);
  };

  return (
    <div className="appointment-list">
      <div className="list-header">
        <h2>Appointments</h2>
        <div className="filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button
            className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
        </div>
      </div>

      <div className="appointments-table">
        {appointments.map((appointment) => (
          <motion.div
            key={appointment.id}
            className="appointment-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="patient-info">
              <FiUser className="icon" />
              <span>{appointment.patientName}</span>
            </div>
            <div className="appointment-time">
              <FiCalendar className="icon" />
              <span>{new Date(appointment.date).toLocaleDateString()}</span>
              <FiClock className="icon" />
              <span>{appointment.time}</span>
            </div>
            <div className="appointment-type">
              <span>{appointment.type}</span>
            </div>
            <div className="appointment-status">
              <select
                value= {appointment.status}
                onChange={(e) => handleStatusChange(appointment.id, e.target.value as Appointment['status'])}
                className={`status-select ${appointment.status}`}
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              className="more-btn"
              onClick={() => setSelectedAppointment(appointment.id === selectedAppointment ? null : appointment.id)}
            >
              <FiMoreVertical />
            </button>

            <AnimatePresence>
              {selectedAppointment === appointment.id && (
                <motion.div
                  className="appointment-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="contact-info">
                    <p><FiPhone className="icon" /> {appointment.contact.phone}</p>
                    <p><FiMail className="icon" /> {appointment.contact.email}</p>
                  </div>
                  <div className="action-buttons">
                    <button className="reschedule-btn">Reschedule</button>
                    <button className="cancel-btn">Cancel</button>
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

export default AppointmentList;
