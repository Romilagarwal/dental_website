import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Calendar from 'react-calendar';
import { FiClock, FiCalendar, FiUser, FiPhone, FiMail, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';
import 'react-calendar/dist/Calendar.css';
import './AppointmentScheduler.scss';
import PaymentProcessor from '../PaymentProcessor/PaymentProcessor';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const AppointmentScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState('');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  // Fetch available time slots when date changes
  useEffect(() => {
    const fetchTimeSlots = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const response = await axios.get(`/api/appointments/availability?date=${formattedDate}`);
        setTimeSlots(response.data.timeSlots);
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setError('Failed to load available time slots. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTime) {
      setError('Please select a time slot');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const appointmentData = {
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        patientName: formData.name,
        phone: formData.phone,
        email: formData.email,
        notes: formData.notes,
      };
      
      const response = await axios.post('/api/appointments', appointmentData);
      
      // After successful appointment creation, proceed to payment
      setCurrentAppointmentId(response.data.data._id);
      setShowPayment(true);
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setAppointmentBooked(true);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    // Optionally, you can cancel the appointment here or mark it as unpaid
  };

  return (
    <motion.div 
      className="appointment-scheduler"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {success}
        </div>
      )}
      
      <div className="scheduler-container">
        <div className="calendar-section">
          <h3><FiCalendar /> Select a Date</h3>
          <Calendar 
            onChange={handleDateChange} 
            value={selectedDate}
            minDate={new Date()}
            className="custom-calendar"
          />
        </div>
        
        <div className="form-section">
          <h3><FiClock /> Choose a Time</h3>
          
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading available times...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <FiAlertCircle />
              <p>{error}</p>
            </div>
          ) : (
            <div className="time-slots">
              {timeSlots.map((slot, index) => (
                <label 
                  key={index}
                  className={`time-slot ${!slot.available ? 'unavailable' : ''} ${selectedTime === slot.time ? 'selected' : ''}`}
                  aria-disabled={!slot.available}
                >
                  <input 
                    type="radio" 
                    name="timeSlot" 
                    value={slot.time} 
                    disabled={!slot.available}
                    checked={selectedTime === slot.time}
                    onChange={() => handleTimeSelect(slot.time)}
                  />
                  <span>{slot.time}</span>
                  {!slot.available && <span className="booked-label">Booked</span>}
                </label>
              ))}
            </div>
          )}
          
          <h3><FiUser /> Your Information</h3>
          {showPayment ? (
            <PaymentProcessor 
              appointmentId={currentAppointmentId}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          ) : !appointmentBooked && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea 
                  id="notes" 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading || !selectedTime}
              >
                {loading ? 'Scheduling...' : 'Schedule Appointment'}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentScheduler; 