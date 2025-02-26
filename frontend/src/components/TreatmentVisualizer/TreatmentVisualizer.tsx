import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';
import HealthyTeethModel from './models/HealthyTeethModel';
import CavityModel from './models/CavityModel';
import CrownModel from './models/CrownModel';
import ImplantModel from './models/ImplantModel';
import './TreatmentVisualizer.scss';

interface ModelOption {
  id: string;
  label: string;
  description: string;
  component: React.ComponentType;
}

const TreatmentVisualizer: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('normal');
  const [showInfo, setShowInfo] = useState<boolean>(false);
  
  const modelOptions: ModelOption[] = [
    { 
      id: 'normal', 
      label: 'Healthy Teeth',
      description: 'This model shows the anatomy of healthy teeth with proper structure, enamel, and gum tissue.',
      component: HealthyTeethModel
    },
    { 
      id: 'cavity', 
      label: 'Cavity Treatment',
      description: 'Visualize how we treat tooth decay by removing damaged areas and filling them with composite materials.',
      component: CavityModel
    },
    { 
      id: 'crown', 
      label: 'Dental Crown',
      description: 'See how dental crowns cap damaged teeth to restore their shape, size, strength, and appearance.',
      component: CrownModel
    },
    { 
      id: 'implant', 
      label: 'Dental Implant',
      description: 'Explore how dental implants replace tooth roots to provide a strong foundation for fixed or removable replacement teeth.',
      component: ImplantModel
    }
  ];
  
  const selectedModel = modelOptions.find(model => model.id === selectedModelId) || modelOptions[0];
  const ModelComponent = selectedModel.component;

  return (
    <div className="treatment-visualizer">
      <div className="model-selector">
        <h3>Select Treatment to Visualize</h3>
        <div className="model-options">
          {modelOptions.map((model) => (
            <motion.button
              key={model.id}
              className={`model-option ${selectedModelId === model.id ? 'selected' : ''}`}
              onClick={() => setSelectedModelId(model.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {model.label}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="model-viewer">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Suspense fallback={null}>
            <PresentationControls
              global
              zoom={0.8}
              rotation={[0, -Math.PI / 4, 0]}
              polar={[0, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <ModelComponent />
            </PresentationControls>
            <Environment preset="city" />
            <ContactShadows position={[0, -1.5, 0]} scale={10} blur={1.5} opacity={0.5} />
          </Suspense>
          <OrbitControls enableZoom={true} />
        </Canvas>
        
        <motion.button
          className="info-button"
          onClick={() => setShowInfo(!showInfo)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiInfo />
        </motion.button>
        
        <AnimatePresence>
          {showInfo && (
            <motion.div 
              className="model-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h4>{selectedModel.label}</h4>
              <p>{selectedModel.description}</p>
              <motion.button 
                className="close-info"
                onClick={() => setShowInfo(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="model-controls-help">
        <p>
          <strong>Controls:</strong> Click and drag to rotate. Scroll to zoom. Right-click and drag to pan.
        </p>
        <p className="note">
          This interactive 3D model helps you understand different dental treatments before your appointment.
        </p>
      </div>
    </div>
  );
};

export default TreatmentVisualizer; 