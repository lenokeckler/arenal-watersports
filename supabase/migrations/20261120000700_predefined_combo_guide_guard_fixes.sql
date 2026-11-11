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
    join equipment_categories as category
      on category.id = item.category_id
    where reservation.id = p_reservation_id
      and reservation.combo_id is not distinct from p_combo_id
      and category.guide_only
  );
$$;

revoke all on function private.reservation_has_guide_eligible_component(uuid, uuid) from public, anon;
grant execute on function private.reservation_has_guide_eligible_component(uuid, uuid) to authenticated, service_role;

create or replace function validate_reservation_guide_only_equipment()
returns trigger
language plpgsql security invoker set search_path = public, private
as $$
declare
  committed_category_id uuid;
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if new.category_id is null and new.unit_id is null then
    return new;
  end if;
  committed_category_id := private.get_committed_reservation_category(
    new.category_id, new.unit_id
  );
  if private.is_guide_only_equipment_allowed(
    new.reservation_id, committed_category_id
  ) then
    return new;
  end if;
  raise exception 'Guide-only equipment requires a tour reservation';
end;
$$;

revoke all on function validate_reservation_guide_only_equipment() from public, anon;
