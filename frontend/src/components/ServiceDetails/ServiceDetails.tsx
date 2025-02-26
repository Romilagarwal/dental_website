import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiInfo, FiClock, FiDollarSign } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './ServiceDetails.scss';

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  benefits: string[];
  duration: string;
  recovery: string;
  priceRange: string;
  isPopular: boolean;
}

const dentistryServices: ServiceDetail[] = [
  {
    id: 'general-checkup',
    title: 'Comprehensive Dental Checkup',
    description: 'A thorough examination of your oral health, including teeth cleaning, X-rays, and screening for various dental issues like cavities, gum disease, and oral cancer.',
    image: '/images/services/dental-checkup.jpg',
    benefits: [
      'Early detection of dental problems',
      'Prevention of serious dental issues',
      'Professional teeth cleaning',
      'Personalized oral care advice'
    ],
    duration: '45-60 minutes',
    recovery: 'None required',
    priceRange: '₹800 - ₹1,500',
    isPopular: true
  },
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    description: 'A procedure that treats the infected pulp of a tooth to save it from extraction. The infected tissue is removed, and the inner tooth is cleaned, filled, and sealed.',
    image: '/images/services/root-canal.jpg',
    benefits: [
      'Saves natural tooth',
      'Relieves pain and infection',
      'Prevents spread of infection',
      'Restores normal biting and chewing'
    ],
    duration: '60-90 minutes per session (1-2 sessions)',
    recovery: '1-2 days of mild discomfort',
    priceRange: '₹8,000 - ₹15,000',
    isPopular: false
  },
  {
    id: 'invisalign',
    title: 'Invisalign Clear Aligners',
    description: 'A modern alternative to braces, Invisalign uses a series of clear, removable aligners to gradually straighten teeth without the constraints of metal wires and brackets.',
    image: '/images/services/invisalign.jpg',
    benefits: [
      'Virtually invisible',
      'Removable for eating and cleaning',
      'More comfortable than traditional braces',
      'Fewer office visits required'
    ],
    duration: '12-18 months average treatment time',
    recovery: 'No recovery needed',
    priceRange: '₹80,000 - ₹2,50,000',
    isPopular: true
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'A permanent solution for missing teeth, dental implants are titanium posts surgically placed in the jawbone that support natural-looking artificial teeth.',
    image: '/images/services/dental-implants.jpg',
    benefits: [
      'Most natural-looking replacement option',
      'Preserves jawbone and facial structure',
      'No impact on adjacent teeth',
      'Long-lasting (potentially lifetime)'
    ],
    duration: '3-6 months (multiple procedures)',
    recovery: 'Initial recovery: 1-2 weeks, Full integration: 3-6 months',
    priceRange: '₹25,000 - ₹50,000 per implant',
    isPopular: true
  },
  {
    id: 'teeth-whitening',
    title: 'Professional Teeth Whitening',
    description: 'An in-office procedure using professional-grade whitening agents to safely brighten your teeth by several shades in a single visit.',
    image: '/images/services/teeth-whitening.jpg',
    benefits: [
      'Immediate, dramatic results',
      'Performed by dental professionals',
      'Safer than DIY whitening methods',
      'Customized treatment plan'
    ],
    duration: '60-90 minutes',
    recovery: 'None, though some temporary sensitivity may occur',
    priceRange: '₹5,000 - ₹15,000',
    isPopular: false
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    description: 'A range of procedures designed to improve the appearance of your teeth, including veneers, bonding, and smile makeovers.',
    image: '/images/services/cosmetic-dentistry.jpg',
    benefits: [
      'Enhanced smile aesthetics',
      'Improved self-confidence',
      'Correction of visible dental flaws',
      'Often combines functional improvements'
    ],
    duration: 'Varies by procedure',
    recovery: 'Varies by procedure',
    priceRange: '₹5,000 - ₹1,00,000+',
    isPopular: true
  }
];

const ServiceDetails: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="service-details">
      <div className="container">
        <div className="section-header">
          <h2>Our Dental Services</h2>
          <p>Comprehensive dental care for your entire family</p>
        </div>
        
        <div className="services-grid">
          {dentistryServices.map((service, index) => (
            <motion.div
              key={service.id}
              className={`service-card ${service.isPopular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {service.isPopular && (
                <div className="popular-tag">Popular</div>
              )}
              
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              
              <div className="service-content">
                <h3>{service.title}</h3>
                <p className="description">{service.description}</p>
                
                <div className="service-details-list">
                  <h4>Benefits</h4>
                  <ul>
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <FiCheck /> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="service-info-grid">
                  <div className="info-item">
                    <FiClock />
                    <div>
                      <h5>Duration</h5>
                      <p>{service.duration}</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <FiInfo />
                    <div>
                      <h5>Recovery</h5>
                      <p>{service.recovery}</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <FiDollarSign />
                    <div>
                      <h5>Price Range</h5>
                      <p>{service.priceRange}</p>
                    </div>
                  </div>
                </div>
                
                <button className="book-service-button">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails; 