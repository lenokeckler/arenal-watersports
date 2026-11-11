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
