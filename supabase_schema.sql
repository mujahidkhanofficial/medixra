-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 
-- 1. Profiles Table (Extends Auth)
--
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  role text check (role in ('buyer', 'vendor', 'doctor', 'admin')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

--
-- 2. Vendors Table
--
create table vendors (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references auth.users(id), -- Optional: Link to a user if claimed
  name text not null,
  contact_person text,
  email text,
  city text,
  whatsapp_number text,
  specialties text[], -- Array of strings
  description text,
  website text,
  is_approved boolean default false,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Vendors
alter table vendors enable row level security;

create policy "Vendors are viewable by everyone."
  on vendors for select
  using ( true );

create policy "Users can create vendor profiles."
  on vendors for insert
  with check ( auth.uid() = owner_id );

create policy "Vendors can update own profile."
  on vendors for update
  using ( auth.uid() = owner_id );

--
-- 3. Listings (Products) Table
--
create table listings (
  id uuid default uuid_generate_v4() primary key,
  vendor_id uuid references vendors(id) on delete cascade not null,
  title text not null,
  description text, -- Mapped from technicalDetails or added
  price_pkr numeric,
  condition text check (condition in ('New', 'Used', 'Refurbished')),
  categories text[],
  specialties text[],
  images text[],
  manufacturer text,
  model text,
  city text, -- Denormalized for easier search/filtering
  is_featured boolean default false,
  technical_details text,
  whatsapp_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Listings
alter table listings enable row level security;

create policy "Listings are viewable by everyone."
  on listings for select
  using ( true );

create policy "Vendors can insert listings for their own vendor profile."
  on listings for insert
  with check ( 
    exists (
      select 1 from vendors
      where vendors.id = listings.vendor_id
      and vendors.owner_id = auth.uid()
    )
  );

create policy "Vendors can update own listings."
  on listings for update
  using (
    exists (
      select 1 from vendors
      where vendors.id = listings.vendor_id
      and vendors.owner_id = auth.uid()
    )
  );

create policy "Vendors can delete own listings."
  on listings for delete
  using (
    exists (
      select 1 from vendors
      where vendors.id = listings.vendor_id
      and vendors.owner_id = auth.uid()
    )
  );

--
-- 4. Triggers for Updated At
--
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute procedure handle_updated_at();

create trigger vendors_updated_at
  before update on vendors
  for each row execute procedure handle_updated_at();

create trigger listings_updated_at
  before update on listings
  for each row execute procedure handle_updated_at();

--
-- 5. Trigger for New User Profile
--
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'role');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
