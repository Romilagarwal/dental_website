import React from 'react';

interface StructuredDataProps {
  type: 'DentalClinic' | 'DentalService' | 'BlogPost' | 'LocalBusiness' | 'WebPage';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let structuredData = {};
  
  switch (type) {
    case 'DentalClinic':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: data.name || "Dr. Reishu Agarwal's Dental Clinic",
        image: data.image || 'https://example.com/images/dental-clinic.jpg',
        '@id': data.url || 'https://example.com',
        url: data.url || 'https://example.com',
        telephone: data.telephone || '9415070200',
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.streetAddress || 'Near Kacha Katra Modh',
          addressLocality: data.addressLocality || 'Shahjahanpur',
          addressRegion: data.addressRegion || 'Uttar Pradesh',
          postalCode: data.postalCode || '',
          addressCountry: data.addressCountry || 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.latitude,
          longitude: data.longitude
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '15:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '18:30',
            closes: '21:30'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Sunday',
            opens: '10:00',
            closes: '15:00'
          }
        ],
        priceRange: data.priceRange || '₹₹',
        servesCuisine: 'Dental Care',
        sameAs: [
          data.facebook || 'https://www.facebook.com/dragarwaldental',
          data.instagram || 'https://www.instagram.com/dragarwaldental'
        ]
      };
      break;
    
    case 'DentalService':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: data.name,
        procedureType: 'http://schema.org/DentalProcedure',
        description: data.description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url || `https://example.com/services/${data.slug}`
        },
        image: data.image,
        performer: {
          '@type': 'Dentist',
          name: "Dr. Reishu Agarwal's Dental Clinic",
          url: 'https://example.com'
        },
        howPerformed: data.howPerformed
      };
      break;
    
    case 'BlogPost':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        image: data.featuredImage,
        author: {
          '@type': 'Person',
          name: data.author.name
        },
        publisher: {
          '@type': 'Organization',
          name: "Dr. Reishu Agarwal's Dental Clinic",
          logo: {
            '@type': 'ImageObject',
            url: 'https://example.com/logo.png'
          }
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        description: data.excerpt
      };
      break;
    
    case 'LocalBusiness':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: data.name || "Dr. Reishu Agarwal's Dental Clinic",
        image: data.image || 'https://example.com/images/dental-clinic.jpg',
        '@id': data.url || 'https://example.com',
        url: data.url || 'https://example.com',
        telephone: data.telephone || '9415070200',
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.streetAddress || 'Near Kacha Katra Modh',
          addressLocality: data.addressLocality || 'Shahjahanpur',
          addressRegion: data.addressRegion || 'Uttar Pradesh',
          postalCode: data.postalCode || '',
          addressCountry: data.addressCountry || 'IN'
        }
      };
      break;
    
    case 'WebPage':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title,
        description: data.description,
        url: data.url
      };
      break;
    
    default:
      return null;
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData; 