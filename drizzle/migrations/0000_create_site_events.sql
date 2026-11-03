create table public.site_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  created_at timestamptz not null default now()
);

create index site_events_type_created_idx on public.site_events (event_type, created_at);

grant insert on public.site_events to anon;
grant all on public.site_events to service_role;

alter table public.site_events enable row level security;

create policy "Visitors can record site events"
on public.site_events
for insert
to anon
with check (event_type in ('plan_submitted', 'plan_generated', 'gumroad_click'));