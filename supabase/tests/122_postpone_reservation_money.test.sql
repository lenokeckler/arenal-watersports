begin;
select plan(8);

\ir fixtures/postponement_release.sql.fixture
\ir fixtures/postpone_call.sql.fixture

update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000601' where id in ('e3300000-0000-4000-8000-000000000501', 'e3300000-0000-4000-8000-000000000504');
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000603' where id = 'e3300000-0000-4000-8000-000000000503';
update reservation_dispatches set dispatched_at = '2026-01-10 15:00:00+00' where reservation_id = 'e3300000-0000-4000-8000-000000000301';

insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
values
  ('e3300000-0000-4000-8000-000000000301', 'tariff', 60, 'USD', 'Efectivo', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000302', 'tariff', 30000, 'CRC', 'SINPE', 'e3300000-0000-4000-8000-000000000001');
insert into deposits (reservation_id, amount, currency, created_by)
values
  ('e3300000-0000-4000-8000-000000000301', 50, 'USD', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000302', 25000, 'CRC', 'e3300000-0000-4000-8000-000000000001');
insert into reservation_pricing (reservation_id, agreed_amount_usd, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000301', 75, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000302', 40, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

create function pg_temp.digest(p_table text) returns text language plpgsql as $$
declare
  digest text;
begin
  execute format('select coalesce(md5(string_agg(t::text, %L order by t.reservation_id)), %L) from %I t', '|', 'empty', p_table)
    into digest;
  return digest;
end;
$$;

create temp table before_digest as
select pg_temp.digest('reservation_charges') as charges, pg_temp.digest('deposits') as deposits, pg_temp.digest('reservation_pricing') as pricing;

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000302', '2035-04-13', '09:30', 'storm') $$,
  'a scheduled reservation with charge and deposit is postponed'
);
select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000301', '2035-04-13', '10:00', 'heavy_rain', null, jsonb_build_array(
       jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000501', 'fuel_in', 2, 'usage_in', 12),
       jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000503', 'fuel_in', 0, 'usage_in', 9),
       jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000504', 'fuel_in', 4, 'usage_in', 20))) $$,
  'a dispatched reservation with charge and deposit is postponed'
);

reset role;

select is(pg_temp.digest('reservation_charges'), (select charges from before_digest), 'the charges are the same rows, untouched');
select is(pg_temp.digest('deposits'), (select deposits from before_digest), 'the deposits are the same rows, untouched');
select is(pg_temp.digest('reservation_pricing'), (select pricing from before_digest), 'the agreed prices are untouched');
select is(
  (select string_agg(status::text, ' ' order by reservation_id) from deposits),
  'held held',
  'every deposit is still held'
);
select is(
  (select count(*) from reservation_charges),
  2::bigint,
  'no charge was created or removed'
);
select is(
  (select string_agg(r.status::text, ' ' order by r.id) from reservations r where r.id in (select reservation_id from deposits)),
  'scheduled scheduled',
  'both reservations are scheduled again with their money alive'
);

select * from finish();
rollback;
