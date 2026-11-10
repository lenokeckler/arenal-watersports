create or replace function assert_reservable_equipment_category(p_category_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not exists (
    select 1
    from equipment_categories
    where id = p_category_id
      and status = 'active'
      and is_reservable
      and (tracking_mode = 'by_quantity' or units_are_interchangeable)
  ) then
    raise exception 'Equipment category is not available for reservation';
  end if;
end;
$$;
