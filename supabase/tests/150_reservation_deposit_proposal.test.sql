begin;
select plan(9);
\ir fixtures/reservation_charge.sql.fixture
\ir fixtures/reservation_deposit_amounts.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select proposal_usd, proposal_crc from reservation_deposit_proposal('e2c20000-0000-4000-8000-000000000301') $$,
  $$ values (200::numeric, 100000::numeric) $$,
  'a unit item proposes its category deposit in both currencies'
);

select results_eq(
  $$ select proposal_usd, proposal_crc from reservation_deposit_proposal('e2c20000-0000-4000-8000-000000000303') $$,
  $$ values (240::numeric, 100000::numeric) $$,
  'unit and category items are summed and a category without CRC adds nothing'
);

select results_eq(
  $$ select proposal_usd, proposal_crc from reservation_deposit_proposal('e2c20000-0000-4000-8000-000000000304') $$,
  $$ values (60::numeric, 0::numeric) $$,
  'a category item multiplies its deposit by the quantity'
);

select results_eq(
  $$ select proposal_usd, proposal_crc from reservation_deposit_proposal('e2c20000-0000-4000-8000-000000000307') $$,
  $$ values (0::numeric, 0::numeric) $$,
  'an extra item is excluded even when it carries a category'
);

select results_eq(
  $$ select proposal_usd, proposal_crc from reservation_deposit_proposal('e2c20000-0000-4000-8000-000000000308') $$,
  $$ values (0::numeric, 0::numeric) $$,
  'a reservation without equipment proposes nothing'
);

select results_eq(
  $$ select proposal_usd, proposal_crc from reservation_deposit_proposal('e2c20000-0000-4000-8000-000000000316') $$,
  $$ values (0::numeric, 0::numeric) $$,
  'a category without amounts contributes nothing'
);

select results_eq(
  $$ select count(*)::integer, count(proposal_usd)::integer, count(proposal_crc)::integer from reservation_deposit_proposal('e2c20000-0000-4000-8000-000000000308') $$,
  $$ values (1, 1, 1) $$,
  'the proposal is exactly one row and never null'
);

select throws_ok(
  $$ select * from reservation_deposit_proposal('00000000-0000-4000-8000-000000000000') $$,
  'P0001', 'Reservation was not found', 'an unknown reservation is refused'
);

set local request.jwt.claims to '{"sub":"e2c20000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select * from reservation_deposit_proposal('e2c20000-0000-4000-8000-000000000301') $$,
  'P0001', 'Reservations access is required', 'an Operations worker cannot read the proposal'
);

select * from finish();
rollback;
