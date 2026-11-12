create function maintenance_units()
returns table (
  unit_id uuid,
  code text,
  category_id uuid,
  category_name text,
  status unit_status,
  usage_total numeric,
  next_oil_change_at numeric,
  usage_metric usage_metric,
  oil_overage numeric
)
language sql
stable
security invoker
set search_path = public
as $$
  select eu.id,
         eu.code,
         ec.id,
         ec.name,
         eu.status,
         eu.usage_total,
         eu.next_oil_change_at,
         ec.usage_metric,
         case
           when eu.next_oil_change_at is not null
                and eu.usage_total >= eu.next_oil_change_at
           then eu.usage_total - eu.next_oil_change_at
         end
  from equipment_units eu
  join equipment_categories ec on ec.id = eu.category_id
  where has_area('operaciones')
    and eu.status <> 'decommissioned'
    and (
      (eu.next_oil_change_at is not null and eu.usage_total >= eu.next_oil_change_at)
      or eu.status <> 'available'
    )
  order by (eu.next_oil_change_at is not null and eu.usage_total >= eu.next_oil_change_at) desc,
           eu.usage_total - coalesce(eu.next_oil_change_at, eu.usage_total) desc,
           eu.code;
$$;

revoke all on function maintenance_units() from public, anon;
grant execute on function maintenance_units() to authenticated;
