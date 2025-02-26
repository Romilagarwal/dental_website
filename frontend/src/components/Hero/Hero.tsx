import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import './Hero.scss';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="hero-section">
      <div className="overlay"></div>
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-logo">
              <img 
                src="/clinic-hero.png" 
                alt="Dr. Reishu Agarwal's Dental Clinic" 
                width="260" 
                height="90"
              />
            </div>
            
            <h1>{t('home.hero.title')}</h1>
            <p>{t('home.hero.subtitle')}</p>
            
            <div className="hero-buttons">
              <Link href="/appointments">
                <motion.a 
                  className="primary-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('home.hero.cta')} <FiArrowRight />
                </motion.a>
              </Link>
              
              <a href="tel:9415070200" className="secondary-button">
                <FiPhone /> <span>Call: 9415070200</span>
              </a>
            </div>
            
            <motion.div 
              className="clinic-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="status-indicator open"></div>
              <span>{t('clinic.status.open')}</span>
              <span className="hours">10:00 AM - 3:00 PM, 6:30 PM - 9:30 PM</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="/clinic-photos/hero-clinic.jpg" 
              alt="Dr. Reishu Agarwal's Dental Clinic" 
              width="600" 
              height="500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 