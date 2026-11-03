/*
# 1/8 Oracle — Core Database Schema

## Overview
Creates the database schema for "1/8 Oracle", a daily divination app where users
draw one of 8 signs per day, build streaks, and collect/evolve digital pets.

## New Tables
### users (profile, one row per authenticated user)
- id (uuid PK FK→auth.users CASCADE), username (text), sign_in_streak (int default 0), current_pet_id (uuid), created_at
### readings (one draw per user per day)
- id, user_id (default auth.uid()), date, draw_date (date, unique per user/day), sign_id (1-8), daily_slogan
### pets (digital pets)
- id, user_id (default auth.uid()), name, type (1-8), evolution_stage ('animal'|'spirit'), acquired_at

## Security
- RLS on all tables, 4 policies each, scoped TO authenticated with auth.uid() ownership.
*/

-- ── users (profile) ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL,
  sign_in_streak int NOT NULL DEFAULT 0,
  current_pet_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON users;
CREATE POLICY "select_own_profile" ON users FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON users;
CREATE POLICY "insert_own_profile" ON users FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON users;
CREATE POLICY "update_own_profile" ON users FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON users;
CREATE POLICY "delete_own_profile" ON users FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- ── readings ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  date timestamptz NOT NULL DEFAULT now(),
  draw_date date NOT NULL,
  sign_id int NOT NULL CHECK (sign_id >= 1 AND sign_id <= 8),
  daily_slogan text,
  UNIQUE (user_id, draw_date)
);

ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_readings" ON readings;
CREATE POLICY "select_own_readings" ON readings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_readings" ON readings;
CREATE POLICY "insert_own_readings" ON readings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_readings" ON readings;
CREATE POLICY "update_own_readings" ON readings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_readings" ON readings;
CREATE POLICY "delete_own_readings" ON readings FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── pets ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type int NOT NULL CHECK (type >= 1 AND type <= 8),
  evolution_stage text NOT NULL DEFAULT 'animal' CHECK (evolution_stage IN ('animal', 'spirit')),
  acquired_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- FK from users.current_pet_id → pets (added after pets table exists)
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_current_pet_id_fkey;
ALTER TABLE users ADD CONSTRAINT users_current_pet_id_fkey
  FOREIGN KEY (current_pet_id) REFERENCES pets(id) ON DELETE SET NULL;

DROP POLICY IF EXISTS "select_own_pets" ON pets;
CREATE POLICY "select_own_pets" ON pets FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_pets" ON pets;
CREATE POLICY "insert_own_pets" ON pets FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_pets" ON pets;
CREATE POLICY "update_own_pets" ON pets FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_pets" ON pets;
CREATE POLICY "delete_own_pets" ON pets FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Indexes ──────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_readings_user_date ON readings(user_id, draw_date DESC);
CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);
