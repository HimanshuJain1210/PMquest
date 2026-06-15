-- ════════════════════════════════════════════════════════════
-- PM Quest — Supabase schema
-- Paste this whole file into Supabase → SQL Editor → Run.
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE where possible).
-- ════════════════════════════════════════════════════════════

-- 1) PROFILES — one row per user: XP, streak, hearts, daily goal, SRS queue
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0,
  streak integer not null default 0,
  last_active date,
  hearts integer not null default 5,
  hearts_updated_at timestamptz not null default now(),
  daily_goal_xp integer not null default 30,
  missed jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) PROGRESS — one row per (user, unit, lesson)
create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  unit text not null,
  lesson text not null,
  best_accuracy integer not null default 0,
  duration_ms integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, unit, lesson)
);

-- 3) ATTEMPTS — every question answered (for analytics / timing)
create table if not exists public.attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  unit text,
  lesson text,
  q_type text,
  correct boolean,
  duration_ms integer,
  created_at timestamptz not null default now()
);

-- 4) NOTES — learner's own notes
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  unit text,
  lesson text,
  title text not null default 'Untitled note',
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Row Level Security ──────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.attempts enable row level security;
alter table public.notes    enable row level security;

-- Profiles: a user can see & edit only their own row
drop policy if exists "profiles self" on public.profiles;
create policy "profiles self" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "progress self" on public.progress;
create policy "progress self" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "attempts self" on public.attempts;
create policy "attempts self" on public.attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "notes self" on public.notes;
create policy "notes self" on public.notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Auto-create a profile row when a new auth user signs up ──
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
