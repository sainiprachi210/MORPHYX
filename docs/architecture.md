# MORPHYX — Architecture Specification

## 1. System Vision

MORPHYX is an open-world multiplayer productivity game designed for high-focus deep work, competitive and cooperative sprint missions, and spatial task management.

## 2. Monorepo Topology

MORPHYX utilizes **npm workspaces** to coordinate multiple decoupled packages within a single source of truth:

```
MORPHYX/
├── apps/
│   ├── web/                    # Spatial 3D frontend (React + Three.js + Vite)
│   └── server/                 # Central API service (Node.js + Express + Zod)
├── packages/
│   └── shared/                 # Domain types, Zod schemas, shared constants
├── supabase/
│   └── migrations/             # PostgreSQL database schemas, triggers, and RLS
├── docs/                       # Architectural and operational documentation
├── tsconfig.base.json          # Shared strict TypeScript base configuration
├── package.json                # Monorepo orchestration scripts
└── README.md                   # Primary project reference
```

## 3. Communication & Contract Flow

```
[ Browser / Client ]
        │
        ├── 1. Renders 3D World (Three.js / React Three Fiber / Drei)
        ├── 2. Direct Query / Realtime Subscriptions (Supabase Client with Anon Key)
        │       └─ Protected by PostgreSQL Row Level Security (RLS)
        │
        └── 3. REST API Requests (via /api)
                │
                ▼
        [ Express API Gateway ]
                ├── Helmet & Strict CORS
                ├── Structured JSON / Dev Request Logging
                ├── Centralized Operational AppError System
                └── Zod Payload Validation
```

## 4. Workspaces Breakdown

### `@morphyx/shared`

- Contains common contracts and schemas:
  - `UserProfileSchema` & `UpdateProfileSchema`
  - `MissionSchema` & `TaskJobSchema`
  - `GameProgressSchema`, `Coordinates3DSchema`, `PlayerStatsSchema`
  - `MultiplayerRoomSchema` & `RoomParticipantSchema`
  - `HealthResponseSchema` & `ApiResponse<T>`
- Ensures 100% type safety and zero discrepancy between frontend client and backend server.

### `@morphyx/server`

- Express application written in modern ES Modules with NodeNext module resolution.
- Hardened with Helmet security headers, CORS origin whitelisting, and strict payload size limits.
- Validated via Zod on startup (`apps/server/src/config/env.ts`), failing fast with actionable diagnostics if configuration is malformed.
- Centralized error handler maps `AppError` and `ZodError` to uniform API response structures.

### `@morphyx/web`

- Fast Vite SPA powered by React 18 and Tailwind CSS v3.
- Futuristic cyberpunk design system featuring custom glowing glassmorphic elements, cyber grid backgrounds, and modern Google Fonts (`Orbitron`, `Rajdhani`, `Inter`).
- 3D spatial viewport powered by `@react-three/fiber` and `@react-three/drei` displaying real-time floating geometric assets with dynamic lighting and stars.
- Real-time backend telemetry probe communicating with `/api/health`.

### `supabase/migrations`

- PostgreSQL 15+ schema with Row Level Security (RLS) enabled on all tables.
- Automatic profile and progress provisioning triggers on user registration.
