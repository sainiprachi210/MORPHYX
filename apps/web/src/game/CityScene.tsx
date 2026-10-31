import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  INTERACTIVE_BUILDINGS,
  ALL_INTERACTIVE_BUILDINGS,
  STATIC_BUILDINGS,
  PLAYER_SPAWN_POSITION,
} from './constants/cityLayout';
import { InteractiveBuildingData } from './types';
import { MissionProvider } from './missions/MissionContext';
import CitySky from './components/CitySky';
import CityGround from './components/CityGround';
import StreetFurniture from './components/StreetFurniture';
import InteractiveBuilding from './components/InteractiveBuilding';
import BuildingMesh from './components/BuildingMesh';
import Player from './components/Player';
import ThirdPersonCamera from './components/ThirdPersonCamera';
import ControlsGuide from './hud/ControlsGuide';
import InteractionPrompt from './hud/InteractionPrompt';
import BuildingModal from './hud/BuildingModal';
import MiniMap from './hud/MiniMap';
import CityHUD from './hud/CityHUD';
import MissionTracker from './hud/MissionTracker';
import MissionNotification from './hud/MissionNotification';

const CitySceneContent: React.FC = () => {
  const [playerPos, setPlayerPos] = useState<[number, number, number]>(PLAYER_SPAWN_POSITION);
  const [cameraAngle, setCameraAngle] = useState<number>(0);
  const [nearbyBuilding, setNearbyBuilding] = useState<InteractiveBuildingData | null>(null);
  const [modalBuilding, setModalBuilding] = useState<InteractiveBuildingData | null>(null);

  // Proximity check whenever player position updates
  const handlePositionUpdate = useCallback((pos: [number, number, number]) => {
    setPlayerPos(pos);

    let closest: InteractiveBuildingData | null = null;
    let minDistance = Infinity;

    for (const b of ALL_INTERACTIVE_BUILDINGS) {
      const [ix, , iz] = b.interactionPoint;
      const dist = Math.hypot(pos[0] - ix, pos[2] - iz);
      if (dist < b.interactionRadius && dist < minDistance) {
        minDistance = dist;
        closest = b;
      }
    }

    setNearbyBuilding(closest);
  }, []);

  // Keyboard 'E' listener for interaction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (
        (e.code === 'KeyE' || e.key === 'e' || e.key === 'E') &&
        nearbyBuilding &&
        !modalBuilding
      ) {
        setModalBuilding(nearbyBuilding);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearbyBuilding, modalBuilding]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-urban-olive select-none">
      {/* 1. Full-Screen 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 24], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <CitySky />
        <CityGround />
        <StreetFurniture />

        {/* Static Modern Skyscrapers & City Blocks */}
        {STATIC_BUILDINGS.map(b => (
          <BuildingMesh
            key={b.id}
            position={b.position}
            size={b.size}
            color={b.color}
            accentColor={b.accentColor}
            name={b.name}
            isInteractive={false}
          />
        ))}

        {/* Interactive Milestone Buildings */}
        {INTERACTIVE_BUILDINGS.map(b => (
          <InteractiveBuilding
            key={b.id}
            data={b}
            isNearby={nearbyBuilding?.id === b.id}
            onInteract={() => setModalBuilding(b)}
          />
        ))}

        {/* Third-Person Player Character */}
        <Player
          onPositionUpdate={handlePositionUpdate}
          cameraAngle={cameraAngle}
          isPaused={!!modalBuilding}
        />

        {/* Follow Camera */}
        <ThirdPersonCamera targetPosition={playerPos} onYawChange={setCameraAngle} />
      </Canvas>

      {/* 2. HUD Overlays */}
      <CityHUD playerPos={playerPos} />
      <MissionTracker />
      <MiniMap playerPos={playerPos} cameraAngle={cameraAngle} />
      <ControlsGuide />
      <MissionNotification />

      {/* 3. Proximity Interaction Banner */}
      <InteractionPrompt
        building={nearbyBuilding}
        onInteract={() => nearbyBuilding && setModalBuilding(nearbyBuilding)}
      />

      {/* 4. Interactive Building Mission Modal */}
      {modalBuilding && (
        <BuildingModal building={modalBuilding} onClose={() => setModalBuilding(null)} />
      )}
    </div>
  );
};

export const CityScene: React.FC = () => {
  return (
    <MissionProvider>
      <CitySceneContent />
    </MissionProvider>
  );
};

export default CityScene;
