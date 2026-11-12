create view public.equipment_usage_hours with (security_invoker = true) as
select
  u.id as unit_id,
  u.code as unit_code,
  c.id as category_id,
  c.name as category_name,
  coalesce(
    round(sum(extract(epoch from (d.closed_at - d.dispatched_at)) / 3600)::numeric, 2),
    0
  ) as hours_used,
  count(d.id)::integer as dispatch_count,
  max(d.dispatched_at) as last_dispatched_at
from public.equipment_units u
join public.equipment_categories c on c.id = u.category_id
left join public.reservation_items i on i.unit_id = u.id and i.dispatch_id is not null
left join public.reservation_dispatches d
  on d.id = i.dispatch_id
 and d.closed_at is not null
 and d.dispatched_at >= now() - interval '12 months'
where u.status <> 'decommissioned'
  and c.status = 'active'
group by u.id, u.code, c.id, c.name;

revoke all on public.equipment_usage_hours from anon;
