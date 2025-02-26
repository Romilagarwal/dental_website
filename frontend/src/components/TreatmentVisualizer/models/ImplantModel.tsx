import React from 'react';
import { useGLTF } from '@react-three/drei';

const ImplantModel = () => {
  const { scene } = useGLTF('/models/dental-implant.glb');
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};

export default ImplantModel; 