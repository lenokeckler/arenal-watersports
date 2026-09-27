create view financial_movements with (security_invoker = true) as
select
  (created_at at time zone 'UTC')::date as occurred_on,
  currency,
  amount as gross_amount,
  0::numeric(14,2) as refunds_amount,
  0::numeric(14,2) as retained_amount
from reservation_charges
union all
select
  (created_at at time zone 'UTC')::date as occurred_on,
  currency,
  0::numeric(14,2) as gross_amount,
  amount as refunds_amount,
  0::numeric(14,2) as retained_amount
from refunds
union all
select
  (resolved_at at time zone 'UTC')::date as occurred_on,
  currency,
  0::numeric(14,2) as gross_amount,
  0::numeric(14,2) as refunds_amount,
  retained_amount
from deposits
where status in ('retained', 'partially_retained');

create view daily_revenue_report with (security_invoker = true) as
select
  occurred_on as day,
  currency,
  sum(gross_amount) as gross_amount,
  sum(refunds_amount) as refunds_amount,
  sum(retained_amount) as retained_amount,
  sum(gross_amount) - sum(refunds_amount) + sum(retained_amount) as net_amount
from financial_movements
group by occurred_on, currency;

create view monthly_revenue_report with (security_invoker = true) as
select
  date_trunc('month', occurred_on)::date as month,
  currency,
  sum(gross_amount) as gross_amount,
  sum(refunds_amount) as refunds_amount,
  sum(retained_amount) as retained_amount,
  sum(gross_amount) - sum(refunds_amount) + sum(retained_amount) as net_amount
from financial_movements
group by date_trunc('month', occurred_on), currency;

create view daily_reservation_counts with (security_invoker = true) as
select
  (starts_at at time zone 'UTC')::date as day,
  count(*)::integer as reservations_count
from reservations
where status <> 'cancelled'
group by (starts_at at time zone 'UTC')::date;

create view monthly_reservation_counts with (security_invoker = true) as
select
  date_trunc('month', (starts_at at time zone 'UTC')::date)::date as month,
  count(*)::integer as reservations_count
from reservations
where status <> 'cancelled'
group by date_trunc('month', (starts_at at time zone 'UTC')::date);

create view reservations_by_worker with (security_invoker = true) as
select
  w.id as worker_id,
  w.full_name as worker_name,
  count(r.id)::integer as reservations_count,
  min(r.starts_at) as first_reservation_at,
  max(r.starts_at) as last_reservation_at
from workers w
join reservations r on r.created_by = w.id and r.status <> 'cancelled'
group by w.id, w.full_name;

create view maintenance_cost_by_unit with (security_invoker = true) as
select
  u.id as unit_id,
  u.code as unit_code,
  u.category_id,
  mr.cost_currency as currency,
  sum(mr.cost_amount) as total_cost,
  count(mr.id)::integer as records_count,
  max(mr.performed_at) as last_performed_at
from equipment_units u
join maintenance_records mr on mr.unit_id = u.id
where mr.cost_amount is not null
group by u.id, u.code, u.category_id, mr.cost_currency;
