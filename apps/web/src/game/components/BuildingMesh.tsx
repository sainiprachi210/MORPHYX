import React, { useMemo } from 'react';

interface BuildingMeshProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  accentColor: string;
  name?: string;
  isInteractive?: boolean;
}

export const BuildingMesh: React.FC<BuildingMeshProps> = ({
  position,
  size,
  color,
  accentColor,
  isInteractive = false,
}) => {
  const [width, height, depth] = size;

  // Window grid computation
  const windowRows = Math.max(2, Math.floor(height / 4));
  const windowCols = Math.max(2, Math.floor(width / 3.5));

  const windows = useMemo(() => {
    const coords: [number, number, number][] = [];
    const stepY = (height * 0.72) / windowRows;
    const stepX = (width * 0.72) / windowCols;
    const startY = -height * 0.32 + stepY / 2;
    const startX = -width * 0.36 + stepX / 2;

    for (let r = 0; r < windowRows; r++) {
      for (let c = 0; c < windowCols; c++) {
        // Front face windows
        coords.push([startX + c * stepX, startY + r * stepY, depth / 2 + 0.05]);
      }
    }
    return coords;
  }, [width, height, depth, windowRows, windowCols]);

  return (
    <group position={position}>
      {/* 1. Main Architectural Structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.65} metalness={0.2} />
      </mesh>

      {/* 2. Architectural Floor Bandings (Horizontal trims) */}
      {[0.25, 0.5, 0.75].map((fraction, i) => (
        <mesh key={`band-${i}`} position={[0, -height / 2 + height * fraction, 0]}>
          <boxGeometry args={[width + 0.15, 0.3, depth + 0.15]} />
          <meshStandardMaterial color="#D6C7A1" roughness={0.6} metalness={0.2} />
        </mesh>
      ))}

      {/* 3. Roof Parapet Cornice / Crown Trim */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[width + 0.35, 0.7, depth + 0.35]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} metalness={0.4} />
      </mesh>

      {/* 4. Base Plinth Stone Curb */}
      <mesh position={[0, -height / 2 + 0.5, 0]} receiveShadow>
        <boxGeometry args={[width + 0.3, 1.0, depth + 0.3]} />
        <meshStandardMaterial color="#252923" roughness={0.8} />
      </mesh>

      {/* 5. Daytime Reflective Architectural Windows */}
      {windows.map((pos, idx) => (
        <group key={`win-${idx}`} position={pos}>
          {/* Window Frame */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[1.35, 1.55]} />
            <meshStandardMaterial color="#252923" roughness={0.7} />
          </mesh>
          {/* Natural Architectural Glass */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[1.2, 1.4]} />
            <meshStandardMaterial
              color="#5d6b67"
              roughness={0.15}
              metalness={0.65}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* 6. Rooftop Mechanical Enclosure / AC Chillers */}
      <mesh position={[0, height / 2 + 1.2, 0]} castShadow>
        <boxGeometry args={[width * 0.4, 2.2, depth * 0.4]} />
        <meshStandardMaterial color="#30352E" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Architectural Communications Spire */}
      <mesh position={[0, height / 2 + 3.8, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.18, 4.2, 8]} />
        <meshStandardMaterial color="#AAA99D" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* 7. Welcoming Entrance Canopy & Doors */}
      <group position={[0, -height / 2 + 1.8, depth / 2 + 0.1]}>
        {/* Overhead Glass Canopy */}
        <mesh position={[0, 1.8, 1.2]} rotation={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[width * 0.32, 0.15, 2.4]} />
          <meshStandardMaterial
            color="#D6C7A1"
            roughness={0.2}
            metalness={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Canopy Support Brackets */}
        <mesh position={[-width * 0.14, 1.2, 0.6]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
          <meshStandardMaterial color="#30352E" metalness={0.8} />
        </mesh>
        <mesh position={[width * 0.14, 1.2, 0.6]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
          <meshStandardMaterial color="#30352E" metalness={0.8} />
        </mesh>

        {/* Entrance Doorway Inset */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[3.6, 3.4]} />
          <meshStandardMaterial color="#252923" roughness={0.8} />
        </mesh>

        {/* Double Glass Doors */}
        <mesh position={[-0.85, 0, 0.04]}>
          <planeGeometry args={[1.5, 3.1]} />
          <meshStandardMaterial
            color="#5d6b67"
            roughness={0.15}
            metalness={0.6}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0.85, 0, 0.04]}>
          <planeGeometry args={[1.5, 3.1]} />
          <meshStandardMaterial
            color="#5d6b67"
            roughness={0.15}
            metalness={0.6}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Door Handles (Warm Sand Metal) */}
        <mesh position={[-0.15, 0, 0.08]}>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#D6C7A1" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.15, 0, 0.08]}>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#D6C7A1" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Entrance Signboard */}
        {isInteractive && (
          <mesh position={[0, 2.2, 0.06]}>
            <boxGeometry args={[4.2, 0.6, 0.1]} />
            <meshStandardMaterial color="#252923" roughness={0.4} />
          </mesh>
        )}
      </group>
    </group>
  );
};

export default BuildingMesh;
