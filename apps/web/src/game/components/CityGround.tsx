import React from 'react';

export const CityGround: React.FC = () => {
  return (
    <group>
      {/* 1. Base Earth Foundation */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
        <planeGeometry args={[260, 260]} />
        <meshStandardMaterial color="#AAA99D" roughness={0.9} />
      </mesh>

      {/* 2. Asphalt Road Network (Deep olive charcoal realistic urban asphalt) */}
      {/* North-South Boulevard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[18, 190]} />
        <meshStandardMaterial color="#252923" roughness={0.88} metalness={0.08} />
      </mesh>

      {/* East-West Crossroad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} receiveShadow>
        <planeGeometry args={[190, 18]} />
        <meshStandardMaterial color="#252923" roughness={0.88} metalness={0.08} />
      </mesh>

      {/* 3. Road Markings (Warm sand double centerlines + Warm ivory lane dividers) */}
      {/* North-South Double Sand Centerlines */}
      {[-75, -55, -35, 35, 55, 75].map((z, idx) => (
        <group key={`ns-yellow-${idx}`} position={[0, 0.02, z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.2, 0, 0]}>
            <planeGeometry args={[0.15, 12]} />
            <meshBasicMaterial color="#D6C7A1" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0, 0]}>
            <planeGeometry args={[0.15, 12]} />
            <meshBasicMaterial color="#D6C7A1" />
          </mesh>
        </group>
      ))}

      {/* East-West Double Sand Centerlines */}
      {[-75, -55, -35, 35, 55, 75].map((x, idx) => (
        <group key={`ew-yellow-${idx}`} position={[x, 0.022, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.2]}>
            <planeGeometry args={[12, 0.15]} />
            <meshBasicMaterial color="#D6C7A1" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.2]}>
            <planeGeometry args={[12, 0.15]} />
            <meshBasicMaterial color="#D6C7A1" />
          </mesh>
        </group>
      ))}

      {/* Warm Ivory Lane Guidelines */}
      {[-75, -55, -35, 35, 55, 75].map((z, idx) => (
        <group key={`ns-white-${idx}`} position={[0, 0.02, z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.5, 0, 0]}>
            <planeGeometry args={[0.15, 6]} />
            <meshBasicMaterial color="#E8E4D9" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.5, 0, 0]}>
            <planeGeometry args={[0.15, 6]} />
            <meshBasicMaterial color="#E8E4D9" />
          </mesh>
        </group>
      ))}

      {/* Pedestrian Zebra Crossings at Central Intersection */}
      {/* North Crosswalk */}
      <group position={[0, 0.025, -11]}>
        {[-6, -4, -2, 0, 2, 4, 6].map((x, i) => (
          <mesh key={`zebra-n-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
            <planeGeometry args={[1.3, 3.8]} />
            <meshBasicMaterial color="#E8E4D9" />
          </mesh>
        ))}
      </group>

      {/* South Crosswalk */}
      <group position={[0, 0.025, 11]}>
        {[-6, -4, -2, 0, 2, 4, 6].map((x, i) => (
          <mesh key={`zebra-s-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
            <planeGeometry args={[1.3, 3.8]} />
            <meshBasicMaterial color="#E8E4D9" />
          </mesh>
        ))}
      </group>

      {/* East Crosswalk */}
      <group position={[11, 0.025, 0]}>
        {[-6, -4, -2, 0, 2, 4, 6].map((z, i) => (
          <mesh key={`zebra-e-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z]}>
            <planeGeometry args={[3.8, 1.3]} />
            <meshBasicMaterial color="#E8E4D9" />
          </mesh>
        ))}
      </group>

      {/* West Crosswalk */}
      <group position={[-11, 0.025, 0]}>
        {[-6, -4, -2, 0, 2, 4, 6].map((z, i) => (
          <mesh key={`zebra-w-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z]}>
            <planeGeometry args={[3.8, 1.3]} />
            <meshBasicMaterial color="#E8E4D9" />
          </mesh>
        ))}
      </group>

      {/* Muted Sage Bike Lane Strips */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7.8, 0.018, 0]}>
        <planeGeometry args={[1.4, 180]} />
        <meshStandardMaterial color="#78836B" roughness={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7.8, 0.018, 0]}>
        <planeGeometry args={[1.4, 180]} />
        <meshStandardMaterial color="#78836B" roughness={0.7} />
      </mesh>

      {/* 4. Warm Ivory Sidewalks & Deep Olive Curbs */}
      {/* North-West Block Sidewalk */}
      <mesh position={[-44, 0.12, -44]} receiveShadow castShadow>
        <boxGeometry args={[68, 0.24, 68]} />
        <meshStandardMaterial color="#E8E4D9" roughness={0.75} />
      </mesh>
      {/* North-East Block Sidewalk */}
      <mesh position={[44, 0.12, -44]} receiveShadow castShadow>
        <boxGeometry args={[68, 0.24, 68]} />
        <meshStandardMaterial color="#E8E4D9" roughness={0.75} />
      </mesh>
      {/* South-West Block Sidewalk */}
      <mesh position={[-44, 0.12, 44]} receiveShadow castShadow>
        <boxGeometry args={[68, 0.24, 68]} />
        <meshStandardMaterial color="#E8E4D9" roughness={0.75} />
      </mesh>
      {/* South-East Block Sidewalk */}
      <mesh position={[44, 0.12, 44]} receiveShadow castShadow>
        <boxGeometry args={[68, 0.24, 68]} />
        <meshStandardMaterial color="#E8E4D9" roughness={0.75} />
      </mesh>

      {/* Sidewalk Perimeter Curbs (Deep olive charcoal stone border) */}
      <mesh position={[-44, 0.14, -10]} receiveShadow>
        <boxGeometry args={[68, 0.28, 0.6]} />
        <meshStandardMaterial color="#252923" roughness={0.8} />
      </mesh>
      <mesh position={[-10, 0.14, -44]} receiveShadow>
        <boxGeometry args={[0.6, 0.28, 68]} />
        <meshStandardMaterial color="#252923" roughness={0.8} />
      </mesh>
      <mesh position={[44, 0.14, -10]} receiveShadow>
        <boxGeometry args={[68, 0.28, 0.6]} />
        <meshStandardMaterial color="#252923" roughness={0.8} />
      </mesh>
      <mesh position={[10, 0.14, -44]} receiveShadow>
        <boxGeometry args={[0.6, 0.28, 68]} />
        <meshStandardMaterial color="#252923" roughness={0.8} />
      </mesh>

      {/* 5. Central City Square Plaza (Warm Ivory Granite & Natural Water Fountain) */}
      <group position={[0, 0.14, 0]}>
        {/* Plaza Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[9.5, 48]} />
          <meshStandardMaterial color="#E8E4D9" roughness={0.65} />
        </mesh>
        {/* Decorative Concentric Paver Rings (Terracotta & Warm Sand) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[9.2, 9.6, 48]} />
          <meshStandardMaterial color="#A65F43" roughness={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[6.8, 7.1, 48]} />
          <meshStandardMaterial color="#D6C7A1" roughness={0.5} />
        </mesh>

        {/* Central Plaza Water Fountain */}
        <group position={[0, 0.2, 0]}>
          {/* Stone Basin Outer Rim */}
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[3.2, 3.4, 0.7, 32]} />
            <meshStandardMaterial color="#AAA99D" roughness={0.6} />
          </mesh>
          {/* Natural Water Surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.65, 0]}>
            <circleGeometry args={[2.9, 32]} />
            <meshStandardMaterial
              color="#4a6866"
              roughness={0.12}
              metalness={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Fountain Spout Tier */}
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.7, 1.2, 16]} />
            <meshStandardMaterial color="#30352E" roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#D6C7A1"
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
        </group>
      </group>

      {/* 6. Zenith Eco-Park (Muted Sage Greenery, Warm Sand Paths & Natural Lake) */}
      <group position={[0, 0.16, 52]}>
        {/* Park Lawn (Muted Sage) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[28, 22]} />
          <meshStandardMaterial color="#78836B" roughness={0.9} />
        </mesh>

        {/* Winding Warm Sand Gravel Path */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -3]}>
          <ringGeometry args={[8, 9.8, 32, 1, 0, Math.PI]} />
          <meshStandardMaterial color="#D6C7A1" roughness={0.85} />
        </mesh>

        {/* Natural Park Lake */}
        <group position={[0, 0, 2]}>
          {/* Lake Bed & Shoreline */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
            <circleGeometry args={[5.2, 32]} />
            <meshStandardMaterial color="#252923" roughness={0.9} />
          </mesh>
          {/* Lake Water Surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
            <circleGeometry args={[4.8, 32]} />
            <meshStandardMaterial
              color="#3e5855"
              roughness={0.15}
              metalness={0.55}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>

        {/* Decorative Flower Beds */}
        {[-8, 8].map((x, i) => (
          <group key={`flowerbed-${i}`} position={[x, 0.04, -6]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[1.5, 16]} />
              <meshStandardMaterial color="#252923" roughness={0.95} />
            </mesh>
            {/* Natural urban floral palette: Terracotta, Warm sand, Warm ivory */}
            {[-0.6, 0, 0.6].map((fx, fi) => (
              <mesh key={`fl-${fi}`} position={[fx, 0.15, 0]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial
                  color={fi === 0 ? '#A65F43' : fi === 1 ? '#D6C7A1' : '#E8E4D9'}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
};

export default CityGround;
