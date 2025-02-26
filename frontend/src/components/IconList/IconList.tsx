import React from 'react';
import './IconList.scss';
import ThemeIcon from '../ThemeIcon/ThemeIcon';
import { motion } from 'framer-motion';

interface IconListProps {
  icon: string;
  title: string;
  description: string;
  link?: string;
  isService?: boolean;
}

const IconList: React.FC<IconListProps> = ({
  icon,
  title,
  description,
  link,
  isService = false
}) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div 
      className="col-lg-6 col-md-6"
      {...fadeIn}
    >
      <div className={`icon-list ${isService ? 'service-card' : ''}`}>
        <div className="icon-area">
          <ThemeIcon icon={icon} />
        </div>
        <div className="icon-list-text">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
          {link && (
            <a 
              href={link}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
                        transition duration-300 mt-2 inline-block"
            >
              Learn More →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default IconList; 