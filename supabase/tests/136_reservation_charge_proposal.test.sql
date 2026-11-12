begin;
select plan(16);
\ir fixtures/reservation_charge.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000301') $$,
  $$ values (40::numeric, 20000::numeric) $$,
  'a one hour unit reservation proposes the hourly tariff in both currencies'
);

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000302') $$,
  $$ values (60::numeric, 30000::numeric) $$,
  'a ninety minute reservation proposes the tariff times one and a half'
);

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000303') $$,
  $$ values (60::numeric, null::numeric) $$,
  'two categories are summed and a currency missing from one tariff stays null'
);

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000304') $$,
  $$ values (30::numeric, null::numeric) $$,
  'a quantity item multiplies its category tariff'
);

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000305') $$,
  $$ values (80::numeric, 50000::numeric) $$,
  'an existing pricing row wins and agreed overrides list per currency'
);

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000306') $$,
  $$ values (150::numeric, null::numeric) $$,
  'a combo uses its pricing row'
);

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000309') $$,
  $$ values (25::numeric, 12000::numeric) $$,
  'a tour reservation reads the tour tariff'
);

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000307') $$,
  $$ values (null::numeric, null::numeric) $$,
  'extras items add nothing to the proposal'
);

select results_eq(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000308') $$,
  $$ values (null::numeric, null::numeric) $$,
  'a reservation without equipment items has no proposal'
);

select is(
  (select proposal_usd from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000301')),
  (select amount_usd from tariffs where category_id = 'e2c20000-0000-4000-8000-000000000101' and type = 'rental'),
  'six people on one boat propose the same amount as the tariff for one boat'
);

select is(
  (select proposal_usd from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000312')),
  null::numeric,
  'a cancelled reservation without items still answers with an empty proposal'
);

select throws_ok(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000009999') $$,
  'P0001', 'Reservation was not found',
  'an unknown reservation is refused'
);

select is(
  (select count(*) from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000314')),
  1::bigint,
  'a split child still answers with one proposal row'
);

select is(
  (select count(*) from private.reservation_catalog_amounts('e2c20000-0000-4000-8000-000000000301')),
  1::bigint,
  'the catalog helper always answers with exactly one row'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select * from reservation_charge_proposal('e2c20000-0000-4000-8000-000000000301') $$,
  'P0001', 'Reservations access is required',
  'an operations-only worker cannot read the proposal'
);

reset role;

select is(
  has_function_privilege('anon', 'public.reservation_charge_proposal(uuid)', 'execute')
    or has_function_privilege('anon', 'private.reservation_catalog_amounts(uuid)', 'execute'),
  false,
  'anon cannot execute either function'
);

select * from finish();
rollback;
