import React from 'react';
import { useGLTF } from '@react-three/drei';

const HealthyTeethModel = () => {
  const { scene } = useGLTF('/models/healthy-teeth.glb');
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};

export default HealthyTeethModel; 