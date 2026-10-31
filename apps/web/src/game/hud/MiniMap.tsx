import React from 'react';
import { INTERACTIVE_BUILDINGS, WORLD_BOUNDS } from '../constants/cityLayout';
import { Compass } from 'lucide-react';

interface MiniMapProps {
  playerPos: [number, number, number];
  cameraAngle: number;
}

export const MiniMap: React.FC<MiniMapProps> = ({ playerPos, cameraAngle }) => {
  const mapSize = 130; // pixels
  const worldRange = WORLD_BOUNDS.maxX - WORLD_BOUNDS.minX; // ~170

  // Coordinate mapper from world space [-85, 85] to map space [0, mapSize]
  const mapCoord = (x: number, z: number) => {
    const px = ((x - WORLD_BOUNDS.minX) / worldRange) * mapSize;
    const py = ((z - WORLD_BOUNDS.minZ) / worldRange) * mapSize;
    return { x: px, y: py };
  };

  const playerMap = mapCoord(playerPos[0], playerPos[2]);

  return (
    <div className="fixed top-5 right-5 z-40 select-none pointer-events-none">
      <div className="relative w-[140px] h-[140px] rounded-full p-[2px] bg-urban-panel border border-urban-sand/30 shadow-urban-panel">
        <div className="w-full h-full rounded-full bg-urban-olive/95 border border-urban-sand/20 backdrop-blur-md overflow-hidden relative flex items-center justify-center">
          {/* Subtle Radar Center Tint */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,199,161,0.06)_0%,transparent_70%)]"></div>

          {/* Radar Grid Circles */}
          <div className="absolute w-[90px] h-[90px] rounded-full border border-urban-sage/30"></div>
          <div className="absolute w-[45px] h-[45px] rounded-full border border-urban-sage/30"></div>

          {/* North Indicator */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-[9px] font-mono text-urban-sand font-bold">
            N
          </div>

          {/* Interactive Buildings Markers */}
          {INTERACTIVE_BUILDINGS.map(b => {
            const { x, y } = mapCoord(b.position[0], b.position[2]);
            return (
              <div
                key={`map-${b.id}`}
                className="absolute w-2.5 h-2.5 rounded-sm transform -translate-x-1/2 -translate-y-1/2 border border-urban-olive"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  backgroundColor: b.accentColor,
                  boxShadow: `0 1px 4px rgba(0,0,0,0.4)`,
                }}
                title={b.name}
              />
            );
          })}

          {/* Player Marker (Terracotta heading arrow with ivory pip) */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{
              left: `${playerMap.x}px`,
              top: `${playerMap.y}px`,
            }}
          >
            <div
              className="w-3.5 h-3.5 flex items-center justify-center"
              style={{
                transform: `rotate(${-(cameraAngle * (180 / Math.PI))}deg)`,
              }}
            >
              <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[8px] border-b-urban-terracotta"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1 text-center text-[10px] font-mono text-urban-stone flex items-center justify-center gap-1">
        <Compass className="w-3 h-3 text-urban-sand" />
        <span>RADAR ACTIVE</span>
      </div>
    </div>
  );
};

export default MiniMap;
