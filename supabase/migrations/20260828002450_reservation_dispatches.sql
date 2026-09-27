create table reservation_dispatches (
  id                 uuid primary key default gen_random_uuid(),
  reservation_id     uuid not null references reservations (id) on delete restrict,
  category_id        uuid not null references equipment_categories (id),

  dispatched_at      timestamptz not null,
  duration_minutes   integer not null check (duration_minutes > 0),
  ends_at            timestamptz generated always as
                        ((dispatched_at at time zone 'UTC'
                            + make_interval(mins => duration_minutes)) at time zone 'UTC') stored,
  extra_time_minutes integer not null default 0 check (extra_time_minutes >= 0),
  closed_at          timestamptz,

  created_by uuid not null references workers (id),
  updated_by uuid not null references workers (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint reservation_dispatches_one_group_per_category
    unique (reservation_id, category_id),
  constraint reservation_dispatches_closed_after_dispatched
    check (closed_at is null or closed_at >= dispatched_at)
);

create index reservation_dispatches_reservation_idx on reservation_dispatches (reservation_id);
create index reservation_dispatches_open_idx on reservation_dispatches (ends_at) where closed_at is null;

create trigger reservation_dispatches_stamp_audit
  before insert or update on reservation_dispatches
  for each row execute function stamp_audit_fields();

alter table reservation_items
  add column dispatch_id uuid references reservation_dispatches (id);
create index items_dispatch_idx on reservation_items (dispatch_id) where dispatch_id is not null;

create function sync_reservation_status_from_dispatches() returns trigger
language plpgsql as $$
declare
  v_reservation_id uuid := coalesce(new.reservation_id, old.reservation_id);
  v_all_closed boolean;
begin
  if tg_op = 'INSERT' then
    update reservations
       set status = 'dispatched',
           dispatched_at = coalesce(dispatched_at, new.dispatched_at),
           updated_by = new.created_by
     where id = v_reservation_id
       and status = 'scheduled';
  end if;

  if tg_op = 'UPDATE' and new.closed_at is not null and old.closed_at is null then
    select bool_and(closed_at is not null) into v_all_closed
    from reservation_dispatches where reservation_id = v_reservation_id;

    if v_all_closed then
      update reservations
         set status = 'closed',
             closed_at = new.closed_at,
             updated_by = new.updated_by
       where id = v_reservation_id
         and status = 'dispatched';
    end if;
  end if;

  update reservations r
     set extra_time_minutes = (
           select coalesce(sum(rd.extra_time_minutes), 0)::integer
           from reservation_dispatches rd
           where rd.reservation_id = v_reservation_id
         )
   where r.id = v_reservation_id;

  return new;
end;
$$;

create trigger reservation_dispatches_sync_status
  after insert or update of closed_at, extra_time_minutes on reservation_dispatches
  for each row execute function sync_reservation_status_from_dispatches();

insert into reservation_dispatches
  (reservation_id, category_id, dispatched_at, duration_minutes, extra_time_minutes, closed_at,
   created_by, updated_by)
select distinct
  r.id, u.category_id, r.dispatched_at, r.duration_minutes, r.extra_time_minutes, r.closed_at,
  r.created_by, r.updated_by
from reservations r
join reservation_items ri on ri.reservation_id = r.id
join equipment_units u on u.id = ri.unit_id
where r.status in ('dispatched', 'closed')
  and r.dispatched_at is not null;

update reservation_items ri
   set dispatch_id = rd.id
  from reservation_dispatches rd, equipment_units u
 where rd.reservation_id = ri.reservation_id
   and rd.category_id = u.category_id
   and u.id = ri.unit_id
   and ri.unit_id is not null;

create or replace view unit_current_state with (security_invoker = true) as
select
  u.id,
  u.code,
  u.category_id,
  u.status as recorded_status,
  case
    when u.status <> 'available' then u.status::text
    when active_trip.reservation_id is not null then 'occupied'
    else 'available'
  end as effective_status,
  active_trip.reservation_id,
  active_trip.returns_at
from equipment_units u
left join lateral (
  select rd.reservation_id, rd.ends_at as returns_at
  from reservation_items ri
  join reservation_dispatches rd on rd.id = ri.dispatch_id
  where ri.unit_id = u.id
    and rd.closed_at is null
  order by rd.ends_at
  limit 1
) active_trip on true;

create or replace function category_availability(
  p_category_id         uuid,
  p_starts_at           timestamptz,
  p_ends_at             timestamptz,
  p_exclude_reservation uuid default null
) returns table (usable integer, committed integer, free integer)
language sql stable as $$
  with category as (
    select tracking_mode from equipment_categories where id = p_category_id
  ),
  stock as (
    select case (select tracking_mode from category)
      when 'by_quantity' then coalesce(
        (select quantity_available from equipment_stock where category_id = p_category_id), 0)
      else (
        select count(*) from equipment_units
        where category_id = p_category_id and status = 'available')
    end::integer as usable
  ),
  taken as (
    select
      coalesce((
        select sum(ri.quantity)::integer
        from reservation_items ri
        join reservations r on r.id = ri.reservation_id
        where ri.category_id = p_category_id
          and r.status in ('scheduled', 'dispatched')
          and r.id is distinct from p_exclude_reservation
          and tstzrange(r.starts_at, r.ends_at, '[)')
              && tstzrange(p_starts_at, p_ends_at, '[)')
      ), 0)
      +
      coalesce((
        select count(*)::integer
        from reservation_items ri
        join reservations r on r.id = ri.reservation_id
        join equipment_units u on u.id = ri.unit_id
        left join reservation_dispatches rd on rd.id = ri.dispatch_id
        where u.category_id = p_category_id
          and r.status in ('scheduled', 'dispatched')
          and r.id is distinct from p_exclude_reservation
          and tstzrange(
                coalesce(rd.dispatched_at, r.starts_at),
                coalesce(rd.ends_at, r.ends_at),
                '[)'
              ) && tstzrange(p_starts_at, p_ends_at, '[)')
      ), 0) as committed
  )
  select stock.usable, taken.committed, stock.usable - taken.committed
  from stock, taken;
$$;

create or replace function unit_conflicts(
  p_unit_id             uuid,
  p_starts_at           timestamptz,
  p_ends_at             timestamptz,
  p_exclude_reservation uuid default null
) returns table (reservation_id uuid, code text, starts_at timestamptz, ends_at timestamptz)
language sql stable as $$
  select r.id, r.code, r.starts_at, r.ends_at
  from reservation_items ri
  join reservations r on r.id = ri.reservation_id
  left join reservation_dispatches rd on rd.id = ri.dispatch_id
  where ri.unit_id = p_unit_id
    and r.status in ('scheduled', 'dispatched')
    and r.id is distinct from p_exclude_reservation
    and tstzrange(
          coalesce(rd.dispatched_at, r.starts_at),
          coalesce(rd.ends_at, r.ends_at),
          '[)'
        ) && tstzrange(p_starts_at, p_ends_at, '[)')
$$;

alter table reservation_dispatches enable row level security;

create policy dispatches_select on reservation_dispatches
  for select to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin());
create policy dispatches_insert on reservation_dispatches
  for insert to authenticated
  with check (has_area('reservas') or has_area('operaciones') or is_admin());
create policy dispatches_update on reservation_dispatches
  for update to authenticated
  using (has_area('reservas') or has_area('operaciones') or is_admin())
  with check (has_area('reservas') or has_area('operaciones') or is_admin());

grant select, insert, update on reservation_dispatches to authenticated;
