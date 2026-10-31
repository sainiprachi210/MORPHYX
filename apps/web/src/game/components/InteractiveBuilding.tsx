import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveBuildingData } from '../types';
import BuildingMesh from './BuildingMesh';

interface InteractiveBuildingProps {
  data: InteractiveBuildingData;
  isNearby: boolean;
  onInteract?: () => void;
}

export const InteractiveBuilding: React.FC<InteractiveBuildingProps> = ({
  data,
  isNearby,
  onInteract,
}) => {
  const beaconRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 1.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8;
    }
  });

  const [ix, , iz] = data.interactionPoint;

  return (
    <group>
      {/* 1. Main Architectural Building */}
      <BuildingMesh
        position={data.position}
        size={data.size}
        color={data.color}
        accentColor={data.accentColor}
        name={data.name}
        isInteractive={true}
      />

      {/* 2. Interactive Threshold Marker on Ground */}
      <group
        position={[ix, 0.16, iz]}
        onClick={e => {
          e.stopPropagation();
          if (onInteract) onInteract();
        }}
      >
        {/* Warm Ivory Stone Paver Welcome Circle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2.0, 32]} />
          <meshStandardMaterial color="#E8E4D9" roughness={0.65} metalness={0.15} />
        </mesh>

        {/* Elegant Accent Border Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[1.8, 2.05, 32]} />
          <meshStandardMaterial color={data.accentColor} roughness={0.35} metalness={0.6} />
        </mesh>

        {/* Inner Subtle Rotating Compass Ring */}
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
          <ringGeometry args={[0.9, 1.2, 8]} />
          <meshBasicMaterial
            color="#D6C7A1"
            wireframe
            transparent
            opacity={isNearby ? 0.9 : 0.4}
          />
        </mesh>

        {/* Floating Architectural Waypoint Gem */}
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.6} position={[0, 3.2, 0]}>
          <mesh ref={beaconRef} castShadow>
            <octahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial
              color={data.accentColor}
              roughness={0.2}
              metalness={0.7}
              emissive={data.accentColor}
              emissiveIntensity={isNearby ? 0.8 : 0.35}
            />
          </mesh>
          {/* Subtle Outer Ring */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.85, 0.02, 16, 32]} />
            <meshStandardMaterial
              color="#D6C7A1"
              emissive="#D6C7A1"
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>

        {/* Warm Proximity Ambient Lantern Light (Active when player approaches) */}
        {isNearby && (
          <pointLight
            position={[0, 2.2, 0]}
            color="#D6C7A1"
            intensity={1.2}
            distance={8}
          />
        )}
      </group>
    </group>
  );
};

export default InteractiveBuilding;
