import React from 'react';
import { useGLTF } from '@react-three/drei';

const CrownModel = () => {
  const { scene } = useGLTF('/models/dental-crown.glb');
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};

export default CrownModel; 