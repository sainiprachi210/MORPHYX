import { describe, it, expect } from 'vitest';
import {
  INTERACTIVE_BUILDINGS,
  STATIC_BUILDINGS,
  COLLISION_BOXES,
  PLAYER_SPAWN_POSITION,
  WORLD_BOUNDS,
} from '../src/game/constants/cityLayout';

describe('MORPHYX 3D City Layout & Physics', () => {
  it('contains all required key interactive buildings', () => {
    const ids = INTERACTIVE_BUILDINGS.map(b => b.id);
    expect(ids).toContain('apex-bank');
    expect(ids).toContain('metro-post');
    expect(ids).toContain('cybercore-tech');
    expect(ids).toContain('horizon-hotel');
    expect(ids).toContain('zenith-park');
    expect(ids).toContain('nexus-plaza');
  });

  it('provides valid interaction points and positive radiuses for all interactive buildings', () => {
    for (const b of INTERACTIVE_BUILDINGS) {
      expect(b.interactionRadius).toBeGreaterThan(0);
      expect(b.interactionPoint).toHaveLength(3);
      expect(b.name.length).toBeGreaterThan(3);
      expect(b.taskTitle.length).toBeGreaterThan(3);
    }
  });

  it('contains static modern skyscrapers and commercial shops', () => {
    const skyscraperTypes = STATIC_BUILDINGS.filter(b => b.type === 'SKYSCRAPER');
    const residentialTypes = STATIC_BUILDINGS.filter(b => b.type === 'RESIDENTIAL');
    const shopTypes = STATIC_BUILDINGS.filter(b => b.type === 'SHOP');

    expect(skyscraperTypes.length).toBeGreaterThanOrEqual(3);
    expect(residentialTypes.length).toBeGreaterThanOrEqual(2);
    expect(shopTypes.length).toBeGreaterThanOrEqual(2);
  });

  it('has valid collision bounding boxes that do not invert coordinates', () => {
    expect(COLLISION_BOXES.length).toBeGreaterThan(0);
    for (const box of COLLISION_BOXES) {
      expect(box.minX).toBeLessThan(box.maxX);
      expect(box.minZ).toBeLessThan(box.maxZ);
    }
  });

  it('ensures player spawn point is within world bounds and not inside a building collision box', () => {
    const [spawnX, , spawnZ] = PLAYER_SPAWN_POSITION;

    expect(spawnX).toBeGreaterThan(WORLD_BOUNDS.minX);
    expect(spawnX).toBeLessThan(WORLD_BOUNDS.maxX);
    expect(spawnZ).toBeGreaterThan(WORLD_BOUNDS.minZ);
    expect(spawnZ).toBeLessThan(WORLD_BOUNDS.maxZ);

    const playerRadius = 0.7;
    const isSpawnBlocked = COLLISION_BOXES.some(
      b =>
        spawnX + playerRadius > b.minX &&
        spawnX - playerRadius < b.maxX &&
        spawnZ + playerRadius > b.minZ &&
        spawnZ - playerRadius < b.maxZ
    );

    expect(isSpawnBlocked).toBe(false);
  });
});
