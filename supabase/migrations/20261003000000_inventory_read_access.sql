drop policy if exists categories_select on equipment_categories;
create policy categories_select on equipment_categories
  for select to authenticated
  using (
    has_area('operaciones')
    or has_area('reservas')
    or is_admin()
  );

drop policy if exists stock_select on equipment_stock;
create policy stock_select on equipment_stock
  for select to authenticated
  using (
    has_area('operaciones')
    or has_area('reservas')
    or is_admin()
  );

create or replace view inventory_category_summary with (security_invoker = true) as
select
  c.id            as category_id,
  c.name          as category_name,
  c.tracking_mode,
  c.is_reservable,
  case when c.tracking_mode = 'by_unit'
       then coalesce(units.available, 0)
       else coalesce(stock.quantity_available, 0) end as quantity_available,
  case when c.tracking_mode = 'by_unit'
       then coalesce(units.damaged, 0)
       else coalesce(stock.quantity_damaged, 0) end   as quantity_damaged,
  case when c.tracking_mode = 'by_unit'
       then coalesce(units.in_repair, 0)
       else coalesce(stock.quantity_in_repair, 0) end as quantity_in_repair,
  case when c.tracking_mode = 'by_unit'
       then coalesce(units.in_maintenance, 0)
       else 0 end                                     as quantity_in_maintenance,
  case when c.tracking_mode = 'by_unit'
       then coalesce(units.total, 0)
       else coalesce(stock.quantity_available, 0)
          + coalesce(stock.quantity_damaged, 0)
          + coalesce(stock.quantity_in_repair, 0) end as quantity_total
from equipment_categories c
left join lateral (
  select
    count(*) filter (where effective_status = 'available')::integer      as available,
    count(*) filter (where effective_status = 'damaged')::integer        as damaged,
    count(*) filter (where effective_status = 'in_repair')::integer      as in_repair,
    count(*) filter (where effective_status = 'in_maintenance')::integer as in_maintenance,
    count(*)::integer                                                     as total
  from unit_current_state
  where category_id = c.id
    and recorded_status <> 'decommissioned'
) units on c.tracking_mode = 'by_unit'
left join equipment_stock stock
  on stock.category_id = c.id and c.tracking_mode = 'by_quantity'
where c.status = 'active';

alter publication supabase_realtime add table equipment_categories;
