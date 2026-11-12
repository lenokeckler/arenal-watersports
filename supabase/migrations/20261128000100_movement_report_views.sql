create view public.monthly_departures with (security_invoker = true) as
select
  date_trunc('month', starts_at at time zone 'America/Costa_Rica')::date as month,
  count(*)::integer as departures_count
from public.reservations
where status <> 'cancelled'
group by date_trunc('month', starts_at at time zone 'America/Costa_Rica');

create view public.weekday_departures with (security_invoker = true) as
select
  extract(isodow from starts_at at time zone 'America/Costa_Rica')::integer as weekday,
  count(*)::integer as departures_count
from public.reservations
where status <> 'cancelled'
  and starts_at >= now() - interval '12 months'
group by extract(isodow from starts_at at time zone 'America/Costa_Rica');

revoke all on public.monthly_departures from anon;
revoke all on public.weekday_departures from anon;
