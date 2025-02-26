import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DentalRecords from '../DentalRecords';

describe('DentalRecords', () => {
  it('renders dental records list', () => {
    render(<DentalRecords />);
    expect(screen.getByText('Dental Records')).toBeInTheDocument();
  });

  it('shows attachments when available', () => {
    render(<DentalRecords />);
    expect(screen.getByText('Attachments')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2); // View and Download buttons
  });

  it('handles file download', () => {
    const mockDownload = jest.fn();
    window.open = mockDownload;
    
    render(<DentalRecords />);
    fireEvent.click(screen.getAllByRole('button')[1]); // Download button
    
    expect(mockDownload).toHaveBeenCalled();
  });
}); 