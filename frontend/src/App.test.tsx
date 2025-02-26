import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders clinic name and contact information', () => {
    render(<App />);
    
    const clinicName = screen.getByText(/Advance Dental Clinic/i);
    const doctorName = screen.getByText(/Dr\. Reishu Agarwal/i);
    
    expect(clinicName).toBeInTheDocument();
    expect(doctorName).toBeInTheDocument();
  });

  test('renders working hours', () => {
    render(<App />);
    
    const morningHours = screen.getByText(/10am-3pm/i);
    const eveningHours = screen.getByText(/6:30pm to 9:30pm/i);
    
    expect(morningHours).toBeInTheDocument();
    expect(eveningHours).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<App />);
    
    const phone = screen.getByText(/9415070200/i);
    const email = screen.getByText(/advancedentalclinic17@gmail\.com/i);
    const address = screen.getByText(/Near Kacha Katra Modh, Shahjahanpur/i);
    
    expect(phone).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(address).toBeInTheDocument();
  });

  test('renders main navigation links', () => {
    render(<App />);
    const homeLink = screen.getByText(/Home/i);
    const servicesLink = screen.getByText(/Services/i);
    const appointmentLink = screen.getByText(/Book Appointment/i);
    expect(homeLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
    expect(appointmentLink).toBeInTheDocument();
  });
  
  test('renders footer with contact information', () => {
    render(<App />);
    const addressElement = screen.getByText(/Near Kacha Katra Modh, Shahjahanpur, H.O./i);
    const phoneElement = screen.getByText(/9415070200/i);
    expect(addressElement).toBeInTheDocument();
    expect(phoneElement).toBeInTheDocument();
  });
}); 


