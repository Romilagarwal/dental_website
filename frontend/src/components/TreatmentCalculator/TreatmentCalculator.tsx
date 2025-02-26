import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiInfo } from 'react-icons/fi';

interface Treatment {
  id: string;
  name: string;
  basePrice: number;
  options: {
    id: string;
    name: string;
    price: number;
  }[];
}

const treatments: Treatment[] = [
  {
    id: 'cleaning',
    name: 'Teeth Cleaning',
    basePrice: 1000,
    options: [
      { id: 'basic', name: 'Basic Cleaning', price: 0 },
      { id: 'deep', name: 'Deep Cleaning', price: 1500 },
      { id: 'premium', name: 'Premium Cleaning + Polishing', price: 2500 }
    ]
  },
  {
    id: 'rootcanal',
    name: 'Root Canal',
    basePrice: 8000,
    options: [
      { id: 'single', name: 'Single Root', price: 0 },
      { id: 'multiple', name: 'Multiple Roots', price: 4000 }
    ]
  },
  // Add more treatments
];

const TreatmentCalculator: React.FC = () => {
  const [selectedTreatments, setSelectedTreatments] = useState<{[key: string]: string}>({});
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateTotal = () => {
    return Object.entries(selectedTreatments).reduce((total, [treatmentId, optionId]) => {
      const treatment = treatments.find(t => t.id === treatmentId);
      if (!treatment) return total;
      
      const option = treatment.options.find(o => o.id === optionId);
      return total + treatment.basePrice + (option?.price || 0);
    }, 0);
  };

  return (
    <div className="treatment-calculator">
      <h2 className="text-2xl font-bold mb-6">Treatment Cost Calculator</h2>
      
      <div className="treatments-list space-y-6">
        {treatments.map((treatment) => (
          <motion.div
            key={treatment.id}
            className="treatment-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-2">{treatment.name}</h3>
            <div className="options-grid grid grid-cols-1 sm:grid-cols-3 gap-3">
              {treatment.options.map((option) => (
                <button
                  key={option.id}
                  className={`option-btn ${
                    selectedTreatments[treatment.id] === option.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedTreatments({
                    ...selectedTreatments,
                    [treatment.id]: option.id
                  })}
                >
                  <span className="option-name">{option.name}</span>
                  <span className="option-price">
                    +₹{option.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="cost-summary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-between items-center mt-8 mb-4">
          <h3 className="text-xl font-bold">Estimated Total</h3>
          <button
            className="info-btn"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            <FiInfo />
          </button>
        </div>

        <div className="total-amount text-3xl font-bold text-blue-600">
          ₹{calculateTotal().toLocaleString()}
        </div>

        {showBreakdown && (
          <motion.div
            className="cost-breakdown mt-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
          >
            {Object.entries(selectedTreatments).map(([treatmentId, optionId]) => {
              const treatment = treatments.find(t => t.id === treatmentId);
              const option = treatment?.options.find(o => o.id === optionId);
              if (!treatment || !option) return null;

              return (
                <div key={treatmentId} className="breakdown-item">
                  <span>{treatment.name} - {option.name}</span>
                  <span>₹{(treatment.basePrice + option.price).toLocaleString()}</span>
                </div>
              );
            })}
          </motion.div>
        )}

        <button className="schedule-btn mt-6">
          Schedule Appointment
        </button>
      </motion.div>
    </div>
  );
};

export default TreatmentCalculator; 