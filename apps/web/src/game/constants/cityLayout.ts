import { InteractiveBuildingData, CollisionBox } from '../types';

export const PLAYER_SPAWN_POSITION: [number, number, number] = [0, 0.9, 16];
export const WORLD_BOUNDS = {
  minX: -85,
  maxX: 85,
  minZ: -85,
  maxZ: 85,
};

// 1. Interactive Buildings with rich natural architectural materials & urban palette
export const INTERACTIVE_BUILDINGS: InteractiveBuildingData[] = [
  {
    id: 'apex-bank',
    name: 'Bank (Apex Vault)',
    category: 'FINANCE',
    role: 'Financial Productivity & Budget Master',
    description:
      'Audit and balance operating expenses, track burn rates, review budget allocations, and balance financial ledgers.',
    taskTitle: 'Budget Master Audit & Expense Categorization',
    taskDescription:
      'Review recurring project expenses, categorize operating outlays, and reconcile quarterly budgets.',
    taskMetric: '+200 XP • +100 Credits',
    position: [-32, 7, -25],
    size: [18, 14, 18],
    color: '#E8E4D9', // Warm ivory architectural limestone
    accentColor: '#A65F43', // Terracotta warm accent
    interactionPoint: [-32, 0, -14],
    interactionRadius: 6.0,
  },
  {
    id: 'metro-post',
    name: 'Post Office (Metro Post)',
    category: 'COMMUNICATIONS',
    role: 'Messages, Communication & Inbox Zero',
    description:
      'Achieve Inbox Zero. Triage incoming communications, organize emails into categories, and clear notification backlogs.',
    taskTitle: 'Communication Triage & Inbox Zero',
    taskDescription:
      'Process high-priority messages, categorize inbox threads into Work, Personal, or Important, and clear backlogs.',
    taskMetric: '+150 XP • +75 Credits',
    position: [-32, 6, 25],
    size: [18, 12, 18],
    color: '#30352E', // Dark panel heritage slate
    accentColor: '#78836B', // Muted sage secondary accent
    interactionPoint: [-32, 0, 14],
    interactionRadius: 6.0,
  },
  {
    id: 'cybercore-tech',
    name: 'Tech Office (CyberCore Tech)',
    category: 'TECHNOLOGY',
    role: 'Projects, Code Hygiene & File Organizer',
    description:
      'Manage software projects, organize repository files into clean directories, and conquer developer milestones.',
    taskTitle: 'Repository Workspace & File Organizer',
    taskDescription:
      'Sort project assets, documents, code files, configs, and test suites into clean destination directories.',
    taskMetric: '+175 XP • +90 Credits',
    position: [32, 12, -25],
    size: [20, 24, 20],
    color: '#252923', // Deep olive charcoal modern structure
    accentColor: '#D6C7A1', // Warm sand architectural highlights
    interactionPoint: [32, 0, -13],
    interactionRadius: 6.0,
  },
  {
    id: 'horizon-hotel',
    name: 'Grand Horizon Hotel',
    category: 'HOSPITALITY',
    role: 'Rest, Breaks & Wellness Activities',
    description:
      'Recharge mental focus stamina, practice the 20-20-20 eye strain relief protocol, and log daily hydration.',
    taskTitle: 'Restorative Wellness & Eye-Care Pause',
    taskDescription:
      'Take a structured screen-free recovery pause to restore operative focus energy to 100%.',
    taskMetric: 'Energy 100% Restored',
    position: [32, 10, 25],
    size: [18, 20, 18],
    color: '#D6C7A1', // Warm sand luxury facade
    accentColor: '#A65F43', // Terracotta warm architectural accents
    interactionPoint: [32, 0, 14],
    interactionRadius: 6.0,
  },
  {
    id: 'zenith-park',
    name: 'Zenith Eco-Sanctuary',
    category: 'RECREATION',
    role: 'Focus Sessions, Pomodoro & Relaxation',
    description:
      'A tranquil natural park. Launch 25-minute deep focus Pomodoro timers with ambient nature soundscapes.',
    taskTitle: 'Deep Focus Session & Box Breathing',
    taskDescription:
      'Immerse in focused deep work supported by calming audio landscapes and guided breathwork.',
    taskMetric: '+50 Focus Points • Calm +1',
    position: [0, 1, 52],
    size: [28, 2, 22],
    color: '#78836B', // Muted sage natural botanical pavilion
    accentColor: '#252923', // Deep olive charcoal natural base
    interactionPoint: [0, 0, 39],
    interactionRadius: 5.5,
  },
  {
    id: 'nexus-plaza',
    name: 'Nexus Central Obelisk',
    category: 'CIVIC',
    role: 'Community Achievements & Global Standup',
    description:
      'Civic square celebrating operative accomplishments, productivity streaks, badges, and hackathon leaderboards.',
    taskTitle: 'Achievements Showcase & Standup',
    taskDescription:
      'Inspect unlocked operative trophies, maintain daily sprint streaks, and synchronize community milestones.',
    taskMetric: 'Global Rank: Senior Operative',
    position: [0, 5, 0],
    size: [10, 10, 10],
    color: '#E8E4D9', // Warm ivory polished civic monument
    accentColor: '#A65F43', // Terracotta spire cap
    interactionPoint: [0, 0, 5.5],
    interactionRadius: 3.5,
  },
];

