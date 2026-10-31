import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const CyberCore: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.y += delta * 0.5;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.z += delta * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.5;
      ring2Ref.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      {/* Central Urban Octahedron Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          color="#D6C7A1"
          emissive="#A65F43"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Wireframe outer shell */}
      <mesh>
        <octahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#78836B" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Orbiting Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#A65F43"
          emissive="#A65F43"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.7, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#D6C7A1"
          emissive="#D6C7A1"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[450px] sm:h-[520px] relative rounded-2xl overflow-hidden bg-urban-panel border border-urban-sand/20 shadow-urban-panel">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-urban-olive border border-urban-sand/25 text-xs font-mono text-urban-sand">
        <span className="w-2 h-2 rounded-full bg-urban-sand animate-ping"></span>
        <span>SPATIAL ENGINE: THREE.JS / R3F</span>
      </div>

      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#fffcf0" />
        <pointLight position={[-10, -5, -5]} intensity={1.0} color="#D6C7A1" />

        <CyberCore />

        <Stars radius={50} depth={40} count={600} factor={2} saturation={0.2} fade speed={1.2} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-10 text-[11px] font-mono text-urban-stone bg-urban-olive px-3 py-1 rounded border border-urban-sand/20">
        Drag to inspect 3D core
      </div>
    </div>
  );
};

export default HeroScene;
