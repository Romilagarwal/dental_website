import React from 'react';
import Hero from '../components/Hero/Hero';
import DentalEducation from '../components/DentalEducation/DentalEducation';
import ServiceDetails from '../components/ServiceDetails/ServiceDetails';
import TreatmentGallery from '../components/TreatmentGallery/TreatmentGallery';
import TreatmentVisualizer from '../components/TreatmentVisualizer/TreatmentVisualizer';
import DentalFAQ from '../components/DentalFAQ/DentalFAQ';
import TestimonialSection from '../components/TestimonialSection/TestimonialSection';
import SEOHead from '../components/SEO/SEOHead';

const Home: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Dr. Reishu Agarwal's Dental Clinic - Shahjahanpur's Premier Dental Care"
        description="Comprehensive dental care in Shahjahanpur. We offer general, cosmetic, and restorative dental services in a comfortable and modern environment."
        structuredData={{
          type: 'DentalClinic',
          data: {
            name: "Dr. Reishu Agarwal's Dental Clinic",
            image: "https://example.com/images/clinic.jpg",
            telephone: "9415070200",
            url: "https://example.com"
          }
        }}
      />
      
      <Hero />
      
      <ServiceDetails />
      
      <TreatmentVisualizer />
      
      <DentalEducation />
      
      <TreatmentGallery />
      
      <TestimonialSection />
      
      <DentalFAQ />
    </>
  );
};

export default Home; 