// 2. Additional modern skyscrapers, apartments, and commercial blocks with natural materials
export interface StaticBuilding {
  id: string;
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  accentColor: string;
  type: 'SKYSCRAPER' | 'RESIDENTIAL' | 'SHOP';
  role: string;
  description: string;
  interactionPoint: [number, number, number];
  interactionRadius: number;
}

export const STATIC_BUILDINGS: StaticBuilding[] = [
  // North Skyline Modern Glass Skyscrapers
  {
    id: 'aegis-spire',
    name: 'Aegis Quantum Spire',
    role: 'Quantum Computing & Network Infrastructure',
    description:
      'Advanced distributed computing facilities and high-throughput network operations center for the metropolitan district.',
    position: [-58, 26, -58],
    size: [22, 52, 22],
    color: '#30352E', // Dark panel modern facade
    accentColor: '#D6C7A1', // Warm sand architectural lighting
    type: 'SKYSCRAPER',
    interactionPoint: [-46, 0, -46],
    interactionRadius: 5.5,
  },
  {
    id: 'chronos-tower',
    name: 'Chronos Tower',
    role: 'Time Architecture & Sprint Scheduling',
    description:
      'Enterprise resource scheduling, sprint roadmap coordination, and workflow tracking tower.',
    position: [-20, 32, -62],
    size: [24, 64, 24],
    color: '#252923', // Deep olive charcoal architectural pillar
    accentColor: '#78836B', // Muted sage accents
    type: 'SKYSCRAPER',
    interactionPoint: [-20, 0, -48],
    interactionRadius: 5.5,
  },
  {
    id: 'nova-tower',
    name: 'Nova Pinnacle',
    role: 'Creative Design & Spatial UI Engineering',
    description:
      'Digital experience research, design systems studio, and human-computer interface development lab.',
    position: [20, 28, -62],
    size: [22, 56, 22],
    color: '#78836B', // Muted sage tinted architectural tower
    accentColor: '#E8E4D9', // Warm ivory trim
    type: 'SKYSCRAPER',
    interactionPoint: [20, 0, -48],
    interactionRadius: 5.5,
  },
  {
    id: 'helix-tower',
    name: 'Helix MegaCorp Tower',
    role: 'Enterprise Ventures & Corporate Incubation',
    description:
      'Technology venture partnerships, commercial accelerators, and strategic ecosystem innovation hub.',
    position: [58, 24, -58],
    size: [22, 48, 22],
    color: '#AAA99D', // Stone grey architectural concrete & metal
    accentColor: '#A65F43', // Terracotta highlights
    type: 'SKYSCRAPER',
    interactionPoint: [46, 0, -46],
    interactionRadius: 5.5,
  },

  // West Flank Residential Condominiums
  {
    id: 'west-condo-1',
    name: 'Aurora Residencies',
    role: 'Residential Condominiums & Quiet Lounge',
    description:
      'Modern residential suites with communal work lounges, reading spaces, and urban gardens.',
    position: [-58, 9, -15],
    size: [18, 18, 24],
    color: '#A65F43', // Terracotta brickwork
    accentColor: '#D6C7A1', // Warm sand trims
    type: 'RESIDENTIAL',
    interactionPoint: [-48, 0, -15],
    interactionRadius: 5.0,
  },
  {
    id: 'west-condo-2',
    name: 'Skyline Apartments',
    role: 'Urban Living Suites & Community Bulletin',
    description:
      'Sustainable high-density apartments with an active resident community board and quiet focus nooks.',
    position: [-58, 10, 25],
    size: [18, 20, 24],
    color: '#AAA99D', // Stone grey natural masonry
    accentColor: '#30352E', // Dark panel window frames
    type: 'RESIDENTIAL',
    interactionPoint: [-48, 0, 25],
    interactionRadius: 5.0,
  },

  // East Flank Streetfront Commercial Shops & Cafes
  {
    id: 'east-shop-1',
    name: 'Byte & Brew Cyber Cafe',
    role: 'Artisan Cafe & Digital Nomad Hub',
    description:
      'High-caffeine espresso bar, ergonomic focus booths, and collaborative networking tables for operatives.',
    position: [58, 6, -15],
    size: [18, 12, 22],
    color: '#A65F43', // Terracotta facade
    accentColor: '#252923', // Deep olive entrance trim
    type: 'SHOP',
    interactionPoint: [48, 0, -15],
    interactionRadius: 5.0,
  },
  {
    id: 'east-shop-2',
    name: 'Hardware Matrix Electronics',
    role: 'Hardware Diagnostics & Tech Workshop',
    description:
      'Microcontroller diagnostics, ergonomic workspace accessories, and rapid hardware prototyping benches.',
    position: [58, 7, 25],
    size: [18, 14, 22],
    color: '#30352E', // Dark panel modern storefront
    accentColor: '#78836B', // Muted sage canopy
    type: 'SHOP',
    interactionPoint: [48, 0, 25],
    interactionRadius: 5.0,
  },

  // South-West & South-East Townhouses
  {
    id: 'south-west-res',
    name: 'Civic Townhouses',
    role: 'Civic Society & Local Resident Council',
    description:
      'Historical district townhouses with neighborhood greenway initiatives, standup boards, and tree-lined walkways.',
    position: [-42, 6, 56],
    size: [22, 12, 16],
    color: '#A65F43', // Terracotta brownstone facade
    accentColor: '#E8E4D9', // Warm ivory moldings
    type: 'RESIDENTIAL',
    interactionPoint: [-42, 0, 46],
    interactionRadius: 5.0,
  },
  {
    id: 'south-east-res',
    name: 'Terrace Condos',
    role: 'Terrace Condos & Skyline Observatory',
    description:
      'Rooftop community garden, panoramic skyline viewing decks, and evening restorative lounge.',
    position: [42, 7, 56],
    size: [22, 14, 16],
    color: '#252923', // Deep olive charcoal residential block
    accentColor: '#D6C7A1', // Warm sand balconies
    type: 'RESIDENTIAL',
    interactionPoint: [42, 0, 46],
    interactionRadius: 5.0,
  },
];

