import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ThirdPersonCameraProps {
  targetPosition: [number, number, number];
  onYawChange: (yaw: number) => void;
}

export const ThirdPersonCamera: React.FC<ThirdPersonCameraProps> = ({
  targetPosition,
  onYawChange,
}) => {
  const { camera, gl } = useThree();

  const yaw = useRef<number>(0);
  const pitch = useRef<number>(0.28); // natural elevated looking-down angle
  const distance = useRef<number>(9.5); // comfortable third-person distance
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      yaw.current -= deltaX * 0.005;
      // Clamp pitch to avoid ground clipping or unnatural flipping
      pitch.current = Math.max(0.05, Math.min(0.75, pitch.current + deltaY * 0.0035));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      onYawChange(yaw.current);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Zoom in / out with mouse wheel
    const handleWheel = (e: WheelEvent) => {
      distance.current = Math.max(5.5, Math.min(18.0, distance.current + e.deltaY * 0.01));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gl, onYawChange]);

  useFrame((_state, delta) => {
    const heightOffset = 2.4;
    const target = new THREE.Vector3(
      targetPosition[0],
      targetPosition[1] + 1.4, // Look at player's upper chest/head
      targetPosition[2]
    );

    // Calculate spherical camera offset
    const horizDist = distance.current * Math.cos(pitch.current);
    const vertDist = distance.current * Math.sin(pitch.current);

    const camX = target.x - Math.sin(yaw.current) * horizDist;
    const camZ = target.z - Math.cos(yaw.current) * horizDist;
    const camY = target.y + heightOffset + vertDist * 0.75;

    const idealPosition = new THREE.Vector3(camX, camY, camZ);

    // Smooth lerp tracking
    camera.position.lerp(idealPosition, delta * 8.0);
    camera.lookAt(target);
  });

  return null;
};

export default ThirdPersonCamera;
