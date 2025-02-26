import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StructuredData from './StructuredData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: {
    type: 'DentalClinic' | 'DentalService' | 'BlogPost' | 'LocalBusiness' | 'WebPage';
    data: any;
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Dr. Reishu Agarwal's Dental Clinic",
  description = "Advanced dental clinic in Shahjahanpur providing comprehensive dental care services including general dentistry, cosmetic procedures, orthodontics, and dental implants.",
  keywords = "dental clinic, dentist, Dr. Reishu Agarwal, Shahjahanpur, dental care, tooth extraction, root canal, dental implants, braces",
  ogType = "website",
  ogImage = "/images/clinic-og-image.jpg",
  structuredData
}) => {
  const router = useRouter();
  const canonicalUrl = `https://example.com${router.asPath}`;
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Include structured data */}
      {structuredData && (
        <StructuredData type={structuredData.type} data={structuredData.data} />
      )}
    </Head>
  );
};

export default SEOHead; 