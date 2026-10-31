# MORPHYX 🚀

> **3D Open-World Multiplayer Productivity Game**  
> _Transform real-world tasks, deep work sessions, and sprints into an expansive 3D cyber universe._

---

## 1. Project Overview

**MORPHYX** is a multiplayer productivity game engineered for developers, students, and teams. Real-world tasks and Pomodoro sessions are converted into high-stakes quests. Operatives explore 3D zones, form real-time squads, earn XP and digital relics, and boost their focus streak within an immersive spatial environment.

This project is structured as a production-grade monorepo designed for rapid iteration, multi-tenancy, and high security.

---

## 2. Technology Stack

### Frontend (`apps/web`)

- **React 18** & **TypeScript** (Strict mode)
- **Vite** — Next-generation frontend tooling and rapid HMR
- **Three.js** & **@react-three/fiber** / **@react-three/drei** — 3D spatial rendering and orbital canvas
- **Tailwind CSS v3** — Cyberpunk dark mode design system with neon glow utilities
- **React Router v6** — Client-side SPA routing
- **Vitest** & **Testing Library** — Automated component and integration testing

### Backend (`apps/server`)

- **Node.js** & **Express**
- **TypeScript** (ES Modules, strict type checking)
- **Zod** — Runtime environment and payload validation
- **Helmet** & **CORS** — HTTP security hardening
- **Structured Logging** — Colored in development, JSON formatted for production

### Shared Package (`packages/shared`)

- **Single Source of Truth** — Shared TypeScript interfaces, Zod validation schemas, and game constants for User Profiles, Missions, Tasks, Game Progress, Multiplayer Rooms, and Health contracts.

### Database & Security (`supabase/migrations`)

- **Supabase PostgreSQL 15+**
- **Row Level Security (RLS)** — Least-privilege data policies on all tables
- **Automated Lifecycle Triggers** — Automatic profile initialization on registration

---

## 3. Project Architecture

```
MORPHYX/
├── apps/
│   ├── web/                    # React + Three.js + Vite client
│   │   ├── src/
│   │   │   ├── components/     # 3D Canvas, Landing, Layout, Telemetry
│   │   │   ├── pages/          # Application views
│   │   │   ├── env.ts          # Validated client environment
│   │   │   └── App.tsx         # Routing configuration
│   │   ├── tests/              # Frontend automated tests
│   │   └── .env.example        # Client environment template
│   └── server/                 # Express API server
│       ├── src/
│       │   ├── config/         # Zod environment validation
│       │   ├── errors/         # Centralized AppError system
│       │   ├── middleware/     # Error handler, request logger
│       │   ├── routes/         # Health and API route handlers
│       │   ├── utils/          # Structured logger
│       │   └── server.ts       # Server entrypoint and lifecycle
│       ├── tests/              # Integration tests
│       └── .env.example        # Server environment template
├── packages/
│   └── shared/                 # Common domain types, Zod schemas, constants
│       ├── src/
│       │   ├── types/          # User, Mission, Game, Room, API schemas
│       │   └── constants/      # Game zones, defaults
│       └── tests/              # Shared schema unit tests
├── supabase/
│   └── migrations/             # SQL migrations and RLS policies
├── docs/                       # Architecture, Database, and Environment docs
├── tsconfig.base.json          # Shared strict TypeScript configuration
├── eslint.config.js            # Monorepo ESLint configuration
├── .prettierrc                 # Code formatting rules
├── package.json                # Root workspaces and scripts
└── README.md                   # This document
```

---

## 4. Installation & Setup

### Prerequisites

- **Node.js**: `v20.0.0` or higher (verified on Node `v24.19.0`)
- **npm**: `v10.0.0` or higher (verified on npm `11.17.0`)

### Step 1: Clone and Install Dependencies

From the repository root:

```bash
npm install
```

_(On Windows PowerShell, if script execution policy restricts `npm`, execute `npm.cmd install`)_

### Step 2: Configure Environment Variables

Copy example files into local configuration:

```bash
# Server configuration
cp apps/server/.env.example apps/server/.env

# Web configuration
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/server/.env` and `apps/web/.env.local` to configure ports or Supabase credentials if available.

---

## 5. Development Commands

The root `package.json` coordinates all monorepo workspaces:

| Command                | Action                                                      |
| :--------------------- | :---------------------------------------------------------- |
| `npm run dev`          | Concurrently launches frontend and backend servers          |
| `npm run dev:web`      | Starts the Vite dev server at `http://localhost:5173`       |
| `npm run dev:server`   | Starts the Express API server at `http://localhost:4000`    |
| `npm run build`        | Builds shared packages, server, and web production bundles  |
| `npm run test`         | Executes all test suites across all workspaces using Vitest |
| `npm run typecheck`    | Runs strict TypeScript verification across all packages     |
| `npm run lint`         | Runs ESLint across all codebase files                       |
| `npm run format:check` | Verifies code formatting with Prettier                      |

---

## 6. Database Setup (Supabase)

1. Create a project in [Supabase](https://supabase.com).
2. Apply the migration located at:
   ```
   supabase/migrations/20261031000001_initial_schema.sql
   ```
   You can run this through the Supabase Dashboard SQL Editor or via the Supabase CLI:
   ```bash
   npx supabase db push
   ```
3. Populate `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `apps/web/.env.local` and `apps/server/.env`.

---

## 7. Security Guidelines

- **Zero Secret Commits**: Real `.env` files are ignored in `.gitignore`.
- **Public vs Secret Keys**: Only the Supabase `anon` key is permitted in `apps/web`. Never inject `service_role` keys into Vite environment variables.
- **Strict Row Level Security**: All PostgreSQL tables feature RLS policies ensuring users can only read and mutate authorized records.
- **Fail-Fast Configuration**: Any missing or malformed required environment variables fail early via Zod validation before the service accepts traffic.
- **HTTP Hardening**: Helmet and granular CORS protections are active by default on the backend.
