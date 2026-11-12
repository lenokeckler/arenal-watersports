create or replace function private.has_custom_combo_tour_component(
  target_reservation_id uuid
) returns boolean
language sql stable security definer set search_path = public
as $$
  select auth.uid() is not null
    and has_area('reservas')
    and exists (
      select 1
      from reservations as reservation
      join reservation_items as item
        on item.reservation_id = reservation.id
      left join equipment_units as unit on unit.id = item.unit_id
      join equipment_categories as category
        on category.id = coalesce(item.category_id, unit.category_id)
      where reservation.id = target_reservation_id
        and reservation.type = 'combo'
        and reservation.combo_id is null
        and category.guide_only
    );
$$;
revoke all on function private.has_custom_combo_tour_component(uuid)
  from public, anon;
grant execute on function private.has_custom_combo_tour_component(uuid)
  to authenticated;

create or replace function validate_reservation_guide_assignment()
returns trigger
language plpgsql security invoker set search_path = public
as $$
declare
  assigned_reservation_type reservation_type;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if not (has_area('reservas') or is_admin()) then
    return new;
  end if;
  select reservation.type into assigned_reservation_type
  from reservations as reservation
  where reservation.id = new.reservation_id
  for update;
  if not found or not (
    assigned_reservation_type = 'tour'
    or (assigned_reservation_type = 'combo'
      and private.has_custom_combo_tour_component(
        new.reservation_id
      ))
  ) then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  if tg_op = 'INSERT' and new.assigned_by is distinct from auth.uid() then
    raise exception 'Assignment author must match the authenticated worker';
  end if;
  if not private.is_active_guide(new.worker_id) then
    raise exception 'Every assigned worker must be marked as a guide';
  end if;
  return new;
end;
$$;
revoke all on function validate_reservation_guide_assignment() from public, anon;
