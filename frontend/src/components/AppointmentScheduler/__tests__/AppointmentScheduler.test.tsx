import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AppointmentScheduler from '../AppointmentScheduler';
import axios from 'axios';

jest.mock('axios');

describe('AppointmentScheduler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and displays available time slots', async () => {
    const mockTimeSlots = {
      timeSlots: [
        { time: '10:00 AM', available: true },
        { time: '10:30 AM', available: false }
      ]
    };
    
    axios.get.mockResolvedValueOnce({ data: mockTimeSlots });
    
    render(<AppointmentScheduler />);
    
    await waitFor(() => {
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('Booked')).toBeInTheDocument();
    });
  });
}); 