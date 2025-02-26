import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiInfo } from 'react-icons/fi';
import './DentalFAQ.scss';

// Define FAQ item type
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// FAQ data with proper syntax
const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How often should I visit the dentist?',
    answer: 'For optimal oral health, we recommend visiting the dentist every six months for a regular checkup and professional cleaning. However, patients with specific dental issues or a history of gum disease may need more frequent visits. During your initial consultation, we\'ll develop a personalized treatment plan that includes a recommended schedule for your routine visits.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'What should I do if I have a dental emergency?',
    answer: 'For dental emergencies like severe pain, a knocked-out tooth, or a broken tooth, contact our clinic immediately. We reserve slots for emergency care. If it\'s outside our working hours, call our emergency number. For a knocked-out tooth, keep it moist in milk or saliva and bring it with you as quickly as possible.',
    category: 'general'
  },
  {
    id: 'faq-3',
    question: 'Is teeth whitening safe?',
    answer: 'Professional teeth whitening administered by dental professionals is safe for most people. We use clinically tested whitening agents and take precautions to protect your gums and oral tissues. Some patients may experience temporary tooth sensitivity, but this typically resolves within a few days. We\'ll assess your dental health before recommending any whitening procedure.',
    category: 'treatments'
  },
  {
    id: 'faq-4',
    question: 'How long do dental implants last?',
    answer: 'With proper care and maintenance, dental implants can last a lifetime. The implant itself (the titanium post that fuses with your jawbone) rarely needs replacement. The crown attached to the implant typically lasts 10-15 years before it might need replacement due to normal wear and tear. Regular dental check-ups and good oral hygiene are essential for the longevity of dental implants.',
    category: 'treatments'
  },
  {
    id: 'faq-5',
    question: 'Does your clinic accept insurance?',
    answer: 'Yes, we accept most major dental insurance plans. We recommend contacting our office with your insurance information before your appointment so we can verify your coverage. Our staff will help you understand your benefits and any out-of-pocket expenses you might incur.',
    category: 'payment'
  },
  {
    id: 'faq-6',
    question: 'What payment options do you offer?',
    answer: 'We accept cash, credit cards, and debit cards. We also offer flexible payment plans and financing options for more extensive treatments. Our team will discuss all payment options with you and help you find the most suitable arrangement for your needs.',
    category: 'payment'
  },
  {
    id: 'faq-7',
    question: 'At what age should my child first visit the dentist?',
    answer: 'The American Academy of Pediatric Dentistry recommends that children see a dentist by their first birthday or within six months after their first tooth appears. Early dental visits help establish a positive relationship with dental care and allow us to monitor your child\'s oral development from an early stage.',
    category: 'children'
  },
  {
    id: 'faq-8',
    question: 'Are dental X-rays safe for my child?',
    answer: 'Yes, dental X-rays are safe for children. We use digital X-rays that emit significantly less radiation than traditional X-rays. We also take additional precautions, such as using protective aprons and thyroid collars. We follow the ALARA principle (As Low As Reasonably Achievable) and only take X-rays when necessary for diagnosis and treatment planning.',
    category: 'children'
  }
];

const DentalFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'payment', label: 'Payment & Insurance' },
    { id: 'children', label: 'Children\'s Dentistry' }
  ];

  const toggleQuestion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  return (
    <section className="dental-faq">
      <div className="container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our dental services and procedures</p>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={activeCategory === category.id ? 'active' : ''}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="faq-list">
          <AnimatePresence>
            {filteredFaqs.map(faq => (
              <motion.div 
                key={faq.id}
                className="faq-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="faq-question"
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <h3>{faq.question}</h3>
                  <button className="toggle-btn">
                    {expandedId === faq.id ? <FiMinus /> : <FiPlus />}
                  </button>
                </div>
                
                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="faq-footer">
          <div className="info-box">
            <FiInfo className="info-icon" />
            <p>
              Can't find the answer you're looking for? Contact our office at{' '}
              <a href="tel:+919415070200">+91 9415070200</a> or{' '}
              <a href="mailto:advancedentalclinic17@gmail.com">advancedentalclinic17@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalFAQ; 