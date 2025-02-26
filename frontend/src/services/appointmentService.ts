import axios from 'axios';

// Create an axios instance with credentials
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

export interface AppointmentData {
  name?: string;
  email?: string;
  phone?: string;
  date: Date;
  time: string;
  service: string;
  message?: string;
}

export interface Appointment {
  _id: string;
  service: string;
  date: string;
  time: string;
  status: string;
  message?: string;
  createdAt: string;
}

// Add token to requests if it exists
const updateAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

class AppointmentService {
  // Book appointment
  async bookAppointment(data: AppointmentData): Promise<any> {
    updateAuthToken();
    try {
      const response = await api.post('/appointments', data);
      return response.data;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }
  
  // Get available time slots for a specific date
  async getAvailableTimeSlots(date: Date): Promise<string[]> {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await api.get(`/appointments/available-slots?date=${formattedDate}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      return [];
    }
  }
  
  // Get current user's appointments
  async getMyAppointments(): Promise<any> {
    updateAuthToken();
    try {
      const response = await api.get('/appointments/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }
  
  // Get a single appointment by ID
  async getAppointment(id: string): Promise<any> {
    updateAuthToken();
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw error;
    }
  }
  
  // Update an appointment
  async updateAppointment(id: string, data: Partial<AppointmentData>): Promise<any> {
    updateAuthToken();
    try {
      const response = await api.put(`/appointments/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating appointment ${id}:`, error);
      throw error;
    }
  }
  
  // Cancel an appointment
  async cancelAppointment(id: string): Promise<void> {
    updateAuthToken();
    try {
      await api.delete(`/appointments/${id}`);
    } catch (error) {
      console.error(`Error cancelling appointment ${id}:`, error);
      throw error;
    }
  }
  
  // Get holidays
  async getHolidays(): Promise<any[]> {
    try {
      const response = await api.get('/holidays');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching holidays:', error);
      return [];
    }
  }
}

export default new AppointmentService(); 