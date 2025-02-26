import React from 'react';
import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiClock, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <div className="footer-logo">
                <img 
                  src="/clinic-hero.png" 
                  alt="Dr. Reishu Agarwal's Dental Clinic" 
                  width="180" 
                  height="60"
                />
              </div>
              <p className="footer-description">
                {t('footer.description')}
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FiFacebook />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FiInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FiTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FiYoutube />
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3>{t('footer.quickLinks')}</h3>
              <ul>
                <li>
                  <Link href="/"><a>{t('nav.home')}</a></Link>
                </li>
                <li>
                  <Link href="/about"><a>{t('nav.about')}</a></Link>
                </li>
                <li>
                  <Link href="/services"><a>{t('nav.services')}</a></Link>
                </li>
                <li>
                  <Link href="/blog"><a>{t('nav.blog')}</a></Link>
                </li>
                <li>
                  <Link href="/contact"><a>{t('nav.contact')}</a></Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-services">
              <h3>{t('footer.services')}</h3>
              <ul>
                <li>
                  <Link href="/services/general-dentistry">
                    <a>{t('services.general')}</a>
                  </Link>
                </li>
                <li>
                  <Link href="/services/cosmetic-dentistry">
                    <a>{t('services.cosmetic')}</a>
                  </Link>
                </li>
                <li>
                  <Link href="/services/restorative-dentistry">
                    <a>{t('services.restorative')}</a>
                  </Link>
                </li>
                <li>
                  <Link href="/services/orthodontics">
                    <a>{t('services.orthodontics')}</a>
                  </Link>
                </li>
                <li>
                  <Link href="/services/dental-implants">
                    <a>{t('services.implants')}</a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3>{t('footer.contactUs')}</h3>
              <ul className="contact-info">
                <li>
                  <FiMapPin />
                  <span>123 Medical Street, Shahjahanpur, Uttar Pradesh 242001</span>
                </li>
                <li>
                  <FiPhone />
                  <a href="tel:9415070200">9415070200</a>
                </li>
                <li>
                  <FiMail />
                  <a href="mailto:info@drraishu.com">info@drraishu.com</a>
                </li>
                <li>
                  <FiClock />
                  <span>Mon-Sat: 10:00 AM - 3:00 PM, 6:30 PM - 9:30 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; {currentYear} {t('footer.copyright')}
          </p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">
              <a>{t('footer.privacyPolicy')}</a>
            </Link>
            <Link href="/terms-of-service">
              <a>{t('footer.termsOfService')}</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 