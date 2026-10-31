# MORPHYX — Database & Supabase Schema Guide

## 1. Overview

MORPHYX utilizes Supabase PostgreSQL with **Row Level Security (RLS)** strictly enabled on every table. This guarantees zero-trust multi-tenancy at the database engine level.

## 2. Table Definitions

### `public.profiles`

Extends `auth.users` with gamer profile attributes.

- `id` (UUID, PK) -> References `auth.users(id) ON DELETE CASCADE`
- `display_name` (TEXT, NOT NULL)
- `avatar_url` (TEXT)
- `level` (INTEGER, DEFAULT 1)
- `xp` (INTEGER, DEFAULT 0)
- `credits` (INTEGER, DEFAULT 0)
- `created_at` / `updated_at` (TIMESTAMPTZ)

### `public.missions`

Catalog of system quests, challenges, and productivity blueprints.

- `id` (UUID, PK)
- `title` (TEXT)
- `description` (TEXT)
- `difficulty` (ENUM: `RECON`, `TACTICAL`, `OPERATIONAL`, `ELITE`)
- `category` (ENUM: `CODING`, `LEARNING`, `HEALTH`, `FOCUS`, `CREATIVE`)
- `xp_reward` (INTEGER)
- `credit_reward` (INTEGER)
- `is_system_template` (BOOLEAN)

### `public.task_jobs`

Individual user tasks and Pomodoro productivity records mapped to missions.

- `id` (UUID, PK)
- `user_id` (UUID) -> References `profiles(id) ON DELETE CASCADE`
- `mission_id` (UUID) -> References `missions(id) ON DELETE SET NULL`
- `title` (TEXT)
- `description` (TEXT)
- `status` (ENUM: `TODO`, `IN_PROGRESS`, `BLOCKED`, `COMPLETED`)
- `priority` (ENUM: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
- `estimated_minutes` (INTEGER, DEFAULT 25)
- `pomodoro_sessions` (INTEGER, DEFAULT 0)
- `due_date` / `completed_at` (TIMESTAMPTZ)

### `public.game_progress`

User's persistent 3D world state, coordinates, energy, and inventory.

- `id` (UUID, PK)
- `user_id` (UUID, UNIQUE) -> References `profiles(id) ON DELETE CASCADE`
- `current_zone` (TEXT, DEFAULT `'NEXUS_PLAZA'`)
- `position_x`, `position_y`, `position_z`, `rotation_y` (DOUBLE PRECISION)
- `focus_energy` (INTEGER, 0-100)
- `stamina` (INTEGER, 0-100)
- `productivity_streak` (INTEGER)
- `total_focus_minutes` (INTEGER)
- `tasks_completed_total` (INTEGER)
- `inventory` (JSONB)

### `public.multiplayer_rooms`

Cooperative focus rooms and squad workspaces.

- `id` (UUID, PK)
- `room_code` (TEXT, UNIQUE)
- `name` (TEXT)
- `description` (TEXT)
- `host_id` (UUID) -> References `profiles(id) ON DELETE CASCADE`
- `world_seed` (TEXT)
- `max_players` (INTEGER, 2-16)
- `active_players_count` (INTEGER)
- `status` (ENUM: `OPEN`, `IN_MISSION`, `CLOSED`, `ARCHIVED`)

### `public.room_participants`

Active operative presence inside a multiplayer room.

- `id` (UUID, PK)
- `room_id` (UUID) -> References `multiplayer_rooms(id) ON DELETE CASCADE`
- `user_id` (UUID) -> References `profiles(id) ON DELETE CASCADE`
- `role` (ENUM: `HOST`, `OFFICER`, `OPERATOR`)
- `joined_at` / `last_ping_at` (TIMESTAMPTZ)

---

## 3. Row Level Security (RLS) Matrix

| Table               | SELECT                        | INSERT                        | UPDATE                        | DELETE                        |
| :------------------ | :---------------------------- | :---------------------------- | :---------------------------- | :---------------------------- |
| `profiles`          | Authenticated users           | System trigger only           | User (`auth.uid() = id`)      | Disallowed                    |
| `missions`          | Authenticated users           | Admin / System                | Admin / System                | Admin / System                |
| `task_jobs`         | User (`user_id = auth.uid()`) | User (`user_id = auth.uid()`) | User (`user_id = auth.uid()`) | User (`user_id = auth.uid()`) |
| `game_progress`     | User (`user_id = auth.uid()`) | System trigger                | User (`user_id = auth.uid()`) | Disallowed                    |
| `multiplayer_rooms` | Public open rooms             | Host (`host_id = auth.uid()`) | Host (`host_id = auth.uid()`) | Host only                     |
| `room_participants` | Room members only             | User (`user_id = auth.uid()`) | User (`user_id = auth.uid()`) | User (`user_id = auth.uid()`) |

---

## 4. Applying Migrations

### Via Supabase CLI:

```bash
# Link project (requires your project reference)
npx supabase link --project-ref your-project-ref

# Apply pending migrations
npx supabase db push
```

### Via Supabase Dashboard:

1. Navigate to the SQL Editor in your Supabase Dashboard.
2. Copy the contents of `supabase/migrations/20261031000001_initial_schema.sql`.
3. Execute the script.
