create or replace function private.is_active_predefined_combo_component(
  p_combo_id uuid,
  p_category_id uuid
) returns boolean
language sql security invoker set search_path = public, private
as $$
  select exists (
    select 1
    from combos as combo
    join combo_items as item on item.combo_id = combo.id
    where combo.id = p_combo_id
      and combo.status = 'active'
      and item.category_id = p_category_id
  );
$$;

create or replace function private.reservation_has_guide_eligible_component(
  p_reservation_id uuid,
  p_combo_id uuid
) returns boolean
language sql security invoker set search_path = public, private
as $$
  select (p_combo_id is null and exists (
    select 1
    from reservation_items as item
    join equipment_categories as category
      on category.id = item.category_id
    where item.reservation_id = p_reservation_id
      and category.guide_only
  )) or (p_combo_id is not null and exists (
    select 1
    from reservation_items as item
    join combo_items as combo_item
      on combo_item.combo_id = p_combo_id
      and combo_item.category_id = item.category_id
    join combos as combo on combo.id = combo_item.combo_id
    join equipment_categories as category
      on category.id = combo_item.category_id
    where item.reservation_id = p_reservation_id
      and category.guide_only
      and combo.status = 'active'
  ));
$$;

create or replace function private.get_committed_reservation_category(
  p_category_id uuid,
  p_unit_id uuid
) returns uuid
language sql security invoker set search_path = public, private
as $$
  select coalesce(unit.category_id, p_category_id)
  from (select 1) as source
  left join equipment_units as unit on unit.id = p_unit_id;
$$;

create or replace function private.is_guide_only_equipment_allowed(
  p_reservation_id uuid,
  p_category_id uuid
) returns boolean
language sql security invoker set search_path = public, private
as $$
  select not category.guide_only
    or reservation.type = 'tour'
    or (reservation.type = 'combo' and (
      reservation.combo_id is null
      or private.is_active_predefined_combo_component(
        reservation.combo_id, p_category_id
      )
    ))
  from reservations as reservation
  join equipment_categories as category on category.id = p_category_id
  where reservation.id = p_reservation_id;
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
  if not exists (
    select 1 from worker_marks as mark
    where mark.worker_id = p_worker_id and mark.mark = 'guia'
  ) then
    raise exception 'Every assigned worker must be marked as a guide';
  end if;
end;
$$;

revoke all on function private.is_active_predefined_combo_component(uuid, uuid) from public, anon;
grant execute on function private.is_active_predefined_combo_component(uuid, uuid) to authenticated;
revoke all on function private.reservation_has_guide_eligible_component(uuid, uuid) from public, anon;
grant execute on function private.reservation_has_guide_eligible_component(uuid, uuid) to authenticated;
revoke all on function private.get_committed_reservation_category(uuid, uuid) from public, anon;
grant execute on function private.get_committed_reservation_category(uuid, uuid) to authenticated;
revoke all on function private.is_guide_only_equipment_allowed(uuid, uuid) from public, anon;
grant execute on function private.is_guide_only_equipment_allowed(uuid, uuid) to authenticated;
revoke all on function private.assert_reservation_guide_assignment(uuid, uuid) from public, anon;
grant execute on function private.assert_reservation_guide_assignment(uuid, uuid) to authenticated;
