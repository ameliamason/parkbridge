-- Enable PostGIS
create extension if not exists postgis;

-- Providers
create table providers (
  id text primary key,
  name text not null,
  logo_url text,
  deeplink_ios text,
  deeplink_android text,
  web_fallback_url text,
  app_store_url text,
  play_store_url text,
  payment_methods text[] default '{}',
  created_at timestamptz default now()
);

-- Parking locations
create table parking_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('on-street', 'car-park', 'private')),
  lat double precision not null,
  lng double precision not null,
  boundary geography(POLYGON, 4326),
  provider_id text references providers(id),
  zone_code text,
  opening_hours text,
  accessibility_flags text[] default '{}',
  confidence_score integer default 80 check (confidence_score between 0 and 100),
  created_at timestamptz default now()
);

create index parking_locations_boundary_idx on parking_locations using gist(boundary);

-- Tariffs
create table tariffs (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references parking_locations(id) on delete cascade,
  rate_type text not null check (rate_type in ('hourly', 'daily', 'flat')),
  price_per_hour_pence integer not null,
  daily_max_pence integer,
  free_minutes integer default 0,
  valid_from date,
  valid_to date,
  day_restrictions text,
  verified_at timestamptz default now()
);

-- User corrections (anonymous)
create table user_corrections (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references parking_locations(id) on delete cascade,
  correction_type text not null check (
    correction_type in ('wrong_provider', 'wrong_zone_code', 'wrong_price', 'space_gone')
  ),
  reported_value text,
  expected_value text,
  notes text,
  session_token text not null,
  status text default 'pending' check (status in ('pending', 'actioned', 'dismissed')),
  created_at timestamptz default now()
);

-- Anonymous sessions (analytics only)
create table user_sessions (
  id uuid primary key default gen_random_uuid(),
  session_token text not null,
  location_id uuid references parking_locations(id),
  provider_id text references providers(id),
  session_start timestamptz default now(),
  deep_link_clicked boolean default false,
  feedback_submitted boolean default false
);

-- RPC: identify parking location from GPS coordinates
create or replace function identify_parking_location(lat double precision, lng double precision)
returns table (
  location_id uuid,
  name text,
  type text,
  zone_code text,
  provider_id text,
  provider_name text,
  confidence_score integer,
  price_per_hour_pence integer,
  daily_max_pence integer,
  deeplink_ios text,
  deeplink_android text,
  web_fallback_url text
)
language sql
stable
as $$
  select
    p.id,
    p.name,
    p.type,
    p.zone_code,
    pr.id,
    pr.name,
    p.confidence_score,
    t.price_per_hour_pence,
    t.daily_max_pence,
    pr.deeplink_ios,
    pr.deeplink_android,
    pr.web_fallback_url
  from parking_locations p
  join tariffs t on t.location_id = p.id
  join providers pr on pr.id = p.provider_id
  where ST_DWithin(
    p.boundary::geography,
    ST_MakePoint(lng, lat)::geography,
    200
  )
  order by p.confidence_score desc,
           ST_Distance(p.boundary, ST_MakePoint(lng, lat)) asc
  limit 3;
$$;

-- RPC: search nearby parking locations
create or replace function search_parking_locations(
  lat double precision,
  lng double precision,
  radius_metres integer default 400
)
returns table (
  location_id uuid,
  name text,
  type text,
  zone_code text,
  distance_metres double precision,
  provider_id text,
  provider_name text,
  confidence_score integer,
  price_per_hour_pence integer,
  daily_max_pence integer
)
language sql
stable
as $$
  select
    p.id,
    p.name,
    p.type,
    p.zone_code,
    ST_Distance(p.boundary::geography, ST_MakePoint(lng, lat)::geography),
    pr.id,
    pr.name,
    p.confidence_score,
    t.price_per_hour_pence,
    t.daily_max_pence
  from parking_locations p
  join tariffs t on t.location_id = p.id
  join providers pr on pr.id = p.provider_id
  where ST_DWithin(
    p.boundary::geography,
    ST_MakePoint(lng, lat)::geography,
    radius_metres
  )
  order by ST_Distance(p.boundary::geography, ST_MakePoint(lng, lat)::geography) asc
  limit 50;
$$;

-- Row-level security
alter table parking_locations enable row level security;
alter table tariffs enable row level security;
alter table providers enable row level security;
alter table user_corrections enable row level security;
alter table user_sessions enable row level security;

-- Public read on locations, tariffs, providers
create policy "public read locations" on parking_locations for select using (true);
create policy "public read tariffs" on tariffs for select using (true);
create policy "public read providers" on providers for select using (true);

-- Anonymous corrections: insert only, no read
create policy "anon insert corrections" on user_corrections for insert with check (true);

-- Sessions: insert only
create policy "anon insert sessions" on user_sessions for insert with check (true);
