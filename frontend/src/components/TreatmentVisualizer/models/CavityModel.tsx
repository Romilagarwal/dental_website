import React from 'react';
import { useGLTF } from '@react-three/drei';

const CavityModel = () => {
  const { scene } = useGLTF('/models/cavity-treatment.glb');
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};

export default CavityModel; 