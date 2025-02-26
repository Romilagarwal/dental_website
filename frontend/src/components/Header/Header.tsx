import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiChevronDown, FiUser, FiGlobe } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import './Header.scss';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link href="/">
            <a className="logo">
              <img 
                src="/clinic-hero.png" 
                alt="Dr. Reishu Agarwal's Dental Clinic" 
                width="180" 
                height="60"
              />
            </a>
          </Link>
          
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li className={router.pathname === '/' ? 'active' : ''}>
                <Link href="/"><a>{t('nav.home')}</a></Link>
              </li>
              <li className={router.pathname === '/about' ? 'active' : ''}>
                <Link href="/about"><a>{t('nav.about')}</a></Link>
              </li>
              <li className={`has-dropdown ${router.pathname.startsWith('/services') ? 'active' : ''}`}>
                <button 
                  className="dropdown-toggle"
                  onClick={toggleServices}
                >
                  {t('nav.services')} <FiChevronDown />
                </button>
                
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.ul 
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
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
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              <li className={router.pathname === '/blog' ? 'active' : ''}>
                <Link href="/blog"><a>{t('nav.blog')}</a></Link>
              </li>
              <li className={router.pathname === '/contact' ? 'active' : ''}>
                <Link href="/contact"><a>{t('nav.contact')}</a></Link>
              </li>
            </ul>
          </nav>
          
          <div className="header-actions">
            <div className="language-selector">
              <button onClick={() => changeLanguage('en')}>EN</button>
              <span>|</span>
              <button onClick={() => changeLanguage('hi')}>हिं</button>
            </div>
            
            <a href="tel:9415070200" className="phone-button">
              <FiPhone />
              <span>9415070200</span>
            </a>
            
            {user ? (
              <Link href="/dashboard">
                <a className="auth-button">
                  <FiUser />
                  <span>Dashboard</span>
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="auth-button">
                  <FiUser />
                  <span>Login</span>
                </a>
              </Link>
            )}
            
            <button className="mobile-menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <ul className="mobile-nav-links">
                <li className={router.pathname === '/' ? 'active' : ''}>
                  <Link href="/">
                    <a onClick={closeMenu}>{t('nav.home')}</a>
                  </Link>
                </li>
                <li className={router.pathname === '/about' ? 'active' : ''}>
                  <Link href="/about">
                    <a onClick={closeMenu}>{t('nav.about')}</a>
                  </Link>
                </li>
                <li className={router.pathname.startsWith('/services') ? 'active' : ''}>
                  <button 
                    className="mobile-dropdown-toggle"
                    onClick={toggleServices}
                  >
                    {t('nav.services')} <FiChevronDown />
                  </button>
                  
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.ul 
                        className="mobile-dropdown-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <li>
                          <Link href="/services/general-dentistry">
                            <a onClick={closeMenu}>{t('services.general')}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/cosmetic-dentistry">
                            <a onClick={closeMenu}>{t('services.cosmetic')}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/restorative-dentistry">
                            <a onClick={closeMenu}>{t('services.restorative')}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/orthodontics">
                            <a onClick={closeMenu}>{t('services.orthodontics')}</a>
                          </Link>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li className={router.pathname === '/blog' ? 'active' : ''}>
                  <Link href="/blog">
                    <a onClick={closeMenu}>{t('nav.blog')}</a>
                  </Link>
                </li>
                <li className={router.pathname === '/contact' ? 'active' : ''}>
                  <Link href="/contact">
                    <a onClick={closeMenu}>{t('nav.contact')}</a>
                  </Link>
                </li>
              </ul>
              
              <div className="mobile-actions">
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <a className="mobile-auth-button" onClick={closeMenu}>
                        <FiUser />
                        Dashboard
                      </a>
                    </Link>
                    <button className="mobile-auth-button" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login">
                    <a className="mobile-auth-button" onClick={closeMenu}>
                      <FiUser />
                      Login
                    </a>
                  </Link>
                )}
                
                <div className="mobile-language-selector">
                  <FiGlobe />
                  <button onClick={() => changeLanguage('en')}>English</button>
                  <span>|</span>
                  <button onClick={() => changeLanguage('hi')}>हिंदी</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 