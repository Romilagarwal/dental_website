import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiUser } from 'react-icons/fi';
import './TestimoniCard.scss';

const TestimoniCard = ({ testimonial }) => {
  const { name, age, location, rating, comment, image, procedure, date } = testimonial;
  
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar 
          key={i}
          className={i <= rating ? 'star-filled' : 'star-empty'} 
        />
      );
    }
    return stars;
  };
  
  return (
    <motion.div
      className="testimonial-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="testimonial-header">
        <div className="profile">
          {image ? (
            <img src={image} alt={name} className="profile-image" />
          ) : (
            <div className="profile-placeholder">
              <FiUser />
            </div>
          )}
          <div className="profile-info">
            <h3>{name}</h3>
            <p className="meta">{age && `${age}, `}{location}</p>
          </div>
        </div>
        <div className="rating">
          {renderStarRating(rating)}
        </div>
      </div>
      
      {procedure && (
        <div className="testimonial-procedure">
          <span>Treatment:</span> {procedure}
        </div>
      )}
      
      <div className="testimonial-body">
        <p className="testimonial-text">"{comment}"</p>
      </div>
      
      <div className="testimonial-footer">
        <p className="date">{date}</p>
      </div>
    </motion.div>
  );
};

export default TestimoniCard;