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
      {/* Central Cyber Octahedron Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#005577"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe outer shell */}
      <mesh>
        <octahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#9d4edd" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Orbiting Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.03, 16, 64]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
      </mesh>

      {/* Orbiting Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.7, 0.025, 16, 64]} />
        <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={1.2} />
      </mesh>
    </Float>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[450px] sm:h-[520px] relative rounded-2xl overflow-hidden cyber-glass border border-cyan-500/30">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/40 text-xs font-mono text-cyan-400">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>SPATIAL ENGINE: THREE.JS / R3F</span>
      </div>

      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -5, -5]} intensity={1.8} color="#9d4edd" />

        <CyberCore />

        <Stars radius={50} depth={40} count={1200} factor={3} saturation={0.8} fade speed={1.2} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-10 text-[11px] font-mono text-slate-400 bg-slate-950/70 px-3 py-1 rounded border border-slate-800">
        Drag to inspect 3D core
      </div>
    </div>
  );
};

export default HeroScene;
