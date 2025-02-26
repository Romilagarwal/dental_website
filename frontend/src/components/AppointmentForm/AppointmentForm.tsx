import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiInfo, FiAlertCircle } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import './AppointmentForm.scss';

// Schema validation
const schema = yup.object().shape({
  service: yup.string().required('Service is required'),
  date: yup.date().nullable().required('Date is required')
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Date cannot be in the past'),
  time: yup.string().required('Time is required'),
  message: yup.string().optional()
}) as yup.ObjectSchema<FormData>;

// Define form data type
interface FormData {
  service: string;
  date: Date | null;
  time: string;
  message?: string;
}

const AppointmentForm: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [holidays, setHolidays] = useState<Date[]>([]);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      service: '',
      date: null,
      time: '',
      message: ''
    }
  });
  
  // Fetch holidays from API
  useEffect(() => {
    const fetchHolidays = async () => {
      const holidayData = await appointmentService.getHolidays();
      const holidayDates = holidayData.map((holiday: any) => new Date(holiday.date));
      setHolidays(holidayDates);
    };
    
    fetchHolidays();
  }, []);
  
  // Function to check if a date is a holiday or Sunday
  const isDateDisabled = (date: Date): boolean => {
    // Check if it's a Sunday (0 is Sunday in JavaScript)
    if (date.getDay() === 0) return true;
    
    // Check if it's a holiday
    return holidays.some(holiday => 
      holiday.getDate() === date.getDate() && 
      holiday.getMonth() === date.getMonth() && 
      holiday.getFullYear() === date.getFullYear()
    );
  };
  
  // Watch date changes to fetch available times
  const selectedDateValue = watch('date');
  
  useEffect(() => {
    if (selectedDateValue) {
      fetchAvailableTimes(selectedDateValue);
    }
  }, [selectedDateValue]);
  
  const fetchAvailableTimes = async (date: Date) => {
    try {
      const times = await appointmentService.getAvailableTimeSlots(date);
      setAvailableTimes(times);
    } catch (error) {
      console.error('Error fetching available times:', error);
      setAvailableTimes([]);
    }
  };
  
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setValue('date', date);
    }
    setValue('time', ''); // Reset time when date changes
  };
  
  const onSubmit = async (data: FormData) => {
    if (!isAuthenticated) {
      navigate('/login?redirect=appointments');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Add user info if authenticated
      const appointmentData = {
        ...data,
        date: data.date as Date, // We know date is not null here because of validation
        name: user?.name,
        email: user?.email,
        phone: user?.phone
      };
      
      await appointmentService.bookAppointment(appointmentData);
      setSubmitSuccess(true);
      
      // Reset form
      setValue('service', '');
      setValue('date', null);
      setValue('time', '');
      setValue('message', '');
      setSelectedDate(null);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      setSubmitError(error.response?.data?.message || 'There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="appointment-form-container">
      {submitSuccess && (
        <motion.div 
          className="success-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Appointment Booked Successfully!</h3>
          <p>Your appointment has been scheduled. You will receive a confirmation via email and SMS shortly.</p>
        </motion.div>
      )}
      
      {submitError && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiAlertCircle />
          <p>{submitError}</p>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="service">Dental Service</label>
          <select 
            id="service" 
            className={errors.service ? 'error' : ''}
            {...register('service')}
          >
            <option value="">Select a service</option>
            <option value="general-checkup">General Checkup</option>
            <option value="teeth-cleaning">Teeth Cleaning</option>
            <option value="teeth-whitening">Teeth Whitening</option>
            <option value="dental-fillings">Dental Fillings</option>
            <option value="root-canal">Root Canal Treatment</option>
            <option value="dental-implants">Dental Implants</option>
            <option value="braces">Braces</option>
            <option value="dental-crown">Dental Crown</option>
            <option value="tooth-extraction">Tooth Extraction</option>
            <option value="dentures">Dentures</option>
            <option value="gum-treatment">Gum Treatment</option>
            <option value="pediatric-dentistry">Pediatric Dentistry</option>
            <option value="other">Other</option>
          </select>
          {errors.service && <p className="error-text">{errors.service.message?.toString()}</p>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              <FiCalendar /> Date
            </label>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                filterDate={(date: Date) => !isDateDisabled(date)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                className={errors.date ? 'error' : ''}
                id="date"
              />
            {errors.date && <p className="error-text">{errors.date.message?.toString()}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="time">
              <FiClock /> Time
            </label>
            <select 
              id="time" 
              className={errors.time ? 'error' : ''}
              {...register('time')}
              disabled={!selectedDate || availableTimes.length === 0}
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {!selectedDate && <p className="info-text">Please select a date first</p>}
            {selectedDate && availableTimes.length === 0 && <p className="info-text">No available times for this date</p>}
            {errors.time && <p className="error-text">{errors.time.message?.toString()}</p>}
          </div>
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="message">Additional Information (Optional)</label>
          <textarea 
            id="message" 
            placeholder="Describe your dental concern or any specific requirements"
            rows={4}
            className={errors.message ? 'error' : ''}
            {...register('message')}
          ></textarea>
          {errors.message && <p className="error-text">{errors.message.message?.toString()}</p>}
        </div>
        
        <div className="form-notice">
          <FiInfo className="info-icon" />
          <p>
            By booking an appointment, you agree to our cancellation policy. Please notify us at least 24 hours in advance if you need to reschedule or cancel.
          </p>
        </div>
        
        <motion.button 
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </motion.button>
      </form>
    </div>
  );
};

export default AppointmentForm; 