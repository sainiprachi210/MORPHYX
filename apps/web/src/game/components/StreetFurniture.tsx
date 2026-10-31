import React from 'react';
import { STREETLIGHT_POSITIONS, TREE_POSITIONS } from '../constants/cityLayout';

export const StreetFurniture: React.FC = () => {
  return (
    <group>
      {/* 1. Contemporary Daytime Streetlights */}
      {STREETLIGHT_POSITIONS.map((pos, idx) => (
        <group key={`streetlight-${idx}`} position={pos}>
          {/* Base Flange (Deep Olive Charcoal) */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.32, 0.4, 8]} />
            <meshStandardMaterial color="#252923" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Sleek Tapered Pole (Dark Panel) */}
          <mesh position={[0, 3.2, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.12, 6.0, 8]} />
            <meshStandardMaterial color="#30352E" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Modern Curved Arm */}
          <mesh position={[0.65, 6.1, 0]} rotation={[0, 0, -Math.PI / 7]}>
            <cylinderGeometry args={[0.05, 0.05, 1.6, 8]} />
            <meshStandardMaterial color="#30352E" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* LED Fixture Head */}
          <mesh position={[1.3, 5.8, 0]} castShadow>
            <boxGeometry args={[0.6, 0.16, 0.32]} />
            <meshStandardMaterial color="#252923" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Warm Sand Incandescent Diffuser Lens */}
          <mesh position={[1.3, 5.7, 0]}>
            <planeGeometry args={[0.5, 0.24]} />
            <meshStandardMaterial color="#D6C7A1" emissive="#D6C7A1" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* 2. Lush Variegated Muted Sage Trees with Mulch Planters */}
      {TREE_POSITIONS.map((pos, idx) => {
        // Natural height & sage shade variation
        const isPark = pos[2] > 40;
        const trunkHeight = isPark ? 2.8 : 2.4;
        const scale = 0.9 + (idx % 3) * 0.15;
        const foliageColor1 = isPark ? '#5a654e' : '#67735b';
        const foliageColor2 = isPark ? '#67735b' : '#78836B';
        const foliageColor3 = isPark ? '#78836B' : '#88947b';

        return (
          <group key={`tree-${idx}`} position={pos} scale={[scale, scale, scale]}>
            {/* Sidewalk Stone Planter Box */}
            <mesh position={[0, 0.15, 0]} receiveShadow>
              <cylinderGeometry args={[1.3, 1.4, 0.3, 16]} />
              <meshStandardMaterial color="#AAA99D" roughness={0.8} />
            </mesh>
            {/* Deep Earth Soil */}
            <mesh position={[0, 0.28, 0]}>
              <cylinderGeometry args={[1.15, 1.15, 0.05, 16]} />
              <meshStandardMaterial color="#252923" roughness={0.95} />
            </mesh>

            {/* Tree Trunk */}
            <mesh position={[0, trunkHeight / 2 + 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.38, trunkHeight, 8]} />
              <meshStandardMaterial color="#252923" roughness={0.9} />
            </mesh>

            {/* Organic Foliage Canopy (Muted sage clusters) */}
            <group position={[0, trunkHeight + 1.2, 0]}>
              {/* Central Primary Foliage Sphere */}
              <mesh position={[0, 0.8, 0]} castShadow>
                <sphereGeometry args={[1.7, 8, 8]} />
                <meshStandardMaterial color={foliageColor2} roughness={0.85} />
              </mesh>
              {/* Lower Tier Left */}
              <mesh position={[-0.8, 0.2, 0.5]} castShadow>
                <sphereGeometry args={[1.3, 8, 8]} />
                <meshStandardMaterial color={foliageColor1} roughness={0.85} />
              </mesh>
              {/* Lower Tier Right */}
              <mesh position={[0.8, 0.1, -0.4]} castShadow>
                <sphereGeometry args={[1.35, 8, 8]} />
                <meshStandardMaterial color={foliageColor1} roughness={0.85} />
              </mesh>
              {/* Top Sunlit Tier */}
              <mesh position={[0.2, 1.8, 0.1]} castShadow>
                <sphereGeometry args={[1.2, 8, 8]} />
                <meshStandardMaterial color={foliageColor3} roughness={0.8} />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* 3. Park Benches with Terracotta Wood and Cast Iron */}
      {[-8, 8, -5, 5].map((x, i) => (
        <group
          key={`bench-${i}`}
          position={[x, 0.3, i < 2 ? 46 : 58]}
          rotation={[0, x > 0 ? -Math.PI / 4 : Math.PI / 4, 0]}
        >
          {/* Terracotta Wood Seat Slats */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[2.4, 0.08, 0.55]} />
            <meshStandardMaterial color="#A65F43" roughness={0.7} />
          </mesh>
          {/* Terracotta Wood Backrest */}
          <mesh position={[0, 0.85, -0.24]} rotation={[-0.1, 0, 0]} castShadow>
            <boxGeometry args={[2.4, 0.55, 0.08]} />
            <meshStandardMaterial color="#A65F43" roughness={0.7} />
          </mesh>
          {/* Cast Iron Legs (Deep Olive Charcoal) */}
          <mesh position={[-1.0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.08, 0.45, 0.5]} />
            <meshStandardMaterial color="#252923" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[1.0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.08, 0.45, 0.5]} />
            <meshStandardMaterial color="#252923" metalness={0.8} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* 4. Pedestrian Crosswalk Safety Bollards */}
      {[-10, 10].map(x =>
        [-10, 10].map(z => (
          <group
            key={`bollard-${x}-${z}`}
            position={[x > 0 ? x + 1.2 : x - 1.2, 0.25, z > 0 ? z + 1.2 : z - 1.2]}
          >
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.12, 0.14, 0.8, 12]} />
              <meshStandardMaterial color="#30352E" metalness={0.7} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.75, 0]}>
              <sphereGeometry args={[0.13, 12, 12]} />
              <meshStandardMaterial color="#D6C7A1" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))
      )}
    </group>
  );
};

export default StreetFurniture;
