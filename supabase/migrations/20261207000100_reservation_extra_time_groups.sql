create type extra_time_outcome as enum ('charged', 'courtesy');

create table reservation_extra_time_resolutions (
  reservation_id uuid primary key references reservations (id) on delete restrict,
  outcome        extra_time_outcome not null,
  extra_minutes  integer not null check (extra_minutes > 0),
  charge_id      uuid unique references reservation_charges (id) on delete restrict,
  created_by     uuid not null references workers (id),
  created_at     timestamptz not null default now(),

  constraint reservation_extra_time_resolutions_charge_shape
    check ((outcome = 'charged') = (charge_id is not null))
);

create trigger reservation_extra_time_resolutions_stamp_audit
  before insert or update on reservation_extra_time_resolutions
  for each row execute function stamp_created_only();

alter table reservation_extra_time_resolutions enable row level security;

create policy reservation_extra_time_resolutions_select on reservation_extra_time_resolutions
  for select to authenticated
  using (has_area('reservas') or is_admin());

grant select on reservation_extra_time_resolutions to authenticated;

create function reservation_extra_time_groups(p_reservation_id uuid)
returns table (
  category_id uuid,
  category_name text,
  dispatched_at timestamptz,
  planned_returns_at timestamptz,
  arrived_at timestamptz,
  extended_minutes integer,
  extra_minutes integer
)
language sql stable security invoker set search_path = public
as $$
  with last_postponement as (
    select max(p.created_at) as postponed_at
    from reservation_postponements p
    where p.reservation_id = p_reservation_id
  ),
  trips as (
    select d.category_id,
           d.dispatched_at,
           max(coalesce(d.planned_duration_minutes, d.duration_minutes)) as planned_minutes,
           max(d.extended_minutes)::integer as extended_minutes,
           case when bool_and(d.closed_at is not null) then max(d.closed_at) end as arrived_at
    from reservation_dispatches d
    cross join last_postponement lp
    where d.reservation_id = p_reservation_id
      and (lp.postponed_at is null or d.created_at > lp.postponed_at)
    group by d.category_id, d.dispatched_at
  ),
  planned as (
    select t.*, t.dispatched_at + make_interval(mins => t.planned_minutes) as planned_returns_at
    from trips t
  )
  select p.category_id,
         c.name,
         p.dispatched_at,
         p.planned_returns_at,
         p.arrived_at,
         p.extended_minutes,
         case
           when p.arrived_at is null or p.arrived_at <= p.planned_returns_at then 0
           else floor(extract(epoch from p.arrived_at - p.planned_returns_at) / 60)::integer
         end
  from planned p
  join equipment_categories c on c.id = p.category_id
  order by p.dispatched_at, c.name;
$$;

revoke all on function reservation_extra_time_groups(uuid) from public, anon;
grant execute on function reservation_extra_time_groups(uuid) to authenticated;
