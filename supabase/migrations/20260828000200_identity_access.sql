create table worker_areas (
  worker_id  uuid        not null references workers (id) on delete restrict,
  area       work_area   not null,
  granted_by uuid        not null references workers (id),
  granted_at timestamptz not null default now(),
  primary key (worker_id, area)
);

create table worker_marks (
  worker_id  uuid        not null references workers (id) on delete restrict,
  mark       worker_mark not null,
  granted_by uuid        not null references workers (id),
  granted_at timestamptz not null default now(),
  primary key (worker_id, mark)
);

create table password_reset_pins (
  id         uuid primary key default gen_random_uuid(),
  worker_id  uuid        not null references workers (id) on delete restrict,
  pin_hash   text        not null,
  expires_at timestamptz not null,
  used_at    timestamptz,
  created_at timestamptz not null default now()
);

create index password_reset_pins_lookup
  on password_reset_pins (worker_id, expires_at)
  where used_at is null;

create function seed_base_area() returns trigger
language plpgsql as $$
begin
  insert into worker_areas (worker_id, area, granted_by)
  values (new.id, new.base_role, coalesce(new.created_by, new.id))
  on conflict do nothing;
  return new;
end $$;

create trigger workers_seed_base_area
  after insert on workers
  for each row execute function seed_base_area();

create function has_area(target work_area) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from worker_areas wa
    join workers w on w.id = wa.worker_id
    where wa.worker_id = auth.uid()
      and wa.area = target
      and w.status = 'active'
      and (w.expires_at is null or w.expires_at > now())
  );
$$;

create function has_mark(target worker_mark) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from worker_marks wm
    join workers w on w.id = wm.worker_id
    where wm.worker_id = auth.uid()
      and wm.mark = target
      and w.status = 'active'
      and (w.expires_at is null or w.expires_at > now())
  );
$$;

create function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select has_area('administracion');
$$;
