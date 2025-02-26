import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ClinicStatusWidget from './ClinicStatusWidget/ClinicStatusWidget';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-white shadow-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Dr. Reishu Agarwal's Dental Clinic
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <ClinicStatusWidget />
            <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
            <Link to="/services" className="text-gray-800 hover:text-blue-600">Services</Link>
            <Link to="/about" className="text-gray-800 hover:text-blue-600">About</Link>
            <Link to="/blog" className="text-gray-800 hover:text-blue-600">Blog</Link>
            <Link to="/contact" className="text-gray-800 hover:text-blue-600">Contact</Link>
            <Link to="/appointment" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
