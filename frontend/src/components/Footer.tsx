import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Dr. Reishu Agarwal's Dental Clinic</h3>
            <p>Near Kacha Katra Modh, Shahjahanpur, H.O.</p>
            <p>Email: advancedentalclinic17@gmail.com</p>
            <p>Phone: 9415070200</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Working Hours</h3>
            <p>Monday - Saturday: 10am - 3pm, 6:30pm - 9:30pm</p>
            <p>Sunday: 10am - 3pm (Evening Closed)</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul>
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-400">Services</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Dr. Reishu Agarwal's Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
