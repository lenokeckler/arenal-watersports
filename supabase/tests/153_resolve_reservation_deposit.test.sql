begin;
select plan(14);
\ir fixtures/reservation_charge.sql.fixture
\ir fixtures/deposit_resolution.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select resolved_status::text, deposit_amount, returned_amount, kept_amount, resolved_currency::text, resolved_reason is null, resolved_by_name from resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000901', 'returned_amount', 200, 'reason', 'ignored')) $$,
  $$ values ('returned'::text, 200::numeric, 200::numeric, 0::numeric, 'USD'::text, true, 'RES23 Reservas'::text) $$,
  'returning everything resolves the deposit as returned without a reason'
);

select results_eq(
  $$ select status::text, retained_amount is null, retention_reason is null, resolved_by, resolved_at is not null from deposits where id = 'e2c20000-0000-4000-8000-000000000901' $$,
  $$ values ('returned'::text, true, true, 'e2c20000-0000-4000-8000-000000000001'::uuid, true) $$,
  'the returned deposit keeps nothing and stamps who resolved it'
);

select results_eq(
  $$ select resolved_status::text, returned_amount, kept_amount, resolved_reason from resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000902', 'returned_amount', 100, 'reason', '  Aleta rota  ')) $$,
  $$ values ('partially_retained'::text, 100::numeric, 100::numeric, 'Aleta rota'::text) $$,
  'returning part keeps the difference with the trimmed damage reason'
);

select results_eq(
  $$ select status::text, retained_amount, retention_reason from deposits where id = 'e2c20000-0000-4000-8000-000000000902' $$,
  $$ values ('partially_retained'::text, 100::numeric, 'Aleta rota'::text) $$,
  'the kept amount and the reason are stored on the deposit'
);

select results_eq(
  $$ select resolved_status::text, returned_amount, kept_amount from resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000903', 'returned_amount', 0, 'reason', 'Kayak perdido')) $$,
  $$ values ('retained'::text, 0::numeric, 100000::numeric) $$,
  'returning nothing keeps the whole deposit of a cancelled reservation'
);

select results_eq(
  $$ select coalesce(sum(retained_amount), 0) from daily_revenue_report where currency = 'USD' and day = (now() at time zone 'UTC')::date $$,
  $$ values (100::numeric) $$,
  'what the company keeps enters the income report on the day it was resolved'
);

select results_eq(
  $$ select coalesce(sum(retained_amount), 0) from daily_revenue_report where currency = 'CRC' and day = (now() at time zone 'UTC')::date $$,
  $$ values (100000::numeric) $$,
  'the income report keeps each currency apart'
);

select results_eq(
  $$ select count(*)::integer from deposits where status = 'held' and id in ('e2c20000-0000-4000-8000-000000000901', 'e2c20000-0000-4000-8000-000000000902', 'e2c20000-0000-4000-8000-000000000903') $$,
  $$ values (0) $$,
  'resolved deposits leave the pending list'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000901', 'returned_amount', 200)) $$,
  'P0001', 'Deposit was already resolved', 'a resolved deposit cannot be resolved again'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000904', 'returned_amount', 200)) $$,
  'P0001', 'Only closed or cancelled reservations can resolve a deposit', 'a scheduled reservation cannot resolve its deposit'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000905', 'returned_amount', 200)) $$,
  'P0001', 'Only closed or cancelled reservations can resolve a deposit', 'a dispatched reservation cannot resolve its deposit'
);

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000999', 'returned_amount', 200)) $$,
  'P0001', 'Deposit was not found', 'an unknown deposit is refused'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select resolve_reservation_deposit(jsonb_build_object('deposit_id', 'e2c20000-0000-4000-8000-000000000906', 'returned_amount', 200)) $$,
  'P0001', 'Reservations access is required', 'Operaciones cannot resolve a deposit'
);

select is_empty(
  $$ select id from deposits where id = 'e2c20000-0000-4000-8000-000000000906' $$,
  'Operaciones does not see the deposit'
);

select * from finish();
rollback;
