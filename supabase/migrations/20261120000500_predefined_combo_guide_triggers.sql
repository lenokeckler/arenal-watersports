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

revoke all on function validate_reservation_guide_only_equipment() from public, anon;
revoke all on function validate_reservation_guide_assignment() from public, anon;
