begin;
select plan(16);
\ir fixtures/reservation_extra_time.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3310000-0000-4000-8000-000000000001","role":"authenticated"}';

create function pg_temp.resolve(p_reservation text, p_payload jsonb) returns void
language sql as $$
  select from record_reservation_extra_time(p_payload || jsonb_build_object('reservation_id', p_reservation));
$$;

select results_eq(
  $$ select outcome::text, extra_minutes, charged_amount, charged_currency::text, charged_payment_method, recorded_by_name
     from record_reservation_extra_time(jsonb_build_object(
       'reservation_id', 'e3310000-0000-4000-8000-000000000303', 'outcome', 'charged',
       'currency', 'USD', 'amount', 25, 'payment_method', '  Efectivo ')) $$,
  $$ values ('charged', 35, 25::numeric, 'USD', 'Efectivo', 'RES31 Reservas') $$,
  'charging the extra time records the agreed amount for the minutes of every group'
);

select results_eq(
  $$ select kind::text, amount, currency::text, payment_method, created_by
     from reservation_charges where reservation_id = 'e3310000-0000-4000-8000-000000000303' $$,
  $$ values ('extra_time', 25::numeric, 'USD', 'Efectivo', 'e3310000-0000-4000-8000-000000000001'::uuid) $$,
  'the money enters the reservation charges as extra time, apart from the tariff'
);

select results_eq(
  $$ select r.outcome::text, r.extra_minutes, r.charge_id = c.id, r.created_by
     from reservation_extra_time_resolutions r
     join reservation_charges c on c.reservation_id = r.reservation_id
     where r.reservation_id = 'e3310000-0000-4000-8000-000000000303' $$,
  $$ values ('charged', 35, true, 'e3310000-0000-4000-8000-000000000001'::uuid) $$,
  'the decision keeps the minutes, the charge and who made it'
);

select results_eq(
  $$ select outcome::text, extra_minutes, charge_id, charged_amount
     from record_reservation_extra_time(jsonb_build_object(
       'reservation_id', 'e3310000-0000-4000-8000-000000000302', 'outcome', 'courtesy')) $$,
  $$ values ('courtesy', 30, null::uuid, null::numeric) $$,
  'a courtesy records the decision without money'
);

select is_empty(
  $$ select 1 from reservation_charges where reservation_id = 'e3310000-0000-4000-8000-000000000302' $$,
  'a courtesy adds no charge'
);

select lives_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000308',
       jsonb_build_object('outcome', 'charged', 'currency', 'CRC', 'amount', 5000, 'payment_method', 'SINPE')) $$,
  'a split departure charges its own extra time'
);

select lives_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000306', jsonb_build_object('outcome', 'courtesy')) $$,
  'a postponed reservation resolves the extra time of its new departure'
);

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000302', jsonb_build_object('outcome', 'courtesy')) $$,
  'P0001', 'Extra time was already resolved',
  'the extra time is resolved once'
);

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000304', jsonb_build_object('outcome', 'courtesy')) $$,
  'P0001', 'The reservation has no extra time',
  'a reservation back on time has nothing to resolve'
);

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000305', jsonb_build_object('outcome', 'courtesy')) $$,
  'P0001', 'Extra time is resolved once every group is back',
  'a reservation with a group still out waits'
);

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000307', jsonb_build_object('outcome', 'courtesy')) $$,
  'P0001', 'Extra time is resolved once every group is back',
  'a cancelled reservation is refused'
);

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000399', jsonb_build_object('outcome', 'courtesy')) $$,
  'P0001', 'Reservation was not found',
  'an unknown reservation is refused'
);

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000301', jsonb_build_object('outcome', 'waived')) $$,
  'P0001', 'Extra time outcome is invalid',
  'an unknown outcome is refused'
);

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000301',
       jsonb_build_object('outcome', 'courtesy', 'currency', 'USD', 'amount', 10)) $$,
  'P0001', 'A courtesy carries no charge',
  'a courtesy with an amount is refused'
);

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000301',
       jsonb_build_object('outcome', 'charged', 'currency', 'USD', 'amount', 10.555, 'payment_method', 'Efectivo')) $$,
  'P0001', 'Charge amount is invalid',
  'a charge keeps the amount rules of the tariff charge'
);

set local request.jwt.claims to '{"sub":"e3310000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.resolve('e3310000-0000-4000-8000-000000000301', jsonb_build_object('outcome', 'courtesy')) $$,
  null, null,
  'operations does not decide about money'
);

select * from finish();
rollback;
