import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiFileText } from 'react-icons/fi';
import Link from 'next/link';
import './DentalEducation.scss';

interface EducationArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  type: 'video' | 'article';
  url: string;
}

const articles: EducationArticle[] = [
  {
    id: '1',
    title: 'The Importance of Regular Dental Check-ups',
    excerpt: 'Learn why visiting your dentist every six months is crucial for maintaining your oral health.',
    image: '/images/education/regular-checkup.jpg',
    type: 'article',
    url: '/blog/importance-of-regular-dental-checkups'
  },
  {
    id: '2',
    title: 'Proper Brushing Techniques',
    excerpt: 'Watch this video to learn the correct way to brush your teeth for optimal oral hygiene.',
    image: '/images/education/brushing-techniques.jpg',
    type: 'video',
    url: '/blog/proper-brushing-techniques'
  },
  {
    id: '3',
    title: 'Understanding Dental Implants',
    excerpt: 'Everything you need to know about dental implants and if they are right for you.',
    image: '/images/education/dental-implants.jpg',
    type: 'article',
    url: '/blog/understanding-dental-implants'
  },
  {
    id: '4',
    title: 'How to Prevent Tooth Decay',
    excerpt: 'Simple but effective practices to protect your teeth from decay and cavities.',
    image: '/images/education/prevent-decay.jpg',
    type: 'article',
    url: '/blog/how-to-prevent-tooth-decay'
  }
];

const DentalEducation: React.FC = () => {
  return (
    <section className="dental-education">
      <div className="container">
        <div className="section-header">
          <h2>Dental Education Center</h2>
          <p>Learn about dental care and procedures to maintain your oral health</p>
        </div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              className="education-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card-image">
                <img src={article.image} alt={article.title} />
                {article.type === 'video' && (
                  <div className="video-icon">
                    <FiPlay />
                  </div>
                )}
              </div>
              <div className="card-content">
                <div className="card-type">
                  {article.type === 'video' ? <FiPlay /> : <FiFileText />}
                  <span>{article.type === 'video' ? 'Video' : 'Article'}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link href={article.url}>
                  <a className="read-more">
                    Read more <FiArrowRight />
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="view-all">
          <Link href="/blog">
            <a className="view-all-button">
              Browse All Articles <FiArrowRight />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DentalEducation;
