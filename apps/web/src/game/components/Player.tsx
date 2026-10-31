import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLLISION_BOXES, WORLD_BOUNDS, PLAYER_SPAWN_POSITION } from '../constants/cityLayout';

interface PlayerProps {
  onPositionUpdate: (pos: [number, number, number]) => void;
  cameraAngle: number;
  isPaused?: boolean;
}

export const Player: React.FC<PlayerProps> = ({ onPositionUpdate, cameraAngle, isPaused = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);

  // Keyboard state
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });

  // Physical coordinates
  const position = useRef<THREE.Vector3>(new THREE.Vector3(...PLAYER_SPAWN_POSITION));
  const rotation = useRef<number>(0);
  const walkCycle = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = false;
          break;
      }
    };

    const handleBlur = () => {
      keys.current = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        sprint: false,
      };
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const isColliding = (x: number, z: number): boolean => {
    // 1. World Bounds
    if (
      x < WORLD_BOUNDS.minX ||
      x > WORLD_BOUNDS.maxX ||
      z < WORLD_BOUNDS.minZ ||
      z > WORLD_BOUNDS.maxZ
    ) {
      return true;
    }

    // 2. Obstacles / Buildings
    const radius = 0.7;
    for (const box of COLLISION_BOXES) {
      if (
        x + radius > box.minX &&
        x - radius < box.maxX &&
        z + radius > box.minZ &&
        z - radius < box.maxZ
      ) {
        return true;
      }
    }
    return false;
  };

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    if (isPaused) {
      keys.current = { forward: false, backward: false, left: false, right: false, sprint: false };
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0;
      if (rightArmRef.current) rightArmRef.current.rotation.x = 0;
      if (torsoRef.current) torsoRef.current.rotation.x = 0;
      return;
    }

    let moveZ = 0;
    let moveX = 0;

    if (keys.current.forward) moveZ -= 1;
    if (keys.current.backward) moveZ += 1;
    if (keys.current.left) moveX -= 1;
    if (keys.current.right) moveX += 1;

    const isMoving = moveX !== 0 || moveZ !== 0;

    if (isMoving) {
      const inputVector = new THREE.Vector2(moveX, moveZ).normalize();
      const angle = Math.atan2(inputVector.x, inputVector.y) + cameraAngle;
      rotation.current = angle;

      const baseSpeed = 8.0;
      const sprintMultiplier = keys.current.sprint ? 1.65 : 1.0;
      const speed = baseSpeed * sprintMultiplier * delta;

      const dx = Math.sin(angle) * speed;
      const dz = Math.cos(angle) * speed;

      // Wall-sliding collision
      let newX = position.current.x;
      let newZ = position.current.z;

      if (!isColliding(position.current.x + dx, position.current.z)) {
        newX += dx;
      }
      if (!isColliding(newX, position.current.z + dz)) {
        newZ += dz;
      }

      position.current.x = newX;
      position.current.z = newZ;

      // Limb animation swing
      walkCycle.current += delta * (keys.current.sprint ? 16 : 11);
      const legSwing = Math.sin(walkCycle.current) * (keys.current.sprint ? 0.7 : 0.45);
      const armSwing = Math.sin(walkCycle.current) * (keys.current.sprint ? 0.6 : 0.38);

      if (leftLegRef.current) leftLegRef.current.rotation.x = legSwing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -legSwing;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -armSwing;
      if (rightArmRef.current) rightArmRef.current.rotation.x = armSwing;
      if (torsoRef.current) torsoRef.current.rotation.x = keys.current.sprint ? 0.16 : 0.04;
    } else {
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0;
      if (rightArmRef.current) rightArmRef.current.rotation.x = 0;
      if (torsoRef.current) torsoRef.current.rotation.x = 0;
    }

    groupRef.current.position.copy(position.current);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotation.current,
      delta * 14
    );

    onPositionUpdate([position.current.x, position.current.y, position.current.z]);
  });

  return (
    <group ref={groupRef} position={PLAYER_SPAWN_POSITION}>
      {/* 1. Character Torso & Runner Parka Jacket (Warm Sand & Terracotta for high visibility against city) */}
      <group ref={torsoRef} position={[0, 1.25, 0]}>
        {/* Main Athletic Parka Body */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.72, 0.88, 0.42]} />
          <meshStandardMaterial color="#D6C7A1" roughness={0.45} />
        </mesh>

        {/* Warm Ivory Chest Accent Panel */}
        <mesh position={[0, 0.08, 0.22]}>
          <boxGeometry args={[0.55, 0.5, 0.02]} />
          <meshStandardMaterial color="#E8E4D9" roughness={0.5} />
        </mesh>

        {/* Terracotta Central Zipper Strip */}
        <mesh position={[0, 0, 0.235]}>
          <boxGeometry args={[0.06, 0.85, 0.01]} />
          <meshStandardMaterial color="#A65F43" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Functional Tactical Tech Pack */}
        <mesh position={[0, 0.06, -0.26]} castShadow>
          <boxGeometry args={[0.46, 0.55, 0.18]} />
          <meshStandardMaterial color="#252923" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.15, -0.36]}>
          <boxGeometry args={[0.3, 0.06, 0.02]} />
          <meshStandardMaterial color="#D6C7A1" />
        </mesh>

        {/* 2. Head with Hair & Sunglasses */}
        <group position={[0, 0.72, 0]}>
          {/* Head / Skin Tone */}
          <mesh castShadow>
            <sphereGeometry args={[0.24, 16, 16]} />
            <meshStandardMaterial color="#D6C7A1" roughness={0.7} />
          </mesh>
          {/* Dark Modern Hair / Cap */}
          <mesh position={[0, 0.1, -0.04]} castShadow>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshStandardMaterial color="#252923" roughness={0.8} />
          </mesh>
          {/* Cap Brim */}
          <mesh position={[0, 0.12, 0.22]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[0.34, 0.04, 0.2]} />
            <meshStandardMaterial color="#A65F43" />
          </mesh>
          {/* Sleek Sunglasses / Visor */}
          <mesh position={[0, 0.02, 0.2]}>
            <boxGeometry args={[0.32, 0.1, 0.08]} />
            <meshStandardMaterial color="#30352E" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* 3. Left Arm (Jacket sleeve + Hand) */}
        <group ref={leftArmRef} position={[-0.46, 0.32, 0]}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.2, 0.66, 0.22]} />
            <meshStandardMaterial color="#D6C7A1" roughness={0.45} />
          </mesh>
          {/* Terracotta sleeve cuff */}
          <mesh position={[0, -0.62, 0]}>
            <boxGeometry args={[0.21, 0.08, 0.23]} />
            <meshStandardMaterial color="#A65F43" />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.72, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#D6C7A1" />
          </mesh>
        </group>

        {/* 4. Right Arm */}
        <group ref={rightArmRef} position={[0.46, 0.32, 0]}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.2, 0.66, 0.22]} />
            <meshStandardMaterial color="#D6C7A1" roughness={0.45} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <boxGeometry args={[0.21, 0.08, 0.23]} />
            <meshStandardMaterial color="#A65F43" />
          </mesh>
          <mesh position={[0, -0.72, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#D6C7A1" />
          </mesh>
        </group>
      </group>

      {/* 5. Left Leg (Deep Olive Charcoal Joggers & Stone Grey Boots) */}
      <group ref={leftLegRef} position={[-0.2, 0.8, 0]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.24, 0.8, 0.26]} />
          <meshStandardMaterial color="#252923" roughness={0.7} />
        </mesh>
        {/* Sneaker Body */}
        <mesh position={[0, -0.74, 0.05]} castShadow>
          <boxGeometry args={[0.25, 0.16, 0.36]} />
          <meshStandardMaterial color="#AAA99D" roughness={0.5} />
        </mesh>
        {/* Terracotta Accent Sole */}
        <mesh position={[0, -0.82, 0.05]}>
          <boxGeometry args={[0.26, 0.04, 0.38]} />
          <meshStandardMaterial color="#A65F43" />
        </mesh>
      </group>

      {/* 6. Right Leg */}
      <group ref={rightLegRef} position={[0.2, 0.8, 0]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.24, 0.8, 0.26]} />
          <meshStandardMaterial color="#252923" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.74, 0.05]} castShadow>
          <boxGeometry args={[0.25, 0.16, 0.36]} />
          <meshStandardMaterial color="#AAA99D" roughness={0.5} />
        </mesh>
        {/* Terracotta Sole */}
        <mesh position={[0, -0.82, 0.05]}>
          <boxGeometry args={[0.26, 0.04, 0.38]} />
          <meshStandardMaterial color="#A65F43" />
        </mesh>
      </group>

      {/* Soft Ground Contact Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.65, 24]} />
        <meshBasicMaterial color="#252923" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

export default Player;
