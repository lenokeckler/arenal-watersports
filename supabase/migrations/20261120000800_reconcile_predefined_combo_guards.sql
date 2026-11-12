create or replace function private.reservation_has_guide_eligible_component(
  p_reservation_id uuid,
  p_combo_id uuid
) returns boolean
language sql security invoker set search_path = public, private
as $$
  select exists (
    select 1
    from reservations as reservation
    join reservation_items as item
      on item.reservation_id = reservation.id
    left join equipment_units as unit
      on unit.id = item.unit_id
    join equipment_categories as category
      on category.id = coalesce(item.category_id, unit.category_id)
    where reservation.id = p_reservation_id
      and reservation.combo_id is not distinct from p_combo_id
      and category.guide_only
  );
$$;

create or replace function private.assert_reservation_guide_assignment(
  p_worker_id uuid,
  p_assigned_by uuid
) returns void
language plpgsql security invoker set search_path = public, private
as $$
begin
  if p_assigned_by is distinct from auth.uid() then
    raise exception 'Assignment author must match the authenticated worker';
  end if;
  if not private.is_active_guide(p_worker_id) then
    raise exception 'Every assigned worker must be marked as a guide';
  end if;
end;
$$;

create or replace function validate_reservation_guide_assignment()
returns trigger
language plpgsql security invoker set search_path = public, private
as $$
declare
  assigned_reservation_type reservation_type;
  assigned_combo_id uuid;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if not (has_area('reservas') or is_admin()) then
    return new;
  end if;
  select reservation.type, reservation.combo_id
  into assigned_reservation_type, assigned_combo_id
  from reservations as reservation
  where reservation.id = new.reservation_id
  for update;
  if not found or not (assigned_reservation_type = 'tour'
    or (assigned_reservation_type = 'combo'
      and private.reservation_has_guide_eligible_component(
        new.reservation_id, assigned_combo_id
      ))) then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  perform private.assert_reservation_guide_assignment(
    new.worker_id, new.assigned_by
  );
  return new;
end;
$$;

create function private.reservation_category_peak_commitment(
  p_category_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_exclude_reservation uuid,
  p_exclude_item_id uuid,
  p_exclude_combo_reservation uuid
) returns integer
language sql stable security invoker set search_path = public
as $$
  with commitments as (
    select coalesce(item.quantity, 1) as quantity,
      case when item.unit_id is null then reservation.starts_at
        else coalesce(dispatch.dispatched_at, reservation.starts_at) end as starts_at,
      case when item.unit_id is null then reservation.ends_at
        else coalesce(dispatch.ends_at, reservation.ends_at) end as ends_at
    from reservation_items as item
    join reservations as reservation on reservation.id = item.reservation_id
    left join equipment_units as unit on unit.id = item.unit_id
    left join reservation_dispatches as dispatch on dispatch.id = item.dispatch_id
    where coalesce(item.category_id, unit.category_id) = p_category_id
      and reservation.status in ('scheduled', 'dispatched')
      and reservation.id is distinct from p_exclude_reservation
      and item.id is distinct from p_exclude_item_id
    union all
    select combo_item.quantity,
      reservation.starts_at,
      reservation.ends_at
    from reservations as reservation
    join combo_items as combo_item
      on combo_item.combo_id = reservation.combo_id
    where combo_item.category_id = p_category_id
      and reservation.status in ('scheduled', 'dispatched')
      and reservation.id is distinct from p_exclude_reservation
      and reservation.id is distinct from p_exclude_combo_reservation
  ), events as (
    select event.at, sum(event.quantity) as quantity
    from commitments as commitment
    cross join lateral (values
      (greatest(commitment.starts_at, p_starts_at), commitment.quantity),
      (least(commitment.ends_at, p_ends_at), -commitment.quantity)
    ) as event(at, quantity)
    where tstzrange(commitment.starts_at, commitment.ends_at, '[)')
      && tstzrange(p_starts_at, p_ends_at, '[)')
    group by event.at
  ), simultaneous_load as (
    select sum(event.quantity) over (order by event.at) as quantity
    from events as event
  )
  select coalesce(max(load.quantity), 0)::integer
  from simultaneous_load as load;
$$;

create or replace function private.reservation_category_peak_commitment(
  p_category_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_exclude_reservation uuid,
  p_exclude_item_id uuid
) returns integer
language sql stable security invoker set search_path = public
as $$
  select private.reservation_category_peak_commitment(
    p_category_id,
    p_starts_at,
    p_ends_at,
    p_exclude_reservation,
    p_exclude_item_id,
    null::uuid
  );
$$;

create or replace function private.assert_reservation_category_quantity_available(
  p_category_id uuid,
  p_quantity integer,
  p_reservation_id uuid,
  p_exclude_item_id uuid
) returns void
language plpgsql security invoker set search_path = public
as $$
declare
  category_tracking_mode tracking_mode;
  category_is_interchangeable boolean;
  free_quantity integer;
  reservation_starts_at timestamptz;
  reservation_ends_at timestamptz;
  usable_quantity integer;
begin
  select category.tracking_mode, category.units_are_interchangeable
    into category_tracking_mode, category_is_interchangeable
  from equipment_categories as category
  where category.id = p_category_id;
  if category_tracking_mode is null then
    return;
  end if;
  select reservation.starts_at, reservation.ends_at
    into reservation_starts_at, reservation_ends_at
  from reservations as reservation
  where reservation.id = p_reservation_id;
  if category_tracking_mode = 'by_quantity' then
    select stock.quantity_available into usable_quantity
    from equipment_stock as stock
    where stock.category_id = p_category_id;
  else
    select count(*)::integer into usable_quantity
    from equipment_units as unit
    where unit.category_id = p_category_id and unit.status = 'available';
  end if;
  select usable_quantity - private.reservation_category_peak_commitment(
    p_category_id,
    reservation_starts_at,
    reservation_ends_at,
    null::uuid,
    p_exclude_item_id,
    p_reservation_id
  ) into free_quantity;
  if p_quantity > free_quantity then
    raise exception 'Equipment category quantity is not available for reservation';
  end if;
end;
$$;

revoke all on function private.reservation_category_peak_commitment(uuid, timestamptz, timestamptz, uuid, uuid, uuid) from public;
grant execute on function private.reservation_category_peak_commitment(uuid, timestamptz, timestamptz, uuid, uuid, uuid) to anon, authenticated, service_role;
