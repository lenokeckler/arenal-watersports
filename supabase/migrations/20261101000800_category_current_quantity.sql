create or replace view category_current_quantity with (security_invoker = true) as
select
  c.id as category_id,
  (
    case
      when c.tracking_mode = 'by_unit' then coalesce(units.current_units, 0)
      else coalesce(stock.quantity_available, 0)
         + coalesce(stock.quantity_damaged, 0)
         + coalesce(stock.quantity_in_repair, 0)
    end
  )::integer as current_quantity
from equipment_categories c
left join lateral (
  select count(*) as current_units
  from equipment_units u
  where u.category_id = c.id
    and u.status <> 'decommissioned'
) units on c.tracking_mode = 'by_unit'
left join equipment_stock stock
  on stock.category_id = c.id and c.tracking_mode = 'by_quantity';
