import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiTag, FiSearch } from 'react-icons/fi';
import Layout from '../../components/Layout/Layout';
import BlogCategories from '../../components/BlogCategories/BlogCategories';
import './BlogPage.scss';

// Define proper BlogPost type
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  author: string;
  category: string;
}

// Blog posts with correct syntax
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'importance-of-regular-dental-checkups',
    title: 'The Importance of Regular Dental Checkups',
    excerpt: 'Regular dental checkups are crucial for maintaining oral health. Learn why you shouldn\'t skip your biannual dentist appointments.',
    featuredImage: '/images/blog/dental-checkup.jpg',
    date: 'August 15, 2023',
    author: 'Dr. Reishu Agarwal',
    category: 'Preventive Care'
  },
  {
    id: 2,
    slug: 'understanding-dental-implants',
    title: 'Understanding Dental Implants: A Comprehensive Guide',
    excerpt: 'Dental implants are a long-term solution for missing teeth. Learn about the procedure, benefits, and if they\'re right for you.',
    featuredImage: '/images/blog/dental-implants.jpg',
    date: 'June 10, 2023',
    author: 'Dr. Reishu Agarwal',
    category: 'Restorative Dentistry'
  },
  {
    id: 3,
    slug: 'oral-hygiene-tips-for-children',
    title: 'Oral Hygiene Tips for Children: Starting Good Habits Early',
    excerpt: 'Teaching children good oral hygiene habits early is essential for lifelong dental health. Here are tips to make it fun and effective.',
    featuredImage: '/images/blog/children-dental.jpg',
    date: 'May 22, 2023',
    author: 'Dr. Reishu Agarwal',
    category: 'Pediatric Dentistry'
  },
  {
    id: 4,
    slug: 'teeth-whitening-myths-debunked',
    title: 'Teeth Whitening Myths Debunked',
    excerpt: 'There are many misconceptions about teeth whitening. We separate fact from fiction to help you make informed decisions.',
    featuredImage: '/images/blog/teeth-whitening.jpg',
    date: 'April 8, 2023',
    author: 'Dr. Reishu Agarwal',
    category: 'Cosmetic Dentistry'
  },
  {
    id: 5,
    slug: 'managing-dental-anxiety',
    title: 'Managing Dental Anxiety: Tips for a Stress-Free Visit',
    excerpt: 'Dental anxiety is common, but it shouldn\'t prevent you from getting necessary care. Learn strategies to manage fear and stress.',
    featuredImage: '/images/blog/dental-anxiety.jpg',
    date: 'March 15, 2023',
    author: 'Dr. Reishu Agarwal',
    category: 'Patient Care'
  },
  {
    id: 6,
    slug: 'nutrition-and-oral-health',
    title: 'The Connection Between Nutrition and Oral Health',
    excerpt: 'What you eat affects your teeth and gums. Discover which foods promote oral health and which ones to avoid.',
    featuredImage: '/images/blog/nutrition-dental.jpg',
    date: 'February 3, 2023',
    author: 'Dr. Reishu Agarwal',
    category: 'Preventive Care'
  }
];

const categories = ['All', 'Preventive Care', 'Restorative Dentistry', 'Cosmetic Dentistry', 'Pediatric Dentistry', 'Patient Care'];

const BlogPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = blogPosts.filter(post => {
    // Filter by category
    const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });
  
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Dental Health Blog | Dr. Reishu Agarwal's Dental Clinic",
    "description": "Read our latest articles on dental health, treatments, and tips for maintaining optimal oral hygiene.",
    "url": "https://www.reishudental.com/blog"
  };
  
  return (
    <Layout>
      <Head>
        <title>Dental Health Blog | Dr. Reishu Agarwal's Dental Clinic</title>
        <meta name="description" content="Read our latest articles on dental health, treatments, and tips for maintaining optimal oral hygiene." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }}
        />
      </Head>
      
      <div className="blog-page">
        <div className="blog-header">
          <h1>{t('blog.title')}</h1>
          <p>{t('blog.subtitle')}</p>
          
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder={t('blog.searchPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <BlogCategories 
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        
        <div className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card-image">
                    <img src={post.featuredImage} alt={post.title} />
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <h2>{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    
                    <div className="blog-meta">
                      <div className="meta-item">
                        <FiCalendar />
                        <span>{post.date}</span>
                      </div>
                      <div className="meta-item">
                        <FiUser />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="no-results">
              <h3>{t('blog.noResults')}</h3>
              <p>{t('blog.tryDifferentSearch')}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default BlogPage; 