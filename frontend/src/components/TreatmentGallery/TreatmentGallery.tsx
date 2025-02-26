import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn, FiPlay } from 'react-icons/fi';
import './TreatmentGallery.scss';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  source: string;
  title: string;
  description: string;
  category: 'before-after' | 'procedure' | 'equipment' | 'clinic';
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    thumbnail: '/photo_reception.jpg',
    source: '/photo_reception.jpg',
    title: 'Modern Reception Area',
    description: 'Our welcoming reception area where patients are greeted with a smile.',
    category: 'clinic'
  },
  {
    id: '2',
    type: 'image',
    thumbnail: '/photo_operatory1.jpg',
    source: '/photo_operatory1.jpg',
    title: 'Main Dental Operatory',
    description: 'Our state-of-the-art dental operatory equipped with the latest technology for patient comfort and treatment efficiency.',
    category: 'clinic'
  },
  {
    id: '3',
    type: 'image',
    thumbnail: '/photo_equipment1.jpg',
    source: '/photo_equipment1.jpg',
    title: 'Advanced Dental Equipment',
    description: 'We use cutting-edge dental technology to provide precise diagnoses and effective treatments.',
    category: 'equipment'
  },
  {
    id: '4',
    type: 'image',
    thumbnail: '/photo_waiting.jpg',
    source: '/photo_waiting.jpg',
    title: 'Comfortable Waiting Area',
    description: 'Our comfortable waiting area designed to make your visit as pleasant as possible.',
    category: 'clinic'
  },
  {
    id: '5',
    type: 'image',
    thumbnail: '/photo_team.jpg',
    source: '/photo_team.jpg',
    title: 'Our Dedicated Team',
    description: 'Meet our team of dental professionals committed to providing exceptional care.',
    category: 'clinic'
  },
  {
    id: '6',
    type: 'image',
    thumbnail: '/images/gallery/teeth-whitening-before-after.jpg',
    source: '/images/gallery/teeth-whitening-before-after.jpg',
    title: 'Teeth Whitening Results',
    description: 'Before and after professional teeth whitening treatment showing significant improvement in shade.',
    category: 'before-after'
  },
  {
    id: '7',
    type: 'video',
    thumbnail: '/images/gallery/root-canal-thumb.jpg',
    source: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Modern Root Canal Therapy',
    description: 'See how modern root canal therapy is performed with minimal discomfort.',
    category: 'procedure'
  },
  {
    id: '8',
    type: 'image',
    thumbnail: '/clinic-photos/reception.jpg',
    source: '/clinic-photos/reception.jpg',
    title: 'Clinic Reception Area',
    description: 'Our welcoming reception area where we handle appointments and patient inquiries.',
    category: 'clinic'
  }
];

const categories = ['All', 'Before/After', 'Procedures', 'Equipment', 'Our Clinic'];

const TreatmentGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  const getCategoryValue = (categoryLabel: string): string => {
    switch(categoryLabel) {
      case 'Before/After': return 'before-after';
      case 'Procedures': return 'procedure';
      case 'Equipment': return 'equipment';
      case 'Our Clinic': return 'clinic';
      default: return 'all';
    }
  };
  
  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === getCategoryValue(selectedCategory));
  
  return (
    <section className="treatment-gallery">
      <div className="container">
        <div className="section-header">
          <h2>Gallery</h2>
          <p>Explore our clinic and see examples of our dental work</p>
        </div>
        
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <motion.div 
          className="gallery-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div 
                key={item.id}
                className="gallery-item"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="item-image">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="item-overlay">
                    {item.type === 'video' ? (
                      <FiPlay className="overlay-icon" />
                    ) : (
                      <FiZoomIn className="overlay-icon" />
                    )}
                  </div>
                </div>
                <h3>{item.title}</h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Modal for viewing gallery items */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-overlay" onClick={() => setSelectedItem(null)}></div>
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button className="close-modal" onClick={() => setSelectedItem(null)}>
                <FiX />
              </button>
              
              <div className="modal-body">
                {selectedItem.type === 'image' ? (
                  <img src={selectedItem.source} alt={selectedItem.title} />
                ) : (
                  <div className="video-wrapper">
                    <iframe 
                      src={selectedItem.source} 
                      title={selectedItem.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
              
              <div className="modal-info">
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TreatmentGallery; 