// Unified list of all city buildings with interaction data
export const ALL_INTERACTIVE_BUILDINGS: InteractiveBuildingData[] = [
  ...INTERACTIVE_BUILDINGS,
  ...STATIC_BUILDINGS.map(sb => ({
    id: sb.id,
    name: sb.name,
    category: (sb.type === 'SHOP'
      ? 'COMMERCIAL'
      : sb.type === 'RESIDENTIAL'
      ? 'RESIDENTIAL'
      : 'TECHNOLOGY') as import('../types').BuildingCategory,
    role: sb.role,
    description: sb.description,
    taskTitle: `${sb.name} Directory`,
    taskDescription: `Inspect local district services, community news, and operative amenities.`,
    taskMetric: 'District Status: Operational',
    position: sb.position,
    size: sb.size,
    color: sb.color,
    accentColor: sb.accentColor,
    interactionPoint: sb.interactionPoint,
    interactionRadius: sb.interactionRadius,
  })),
];

// 3. Pre-computed collision boxes for physics and boundary management
export const COLLISION_BOXES: CollisionBox[] = [
  ...INTERACTIVE_BUILDINGS.map(b => {
    const halfW = b.size[0] / 2 + 0.6;
    const halfD = b.size[2] / 2 + 0.6;
    return {
      id: b.id,
      minX: b.position[0] - halfW,
      maxX: b.position[0] + halfW,
      minZ: b.position[2] - halfD,
      maxZ: b.position[2] + halfD,
    };
  }),
  ...STATIC_BUILDINGS.map(b => {
    const halfW = b.size[0] / 2 + 0.6;
    const halfD = b.size[2] / 2 + 0.6;
    return {
      id: b.id,
      minX: b.position[0] - halfW,
      maxX: b.position[0] + halfW,
      minZ: b.position[2] - halfD,
      maxZ: b.position[2] + halfD,
    };
  }),
];

// 4. Streetlights layout along major avenues
export const STREETLIGHT_POSITIONS: [number, number, number][] = [
  [-14, 0, -36],
  [14, 0, -36],
  [-14, 0, -16],
  [14, 0, -16],
  [-14, 0, 16],
  [14, 0, 16],
  [-14, 0, 36],
  [14, 0, 36],
  [-38, 0, -12],
  [-38, 0, 12],
  [38, 0, -12],
  [38, 0, 12],
  [-68, 0, -12],
  [-68, 0, 12],
  [68, 0, -12],
  [68, 0, 12],
];

// 5. Trees and decorative flora
export const TREE_POSITIONS: [number, number, number][] = [
  [-9, 0, 48],
  [0, 0, 48],
  [9, 0, 48],
  [-8, 0, 56],
  [8, 0, 56],
  [-4, 0, 60],
  [4, 0, 60],
  [-16, 0, -28],
  [16, 0, -28],
  [-16, 0, 28],
  [16, 0, 28],
  [-45, 0, -42],
  [45, 0, -42],
  [-45, 0, 42],
  [45, 0, 42],
];
