create or replace function validate_reservation_type_for_guides()
returns trigger
language plpgsql security invoker set search_path = public, private
as $$
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role')
    or new.type = 'tour'
    or (new.type = 'combo'
      and private.reservation_has_guide_eligible_component(
        new.id, new.combo_id
      )) then
    return new;
  end if;
  if exists (
    select 1 from reservation_guides as assignment
    where assignment.reservation_id = new.id
  ) then
    raise exception 'Guides can only be assigned to tour reservations';
  end if;
  return new;
end;
$$;

create or replace function validate_reservation_guide_only_type()
returns trigger
language plpgsql security invoker set search_path = public, private
as $$
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role')
    or new.type is not distinct from old.type
    or new.type = 'tour'
    or (new.type = 'combo' and (
      new.combo_id is null
      or private.reservation_has_guide_eligible_component(
        new.id, new.combo_id
      )
    )) then
    return new;
  end if;
  if exists (
    select 1
    from reservation_items as item
    left join equipment_units as unit on unit.id = item.unit_id
    join equipment_categories as category
      on category.id = coalesce(item.category_id, unit.category_id)
    where item.reservation_id = new.id and category.guide_only
  ) then
    raise exception 'Guide-only equipment requires a tour reservation';
  end if;
  return new;
end;
$$;

revoke all on function private.reservation_has_guide_eligible_component(uuid, uuid) from public, anon;
grant execute on function private.reservation_has_guide_eligible_component(uuid, uuid) to authenticated;
revoke all on function validate_reservation_type_for_guides() from public, anon;
revoke all on function validate_reservation_guide_only_type() from public, anon;
