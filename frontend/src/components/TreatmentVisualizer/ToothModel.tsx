import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ToothModel({ treatment = 'healthy', ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/tooth.glb');
  const { actions } = useAnimations(animations, group);

  // Treatment-specific material modifications
  React.useEffect(() => {
    switch (treatment) {
      case 'cavity':
        materials.tooth.color = new THREE.Color('#d4a373');
        materials.tooth.roughness = 0.8;
        break;
      case 'treated':
        materials.tooth.color = new THREE.Color('#f5f5f5');
        materials.tooth.metalness = 0.3;
        break;
      default:
        materials.tooth.color = new THREE.Color('#ffffff');
    }
  }, [treatment, materials]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.tooth.geometry}
        material={materials.tooth}
        castShadow
        receiveShadow
      />
    </group>
  );
} 