-- ==============================================================================
-- MORPHYX DATABASE MIGRATION 000001: INITIAL SCHEMA & RLS POLICIES
-- Target: Supabase PostgreSQL
-- Description: Core tables for Profiles, Missions, Tasks, Game Progress, and Rooms
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM TYPES & ENUMS
DO $$ BEGIN
  CREATE TYPE mission_difficulty AS ENUM ('RECON', 'TACTICAL', 'OPERATIONAL', 'ELITE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE mission_category AS ENUM ('CODING', 'LEARNING', 'HEALTH', 'FOCUS', 'CREATIVE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE task_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE room_status AS ENUM ('OPEN', 'IN_MISSION', 'CLOSED', 'ARCHIVED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE room_role AS ENUM ('HOST', 'OFFICER', 'OPERATOR');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. REUSABLE TRIGGER FUNCTIONS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. TABLE: PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
  xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
  credits INTEGER NOT NULL DEFAULT 0 CHECK (credits >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. TABLE: MISSIONS (System quest templates and challenges)
CREATE TABLE IF NOT EXISTS public.missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty mission_difficulty NOT NULL DEFAULT 'TACTICAL',
  category mission_category NOT NULL DEFAULT 'FOCUS',
  xp_reward INTEGER NOT NULL DEFAULT 100 CHECK (xp_reward > 0),
  credit_reward INTEGER NOT NULL DEFAULT 25 CHECK (credit_reward >= 0),
  is_system_template BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. TABLE: TASK_JOBS (Player productivity tasks mapped to missions)
CREATE TABLE IF NOT EXISTS public.task_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mission_id UUID REFERENCES public.missions(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status task_status NOT NULL DEFAULT 'TODO',
  priority task_priority NOT NULL DEFAULT 'MEDIUM',
  estimated_minutes INTEGER NOT NULL DEFAULT 25 CHECK (estimated_minutes > 0),
  pomodoro_sessions INTEGER NOT NULL DEFAULT 0 CHECK (pomodoro_sessions >= 0),
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_task_jobs_updated_at
  BEFORE UPDATE ON public.task_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. TABLE: GAME_PROGRESS (3D world coordinates, stats, inventory)
CREATE TABLE IF NOT EXISTS public.game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_zone TEXT NOT NULL DEFAULT 'NEXUS_PLAZA',
  position_x DOUBLE PRECISION NOT NULL DEFAULT 0,
  position_y DOUBLE PRECISION NOT NULL DEFAULT 0,
  position_z DOUBLE PRECISION NOT NULL DEFAULT 0,
  rotation_y DOUBLE PRECISION NOT NULL DEFAULT 0,
  focus_energy INTEGER NOT NULL DEFAULT 100 CHECK (focus_energy BETWEEN 0 AND 100),
  stamina INTEGER NOT NULL DEFAULT 100 CHECK (stamina BETWEEN 0 AND 100),
  productivity_streak INTEGER NOT NULL DEFAULT 0 CHECK (productivity_streak >= 0),
  total_focus_minutes INTEGER NOT NULL DEFAULT 0 CHECK (total_focus_minutes >= 0),
  tasks_completed_total INTEGER NOT NULL DEFAULT 0 CHECK (tasks_completed_total >= 0),
  inventory JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_game_progress_updated_at
  BEFORE UPDATE ON public.game_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. TABLE: MULTIPLAYER_ROOMS (Cooperative focus environments)
CREATE TABLE IF NOT EXISTS public.multiplayer_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  host_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  world_seed TEXT NOT NULL DEFAULT 'GENESIS_ALPHA',
  max_players INTEGER NOT NULL DEFAULT 8 CHECK (max_players BETWEEN 2 AND 16),
  active_players_count INTEGER NOT NULL DEFAULT 1 CHECK (active_players_count >= 0),
  status room_status NOT NULL DEFAULT 'OPEN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_multiplayer_rooms_updated_at
  BEFORE UPDATE ON public.multiplayer_rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. TABLE: ROOM_PARTICIPANTS (Multiplayer room presence)
CREATE TABLE IF NOT EXISTS public.room_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.multiplayer_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role room_role NOT NULL DEFAULT 'OPERATOR',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_ping_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(room_id, user_id)
);

-- 10. INDEXES FOR HIGH-THROUGHPUT QUERIES
CREATE INDEX IF NOT EXISTS idx_task_jobs_user_status ON public.task_jobs(user_id, status);
CREATE INDEX IF NOT EXISTS idx_task_jobs_due_date ON public.task_jobs(due_date);
CREATE INDEX IF NOT EXISTS idx_game_progress_user ON public.game_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_multiplayer_rooms_status ON public.multiplayer_rooms(status);
CREATE INDEX IF NOT EXISTS idx_room_participants_room ON public.room_participants(room_id);
CREATE INDEX IF NOT EXISTS idx_room_participants_user ON public.room_participants(user_id);

-- 11. AUTOMATIC PROFILE INITIALIZATION TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert default user profile
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'display_name', 'Operative-' || SUBSTRING(NEW.id::text, 1, 6)),
    NEW.raw_user_meta_data->>'avatar_url'
  );

  -- Insert initial game progress record
  INSERT INTO public.game_progress (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger hook on auth.users (enabled when Supabase auth is active)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multiplayer_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_participants ENABLE ROW LEVEL SECURITY;

-- 12.1 PROFILES POLICIES
-- Public profiles viewable by authenticated users
CREATE POLICY "Profiles are viewable by authenticated operatives"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- Operatives can only update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 12.2 MISSIONS POLICIES
-- Missions readable by all authenticated users
CREATE POLICY "Missions are readable by authenticated operatives"
  ON public.missions FOR SELECT
  TO authenticated
  USING (true);

-- 12.3 TASK_JOBS POLICIES (Strict User Isolation)
CREATE POLICY "Users can view their own tasks"
  ON public.task_jobs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON public.task_jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON public.task_jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON public.task_jobs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 12.4 GAME_PROGRESS POLICIES (Strict User Isolation)
CREATE POLICY "Users can view their own progress"
  ON public.game_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.game_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 12.5 MULTIPLAYER_ROOMS POLICIES
CREATE POLICY "Open rooms are visible to all authenticated operatives"
  ON public.multiplayer_rooms FOR SELECT
  TO authenticated
  USING (status IN ('OPEN', 'IN_MISSION'));

CREATE POLICY "Operatives can host a room"
  ON public.multiplayer_rooms FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their room"
  ON public.multiplayer_rooms FOR UPDATE
  TO authenticated
  USING (auth.uid() = host_id)
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can archive/delete their room"
  ON public.multiplayer_rooms FOR DELETE
  TO authenticated
  USING (auth.uid() = host_id);

-- 12.6 ROOM_PARTICIPANTS POLICIES
CREATE POLICY "Participants can view room rosters"
  ON public.room_participants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.room_participants rp
      WHERE rp.room_id = room_participants.room_id
        AND rp.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.multiplayer_rooms mr
      WHERE mr.id = room_participants.room_id
        AND mr.host_id = auth.uid()
    )
  );

CREATE POLICY "Operatives can join a room"
  ON public.room_participants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Operatives can leave or update their presence"
  ON public.room_participants FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Operatives can update their last ping"
  ON public.room_participants FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
