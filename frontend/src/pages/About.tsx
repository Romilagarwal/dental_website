import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiAward, FiHeart, FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import SEOHead from '../components/SEO/SEOHead';
import './About.scss';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="About Dr. Reishu Agarwal's Dental Clinic | Shahjahanpur's Premier Dental Care"
        description="Learn about Dr. Reishu Agarwal's experience, our clinic's mission, and the comprehensive dental services we provide in Shahjahanpur."
        structuredData={{
          type: 'DentalClinic',
          data: {
            name: "Dr. Reishu Agarwal's Dental Clinic",
            description: "Premier dental clinic in Shahjahanpur offering comprehensive dental care services",
            founder: "Dr. Reishu Agarwal"
          }
        }}
      />
    
      <div className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Our Clinic</h1>
            <p>Providing quality dental care with a personalized approach</p>
          </div>
        </div>
      </div>
      
      <section className="about-intro">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Welcome to Dr. Reishu Agarwal's Dental Clinic</h2>
              <p>Established in 2005, our clinic has been committed to providing the highest quality dental care to the residents of Shahjahanpur and surrounding areas. We believe in a patient-centered approach, where your comfort and satisfaction are our top priorities.</p>
              
              <p>At Dr. Reishu Agarwal's Dental Clinic, we combine advanced technology with compassionate care to deliver dental treatments that not only improve your oral health but also enhance your quality of life. Our team of skilled professionals is dedicated to staying at the forefront of dental innovations to bring you the best care possible.</p>
              
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <FiUser />
                  </div>
                  <div className="highlight-content">
                    <h3>Patient-Centered Care</h3>
                    <p>We prioritize your comfort and personalize treatments to your needs.</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <FiAward />
                  </div>
                  <div className="highlight-content">
                    <h3>Expert Team</h3>
                    <p>Our qualified professionals have extensive experience in all aspects of dentistry.</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <FiHeart />
                  </div>
                  <div className="highlight-content">
                    <h3>Comfortable Environment</h3>
                    <p>Our clinic is designed to provide a relaxing and stress-free experience.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="about-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="/clinic-photos/dr-reishu.jpg" 
                alt="Dr. Reishu Agarwal" 
                className="main-image"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="our-mission">
        <div className="container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <p>Committed to excellence in dental care</p>
          </div>
          
          <div className="mission-content">
            <p>Our mission is to provide exceptional dental care in a comfortable and welcoming environment. We are committed to helping our patients maintain healthy smiles and improving their overall well-being through quality dental services. We believe in:</p>
            
            <ul className="mission-list">
              <li>
                <span className="mission-icon">✓</span>
                <span>Providing personalized care tailored to each patient's unique needs</span>
              </li>
              <li>
                <span className="mission-icon">✓</span>
                <span>Utilizing the latest dental technologies and techniques for optimal results</span>
              </li>
              <li>
                <span className="mission-icon">✓</span>
                <span>Creating a comfortable and stress-free dental experience</span>
              </li>
              <li>
                <span className="mission-icon">✓</span>
                <span>Educating patients about oral health and preventive care</span>
              </li>
              <li>
                <span className="mission-icon">✓</span>
                <span>Maintaining the highest standards of sterilization and cleanliness</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="our-clinic">
        <div className="container">
          <div className="section-header">
            <h2>Our Clinic</h2>
            <p>A tour of our modern dental facility</p>
          </div>
          
          <div className="clinic-gallery">
            <div className="gallery-item">
              <img src="/clinic-photos/reception.jpg" alt="Clinic Reception" />
              <div className="gallery-caption">
                <h3>Reception Area</h3>
                <p>Our welcoming reception area where we greet our patients</p>
              </div>
            </div>
            
            <div className="gallery-item">
              <img src="/clinic-photos/waiting-area.jpg" alt="Waiting Area" />
              <div className="gallery-caption">
                <h3>Waiting Area</h3>
                <p>Comfortable seating area for patients and families</p>
              </div>
            </div>
            
            <div className="gallery-item">
              <img src="/clinic-photos/operatory1.jpg" alt="Dental Operatory" />
              <div className="gallery-caption">
                <h3>Treatment Room</h3>
                <p>Modern dental chairs and equipment for comfortable treatments</p>
              </div>
            </div>
            
            <div className="gallery-item">
              <img src="/clinic-photos/equipment1.jpg" alt="Dental Equipment" />
              <div className="gallery-caption">
                <h3>Advanced Equipment</h3>
                <p>State-of-the-art dental technology for precise care</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="meet-doctor">
        <div className="container">
          <div className="section-header">
            <h2>Meet Dr. Reishu Agarwal</h2>
            <p>Experienced dentist committed to your oral health</p>
          </div>
          
          <div className="doctor-profile">
            <div className="doctor-image">
              <img src="/clinic-photos/dr-reishu.jpg" alt="Dr. Reishu Agarwal" />
            </div>
            
            <div className="doctor-bio">
              <h3>Dr. Reishu Agarwal, BDS, MDS</h3>
              <p className="doctor-qualification">Dental Surgeon & Implantologist</p>
              
              <p>Dr. Reishu Agarwal is a highly qualified dental surgeon with over 15 years of experience in general and cosmetic dentistry. After completing her Bachelor of Dental Surgery (BDS) and Master of Dental Surgery (MDS), she established her clinic in Shahjahanpur with a vision to provide quality dental care to the community.</p>
              
              <p>Dr. Agarwal specializes in cosmetic dentistry, dental implants, and full-mouth rehabilitation. She is known for her gentle approach and ability to make even the most anxious patients feel at ease. She regularly attends dental conferences and workshops to stay updated with the latest advancements in dentistry.</p>
              
              <div className="doctor-credentials">
                <div className="credential-item">
                  <strong>Education:</strong>
                  <p>BDS, MDS - Dental Surgery</p>
                </div>
                
                <div className="credential-item">
                  <strong>Experience:</strong>
                  <p>15+ years of clinical practice</p>
                </div>
                
                <div className="credential-item">
                  <strong>Specializations:</strong>
                  <p>Cosmetic Dentistry, Dental Implants, Full-Mouth Rehabilitation</p>
                </div>
                
                <div className="credential-item">
                  <strong>Professional Memberships:</strong>
                  <p>Indian Dental Association, Academy of Cosmetic Dentistry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="location-section">
        <div className="container">
          <div className="section-header">
            <h2>Find Us</h2>
            <p>Visit our modern dental clinic in Shahjahanpur</p>
          </div>
          
          <div className="location-grid">
            <div className="location-info">
              <div className="info-item">
                <FiMapPin />
                <div>
                  <h3>Address</h3>
                  <p>Dr. Reishu Agarwal's Dental Clinic, Krishna Theatre Rd, Shahjahanpur, Uttar Pradesh 242001</p>
                </div>
              </div>
              
              <div className="info-item">
                <FiPhone />
                <div>
                  <h3>Appointment</h3>
                  <p>Book your appointment by calling us at 9415070200</p>
                </div>
              </div>
              
              <div className="info-item">
                <FiClock />
                <div>
                  <h3>Working Hours</h3>
                  <table className="hours-table">
                    <tbody>
                      <tr>
                        <td>Monday - Saturday:</td>
                        <td>10:00 AM - 3:00 PM</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>6:30 PM - 9:30 PM</td>
                      </tr>
                      <tr>
                        <td>Sunday:</td>
                        <td>Closed</td>
                      </tr>
                      <tr className="holiday-note">
                        <td colSpan={2}>Closed on public holidays and the day after Holi and Diwali</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <Link href="/appointments">
                <motion.a 
                  className="book-appointment"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Appointment
                </motion.a>
              </Link>
            </div>
            
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.5968789508954!2d79.9043935!3d27.57657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399edaa46c671c75%3A0x9d59c80566936cee!2sDr.%20Reishu%20Agarwal&#39;s%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Dr. Reishu Agarwal's Dental Clinic Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About; 