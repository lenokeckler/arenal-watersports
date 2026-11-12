alter table reservation_dispatches
  add column planned_duration_minutes integer;

update reservation_dispatches
   set planned_duration_minutes = duration_minutes;

alter table reservation_dispatches
  add constraint reservation_dispatches_planned_duration_positive
    check (planned_duration_minutes is null or planned_duration_minutes > 0),
  add column extended_minutes integer generated always as
    (greatest(duration_minutes - coalesce(planned_duration_minutes, duration_minutes), 0)) stored;

create function set_planned_dispatch_duration() returns trigger
language plpgsql as $$
begin
  new.planned_duration_minutes :=
    coalesce(new.planned_duration_minutes, new.duration_minutes);
  return new;
end;
$$;

create trigger reservation_dispatches_set_planned_duration
  before insert on reservation_dispatches
  for each row execute function set_planned_dispatch_duration();

create function adjust_dispatch_duration(
  p_dispatch_id uuid,
  p_duration_minutes integer
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_closed_at timestamptz;
begin
  if not has_area('operaciones') then
    raise exception 'Operations access is required' using errcode = '42501';
  end if;

  if p_duration_minutes is null
     or p_duration_minutes < 1
     or p_duration_minutes > 1440 then
    raise exception 'The duration must be between 1 and 1440 minutes'
      using errcode = '22023';
  end if;

  select closed_at into v_closed_at
  from reservation_dispatches
  where id = p_dispatch_id
  for update;

  if not found then
    raise exception 'Dispatch not found' using errcode = 'P0002';
  end if;

  if v_closed_at is not null then
    raise exception 'The group already came back' using errcode = '55000';
  end if;

  update reservation_dispatches
     set duration_minutes = p_duration_minutes
   where id = p_dispatch_id;
end;
$$;

revoke all on function adjust_dispatch_duration(uuid, integer) from public, anon;
grant execute on function adjust_dispatch_duration(uuid, integer) to authenticated;

drop function dispatched_groups_out();

create function dispatched_groups_out()
returns table (
  dispatch_id uuid,
  reservation_id uuid,
  code text,
  customer_name text,
  category_id uuid,
  category_name text,
  dispatched_at timestamptz,
  ends_at timestamptz,
  duration_minutes integer,
  extended_minutes integer,
  unit_codes text[],
  quantity integer
)
language sql
stable
security invoker
set search_path = public
as $$
  select rd.id,
         r.id,
         r.code,
         r.customer_name,
         c.id,
         c.name,
         rd.dispatched_at,
         rd.ends_at,
         rd.duration_minutes,
         rd.extended_minutes,
         coalesce(array_agg(eu.code order by eu.code) filter (where eu.code is not null), '{}'),
         (
           count(*) filter (where ri.unit_id is not null)
           + coalesce(sum(ri.quantity) filter (where ri.unit_id is null), 0)
         )::integer
  from reservation_dispatches rd
  join reservations r on r.id = rd.reservation_id
  join equipment_categories c on c.id = rd.category_id
  left join reservation_items ri on ri.dispatch_id = rd.id
  left join equipment_units eu on eu.id = ri.unit_id
  where has_area('operaciones')
    and rd.closed_at is null
  group by rd.id, r.id, c.id
  order by rd.ends_at, r.customer_name, c.name;
$$;

revoke all on function dispatched_groups_out() from public, anon;
grant execute on function dispatched_groups_out() to authenticated;
