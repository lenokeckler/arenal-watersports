create view unit_service_status with (security_invoker = true) as
select
  u.id                                        as unit_id,
  u.code,
  u.category_id,
  c.name                                      as category_name,
  c.usage_metric,
  u.status,
  u.usage_total,
  u.next_oil_change_at,
  (u.next_oil_change_at - u.usage_total)      as remaining_usage,
  (u.usage_total >= u.next_oil_change_at)     as is_oil_change_due
from equipment_units u
join equipment_categories c on c.id = u.category_id
where u.next_oil_change_at is not null
  and u.status <> 'decommissioned';

create view inventory_category_summary with (security_invoker = true) as
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
    count(*) filter (where eu.status = 'available')::integer      as available,
    count(*) filter (where eu.status = 'damaged')::integer        as damaged,
    count(*) filter (where eu.status = 'in_repair')::integer      as in_repair,
    count(*) filter (where eu.status = 'in_maintenance')::integer as in_maintenance,
    count(*)::integer                                             as total
  from equipment_units eu
  where eu.category_id = c.id
    and eu.status <> 'decommissioned'
) units on c.tracking_mode = 'by_unit'
left join equipment_stock stock
  on stock.category_id = c.id and c.tracking_mode = 'by_quantity'
where c.status = 'active';

create view inventory_quantity_alerts with (security_invoker = true) as
select
  c.id   as category_id,
  c.name as category_name,
  c.alert_min_quantity,
  s.quantity_available,
  (c.alert_min_quantity - s.quantity_available) as missing_quantity
from equipment_categories c
join equipment_stock s on s.category_id = c.id
where c.status = 'active'
  and c.alert_min_quantity is not null
  and s.quantity_available < c.alert_min_quantity;

create view inventory_expiry_alerts with (security_invoker = true) as
select
  c.id   as category_id,
  c.name as category_name,
  c.alert_expiry_days,
  s.expiry_date,
  (s.expiry_date - current_date)::integer as days_to_expiry,
  (s.expiry_date <= current_date)         as is_expired
from equipment_categories c
join equipment_stock s on s.category_id = c.id
where c.status = 'active'
  and c.alert_expiry_days is not null
  and s.expiry_date is not null
  and s.expiry_date <= current_date + c.alert_expiry_days;
