drop function reservable_equipment_categories();

create function reservable_equipment_categories()
returns table (
  id uuid,
  name text,
  units_are_interchangeable boolean,
  guide_only boolean,
  has_individual_tariff boolean,
  has_compatible_extras boolean
)
language sql stable security invoker set search_path = public
as $$
  select
    category.id,
    category.name,
    category.units_are_interchangeable,
    category.guide_only,
    exists (
      select 1
      from tariffs as tariff
      where tariff.category_id = category.id
        and tariff.type = case when category.guide_only
          then 'tour'::reservation_type
          else 'rental'::reservation_type
        end
    ),
    exists (
      select 1
      from equipment_units as unit
      join extra_compatibility as compatibility
        on compatibility.unit_id = unit.id
      join extras as extra
        on extra.id = compatibility.extra_id
      where unit.category_id = category.id
        and unit.status = 'available'
        and extra.status = 'active'
    )
  from equipment_categories as category
  where category.status = 'active' and category.is_reservable
    and case category.tracking_mode
      when 'by_unit' then exists (
        select 1 from equipment_units as unit
        where unit.category_id = category.id and unit.status = 'available'
      )
      when 'by_quantity' then exists (
        select 1 from equipment_stock as stock
        where stock.category_id = category.id and stock.quantity_available > 0
      )
    end
  order by category.name, category.id;
$$;

revoke all on function reservable_equipment_categories() from public, anon;
grant execute on function reservable_equipment_categories() to authenticated;
