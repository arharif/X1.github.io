-- Replace with your admin email if needed
-- Default requested admin: x731072000@gmail.com

create extension if not exists pgcrypto;
create extension if not exists moddatetime schema extensions;

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text default '',
  universe text not null check (universe in ('professional','personal')),
  category text not null,
  subcategory text,
  display_style text not null default 'book' check (display_style in ('book','slides','article')),
  cover_image_url text,
  icon text,
  order_index int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_entries (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.topics(id) on delete cascade,
  slug text unique not null,
  title text not null,
  excerpt text default '',
  body text default '',
  content_type text not null,
  cover_image_url text,
  video_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author_name text not null default 'Arharif'
);

create trigger handle_topics_updated before update on public.topics
for each row execute procedure extensions.moddatetime(updated_at);

create trigger handle_content_updated before update on public.content_entries
for each row execute procedure extensions.moddatetime(updated_at);

alter table public.topics enable row level security;
alter table public.content_entries enable row level security;

create policy "public_read_topics" on public.topics for select using (true);
create policy "public_read_published_content" on public.content_entries for select using (status = 'published');

create policy "admin_manage_topics" on public.topics
for all
using (auth.jwt() ->> 'email' = 'x731072000@gmail.com')
with check (auth.jwt() ->> 'email' = 'x731072000@gmail.com');

create policy "admin_manage_content" on public.content_entries
for all
using (auth.jwt() ->> 'email' = 'x731072000@gmail.com')
with check (auth.jwt() ->> 'email' = 'x731072000@gmail.com');

insert into storage.buckets (id, name, public)
values ('content-media', 'content-media', true)
on conflict (id) do nothing;

create policy "public_media_read" on storage.objects for select using (bucket_id = 'content-media');
create policy "admin_media_write" on storage.objects
for all
using (bucket_id = 'content-media' and auth.jwt() ->> 'email' = 'x731072000@gmail.com')
with check (bucket_id = 'content-media' and auth.jwt() ->> 'email' = 'x731072000@gmail.com');
