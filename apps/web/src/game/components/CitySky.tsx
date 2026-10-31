import React from 'react';
import { Sky } from '@react-three/drei';

export const CitySky: React.FC = () => {
  return (
    <>
      {/* 1. Atmospheric Daytime Sky & Horizon Fog (Warm, cinematic urban daylight) */}
      <color attach="background" args={['#ded9ce']} />
      <fog attach="fog" args={['#ded9ce', 90, 260]} />

      {/* 2. Realistic Sun Dome & Atmospheric Rayleigh Scattering */}
      <Sky
        distance={450000}
        sunPosition={[70, 95, 50]}
        inclination={0.48}
        azimuth={0.25}
        turbidity={5}
        rayleigh={0.65}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* 3. Natural Sky-to-Ground Hemisphere Light (Simulates sky bounce & natural ground reflection) */}
      <hemisphereLight color="#eef0e8" groundColor="#78836b" intensity={1.1} />

      {/* 4. Warm Golden Directional Sunlight */}
      <directionalLight
        position={[70, 95, 50]}
        intensity={2.2}
        color="#fffcf0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={10}
        shadow-camera-far={260}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-bias={-0.0004}
      />

      {/* 5. Soft Secondary Fill Light (Prevents harsh pure-black shadows) */}
      <directionalLight position={[-60, 45, -50]} intensity={0.65} color="#d6c7a1" />

      {/* 6. Subtle Ambient Light */}
      <ambientLight intensity={0.45} color="#e8e4d9" />

      {/* 7. Stylized Low-Poly Puffy Clouds Floating in the Horizon */}
      <group position={[0, 55, 0]}>
        {[
          [-60, 0, -80],
          [40, 6, -95],
          [-90, 4, 30],
          [75, -2, 70],
          [-30, 8, 90],
          [10, 5, -110],
        ].map((pos, i) => (
          <group key={`cloud-${i}`} position={pos as [number, number, number]}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[7, 10, 10]} />
              <meshStandardMaterial color="#E8E4D9" roughness={0.9} transparent opacity={0.85} />
            </mesh>
            <mesh position={[5, -1, 0]}>
              <sphereGeometry args={[5.5, 10, 10]} />
              <meshStandardMaterial color="#E8E4D9" roughness={0.9} transparent opacity={0.85} />
            </mesh>
            <mesh position={[-5, -1, 0]}>
              <sphereGeometry args={[5.5, 10, 10]} />
              <meshStandardMaterial color="#E8E4D9" roughness={0.9} transparent opacity={0.85} />
            </mesh>
            <mesh position={[0, -2, 2]}>
              <sphereGeometry args={[6, 10, 10]} />
              <meshStandardMaterial color="#E8E4D9" roughness={0.9} transparent opacity={0.85} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
};

export default CitySky;
