create or replace function validate_reservation_guide_component_removal()
returns trigger
language plpgsql security invoker set search_path = public
as $$
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if old.reservation_id = new.reservation_id and exists (
    select 1 from equipment_categories as category
    where category.id = coalesce(new.category_id, (
      select unit.category_id from equipment_units as unit
      where unit.id = new.unit_id
    )) and category.guide_only
  ) then return new; end if;
  if exists (
    select 1 from reservations as reservation
    where reservation.id = old.reservation_id
      and reservation.type <> 'tour'
      and exists (select 1 from reservation_guides as guide
        where guide.reservation_id = old.reservation_id)
      and not exists (
        select 1 from reservation_items as item
        left join equipment_units as unit on unit.id = item.unit_id
        join equipment_categories as category
          on category.id = coalesce(item.category_id, unit.category_id)
        where item.reservation_id = old.reservation_id
          and item.id <> old.id and category.guide_only
      )
  ) then raise exception 'Guides can only be assigned to tour reservations'; end if;
  return new;
end;
$$;

revoke all on function validate_reservation_guide_component_removal() from public, anon;

drop trigger if exists reservation_items_guide_component_removal on reservation_items;
create trigger reservation_items_guide_component_removal
before update of reservation_id, unit_id, category_id
on reservation_items for each row
execute function validate_reservation_guide_component_removal();
