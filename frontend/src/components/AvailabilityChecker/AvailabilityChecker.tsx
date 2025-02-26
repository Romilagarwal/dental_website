import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheck, FiX } from 'react-icons/fi';

interface TimeSlot {
  time: string;
  available: boolean;
}

const AvailabilityChecker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        // This would be replaced with an actual API call
        const response = await mockFetchAvailability(selectedDate);
        setTimeSlots(response);
      } catch (error) {
        console.error('Error fetching availability:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const mockFetchAvailability = async (date: Date): Promise<TimeSlot[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock time slots
    const slots: TimeSlot[] = [];
    const morningStart = 10;
    const morningEnd = 15;
    const eveningStart = 18;
    const eveningEnd = 21;

    for (let hour = morningStart; hour < morningEnd; hour++) {
      slots.push({
        time: `${hour}:00`,
        available: Math.random() > 0.3
      });
      slots.push({
        time: `${hour}:30`,
        available: Math.random() > 0.3
      });
    }

    for (let hour = eveningStart; hour < eveningEnd; hour++) {
      slots.push({
        time: `${hour}:00`,
        available: Math.random() > 0.3
      });
      slots.push({
        time: `${hour}:30`,
        available: Math.random() > 0.3
      });
    }

    return slots;
  };

  return (
    <div className="availability-checker">
      <div className="date-selector">
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            className="loading-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-spinner" />
            <p>Checking availability...</p>
          </motion.div>
        ) : (
          <motion.div
            className="time-slots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {timeSlots.map((slot, index) => (
              <motion.div
                key={slot.time}
                className={`time-slot ${slot.available ? 'available' : 'unavailable'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FiClock className="icon" />
                <span className="time">{slot.time}</span>
                {slot.available ? (
                  <FiCheck className="status-icon available" />
                ) : (
                  <FiX className="status-icon unavailable" />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailabilityChecker; 