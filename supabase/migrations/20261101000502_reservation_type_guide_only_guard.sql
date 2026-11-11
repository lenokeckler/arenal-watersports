create function validate_reservation_guide_only_type()
returns trigger
language plpgsql security invoker set search_path = public
as $$
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if new.type is not distinct from old.type or new.type = 'tour' then
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

revoke all on function validate_reservation_guide_only_type() from public, anon;

create trigger reservations_guide_only_type
before update of type on reservations for each row
execute function validate_reservation_guide_only_type();
