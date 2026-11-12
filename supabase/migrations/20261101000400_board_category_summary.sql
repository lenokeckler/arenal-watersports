create or replace view board_category_summary with (security_invoker = true) as
select
  c.id as category_id,
  c.name as category_name,
  c.group_name,
  coalesce(counts.free_count, 0)::integer as free_count,
  coalesce(counts.in_use_count, 0)::integer as in_use_count,
  coalesce(counts.total_count, 0)::integer as total_count
from equipment_categories c
left join lateral (
  select
    count(*) filter (where s.effective_status = 'available') as free_count,
    count(*) filter (where s.effective_status = 'occupied') as in_use_count,
    count(*) as total_count
  from unit_current_state s
  where s.category_id = c.id
    and s.recorded_status <> 'decommissioned'
) counts on true
where c.is_reservable
  and c.status = 'active'
  and c.tracking_mode = 'by_unit';
