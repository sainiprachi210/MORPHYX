export type BuildingCategory =
  | 'FINANCE'
  | 'COMMUNICATIONS'
  | 'TECHNOLOGY'
  | 'HOSPITALITY'
  | 'RECREATION'
  | 'CIVIC'
  | 'COMMERCIAL'
  | 'RESIDENTIAL';

export interface InteractiveBuildingData {
  id: string;
  name: string;
  category: BuildingCategory;
  role: string;
  description: string;
  taskTitle: string;
  taskDescription: string;
  taskMetric: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  accentColor: string;
  interactionPoint: [number, number, number];
  interactionRadius: number;
}

export interface CollisionBox {
  id: string;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface PlayerControlsState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  interact: boolean;
}
