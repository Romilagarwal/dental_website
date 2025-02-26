import React, { useState, useEffect, lazy, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { FiPhone, FiClock, FiMenu, FiX, FiUser, FiCalendar } from 'react-icons/fi';
import { MdEmergency } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';
import logo from '../../assets/logo.png';
import './Navbar.scss';

// Lazy load icons
const Icons = {
  FiPhone: lazy(() => import('react-icons/fi').then(mod => ({ default: mod.FiPhone }))),
  FiClock: lazy(() => import('react-icons/fi').then(mod => ({ default: mod.FiClock }))),
  // ... other icons
};

// Dynamic import of heavy components
const DarkModeToggle = dynamic(() => import('../DarkModeToggle/DarkModeToggle'), {
  ssr: false
});

interface NavItem {
  name: string;
  path: string;
  icon?: React.ComponentType;
  badge?: string;
  ariaLabel?: string;
}

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { 
      name: 'Book Appointment', 
      path: '/appointment',
      icon: FiCalendar,
      badge: 'New'
    }
  ];

  const clinicInfo = {
    name: "Dr. Reishu Agarwal's Dental Clinic",
    phone: '9415070200',
    whatsapp: '9415070200',
    hours: {
      morning: '10:00 AM - 3:00 PM',
      evening: '6:30 PM - 9:30 PM'
    },
    closed: 'Sunday Evenings',
    address: 'Near Kacha Katra Modh, Shahjahanpur, H.O.',
    email: 'advancedentalclinic17@gmail.com'
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  const isClinicOpen = () => {
    const now = new Date();
    const hour = now.getHours();
    const isSunday = now.getDay() === 0;
    
    const isMorningHours = hour >= 10 && hour < 15;
    const isEveningHours = hour >= 18.5 && hour < 21.5;
    
    if (isSunday && isEveningHours) return false;
    return isMorningHours || isEveningHours;
  };

  const handleEmergencyClick = () => {
    setIsEmergency(true);
    window.location.href = `tel:${clinicInfo.phone}`;
  };

  const handleWhatsAppClick = () => {
    // Create WhatsApp URL with the message directly
    const whatsappUrl = 'https://wa.me/919415070200?text=Hello%20Dr.%20Reishu%2C%20I%27d%20like%20to%20schedule%20a%20dental%20appointment.';
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <motion.div 
        className={`announcement-bar ${isEmergency ? 'emergency' : ''}`}
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
      >
        {isEmergency ? (
          'Connecting to emergency services...'
        ) : (
          '🎉 Special Offer: Free Dental Checkup This Weekend!'
        )}
      </motion.div>

      <nav 
        className={`main-nav ${isScrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="top-bar">
          <div className="container">
            <div className="clinic-info">
              <div className="contact-info">
                <Suspense fallback={<span>Loading...</span>}>
                  <a 
                    href={`tel:${clinicInfo.phone}`} 
                    className="info-item"
                    aria-label="Call clinic"
                  >
                    <Icons.FiPhone /> {clinicInfo.phone}
                  </a>
                </Suspense>
                <span className="info-item">
                  <Icons.FiClock />
                  <span className={isClinicOpen() ? 'open' : 'closed'}>
                    {isClinicOpen() ? 'Open Now' : 'Closed'}
                  </span>
                </span>
              </div>
              <div className="action-buttons">
                <DarkModeToggle />
                <button 
                  onClick={handleWhatsAppClick}
                  className="whatsapp-btn"
                  aria-label="Contact on WhatsApp"
                >
                  <BsWhatsapp /> Chat on WhatsApp
                </button>
                <button 
                  onClick={handleEmergencyClick}
                  className="emergency-btn"
                  aria-label="Emergency Contact"
                >
                  <MdEmergency /> Emergency
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="main-bar container">
          <Link 
            href="/" 
            className="logo" 
            aria-label={clinicInfo.name}
          >
            <img 
              src={logo.src} 
              alt={clinicInfo.name}
              loading="eager" // Logo should load immediately
            />
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <div 
            className={`nav-content ${isMobileMenuOpen ? 'open' : ''}`}
            id="navigation-menu"
          >
            <div 
              className="nav-links"
              role="menubar"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-link ${router.pathname === item.path ? 'active' : ''}`}
                  role="menuitem"
                  aria-label={item.ariaLabel || item.name}
                  aria-current={router.pathname === item.path ? 'page' : undefined}
                >
                  {item.icon && <item.icon />}
                  {item.name}
                  {item.badge && (
                    <span className="badge" role="status">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="nav-actions">
              <Link href="/login" className="login-btn">
                <FiUser /> Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 