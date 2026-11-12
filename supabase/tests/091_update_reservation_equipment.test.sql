begin;
select plan(28);

\ir fixtures/update_reservation.sql.fixture

select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000301');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000302');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000303');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000304', '2035-04-13 15:00:00+00');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000305', '2035-04-14 15:00:00+00');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000306', p_type => 'combo');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000307');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000308');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000309', '2035-04-15 15:00:00+00');
select pg_temp.seed_reservation('e3180000-0000-4000-8000-000000000310');

insert into extras (id, name, created_by, updated_by) values
  ('e3180000-0000-4000-8000-000000000601', 'RES18 Extra', 'e3180000-0000-4000-8000-000000000001', 'e3180000-0000-4000-8000-000000000001');

insert into reservation_items (id, reservation_id, category_id, quantity, unit_id, extra_id, created_by, updated_by)
select item.id::uuid, item.reservation_id::uuid, item.category_id::uuid, item.quantity, item.unit_id::uuid, item.extra_id::uuid,
       'e3180000-0000-4000-8000-000000000001', 'e3180000-0000-4000-8000-000000000001'
from (values
  ('e3180000-0000-4000-8000-000000000501', 'e3180000-0000-4000-8000-000000000301', 'e3180000-0000-4000-8000-000000000101', 2, null, null),
  ('e3180000-0000-4000-8000-000000000502', 'e3180000-0000-4000-8000-000000000302', 'e3180000-0000-4000-8000-000000000101', 2, null, null),
  ('e3180000-0000-4000-8000-000000000503', 'e3180000-0000-4000-8000-000000000303', null, null, 'e3180000-0000-4000-8000-000000000201', null),
  ('e3180000-0000-4000-8000-000000000504', 'e3180000-0000-4000-8000-000000000304', null, null, 'e3180000-0000-4000-8000-000000000201', null),
  ('e3180000-0000-4000-8000-000000000505', 'e3180000-0000-4000-8000-000000000305', 'e3180000-0000-4000-8000-000000000101', 2, null, null),
  ('e3180000-0000-4000-8000-000000000506', 'e3180000-0000-4000-8000-000000000306', 'e3180000-0000-4000-8000-000000000101', 2, null, null),
  ('e3180000-0000-4000-8000-000000000507', 'e3180000-0000-4000-8000-000000000307', 'e3180000-0000-4000-8000-000000000101', 1, null, null),
  ('e3180000-0000-4000-8000-000000000508', 'e3180000-0000-4000-8000-000000000307', 'e3180000-0000-4000-8000-000000000102', 1, null, null),
  ('e3180000-0000-4000-8000-000000000509', 'e3180000-0000-4000-8000-000000000308', 'e3180000-0000-4000-8000-000000000101', 2, null, null),
  ('e3180000-0000-4000-8000-000000000510', 'e3180000-0000-4000-8000-000000000308', null, null, null, 'e3180000-0000-4000-8000-000000000601'),
  ('e3180000-0000-4000-8000-000000000511', 'e3180000-0000-4000-8000-000000000309', null, null, 'e3180000-0000-4000-8000-000000000203', null),
  ('e3180000-0000-4000-8000-000000000512', 'e3180000-0000-4000-8000-000000000310', 'e3180000-0000-4000-8000-000000000105', 3, null, null)
) as item(id, reservation_id, category_id, quantity, unit_id, extra_id);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3180000-0000-4000-8000-000000000002","role":"authenticated"}';

select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"category_id":"e3180000-0000-4000-8000-000000000102"}')) $$, 'a category change is accepted');
select is((select category_id from reservation_items where id = 'e3180000-0000-4000-8000-000000000501'), 'e3180000-0000-4000-8000-000000000102'::uuid, 'the same item holds the new category');

select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000302', '{"quantity":3}')) $$, 'a quantity change is accepted');
select is((select quantity from reservation_items where id = 'e3180000-0000-4000-8000-000000000502'), 3, 'the same item holds the new quantity');

select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000303', '{"unit_id":"e3180000-0000-4000-8000-000000000202"}')) $$, 'a unit change is accepted');
select is((select unit_id from reservation_items where id = 'e3180000-0000-4000-8000-000000000503'), 'e3180000-0000-4000-8000-000000000202'::uuid, 'the same item holds the new unit');

select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000304', '{"unit_id":null,"category_id":"e3180000-0000-4000-8000-000000000101","quantity":2}')) $$, 'a unit becomes a category commitment');
select ok((select unit_id is null and category_id = 'e3180000-0000-4000-8000-000000000101' and quantity = 2 from reservation_items where id = 'e3180000-0000-4000-8000-000000000504'), 'the same item becomes category and quantity');

select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000305', '{"unit_id":"e3180000-0000-4000-8000-000000000201","category_id":null,"quantity":null}')) $$, 'a category becomes a unit commitment');
select ok((select unit_id = 'e3180000-0000-4000-8000-000000000201' and category_id is null and quantity is null from reservation_items where id = 'e3180000-0000-4000-8000-000000000505'), 'the same item becomes one unit');

select throws_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000306', '{"quantity":3}')) $$, 'P0001', 'Combo equipment cannot be changed', 'a combo refuses changed equipment');
select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000306', '{"people_count":4,"time":"10:00"}')) $$, 'a combo accepts a people and time change with unchanged equipment');
select is((select people_count from reservations where id = 'e3180000-0000-4000-8000-000000000306'), 4, 'the combo people change is applied');

select throws_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000307', '{"quantity":2}')) $$, 'P0001', 'Reservation with several equipment items cannot change equipment', 'several targets refuse changed equipment');
select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000307', '{"people_count":4}')) $$, 'several targets accept a people change with the first target unchanged');

select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000308', '{"quantity":3}')) $$, 'an extra item is not a second target');
select is((select quantity from reservation_items where id = 'e3180000-0000-4000-8000-000000000509'), 3, 'the target takes the new quantity');
select ok((select category_id is null and quantity is null and extra_id is not null from reservation_items where id = 'e3180000-0000-4000-8000-000000000510'), 'the extra item stays untouched');

select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000309', '{"people_count":4}')) $$, 'a unit in maintenance accepts a people change with unchanged equipment');
select is((select people_count from reservations where id = 'e3180000-0000-4000-8000-000000000309'), 4, 'the people change is applied over a unit in maintenance');

select throws_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000301', '{"category_id":"e3180000-0000-4000-8000-000000000104"}')) $$, 'P0001', 'Equipment category is not available for reservation', 'a change to an inactive category is refused');
select throws_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000304', '{"category_id":null,"quantity":null,"unit_id":"e3180000-0000-4000-8000-000000000203"}')) $$, 'P0001', 'Equipment unit is not available for reservation', 'a change to a unit in maintenance is refused');
select throws_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000304', '{"unit_id":"e3180000-0000-4000-8000-000000000201"}')) $$, 'P0001', 'A unit commitment cannot include a category or quantity', 'a unit cannot travel with a category and quantity');

select throws_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000310', '{"quantity":4}')) $$, 'P0001', 'Equipment category is not available for reservation', 'a quantity increase with no stock left is refused');
select throws_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000310', '{"quantity":0}')) $$, 'P0001', 'A category and positive equipment quantity are required', 'a zero quantity is refused');
select throws_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000310', '{"quantity":null}')) $$, 'P0001', 'A category and positive equipment quantity are required', 'a missing quantity is refused');
select lives_ok($$ select update_reservation(pg_temp.reservation_payload('e3180000-0000-4000-8000-000000000310', '{"quantity":2}')) $$, 'a quantity decrease with no stock left is accepted');
select is((select quantity from reservation_items where id = 'e3180000-0000-4000-8000-000000000512'), 2, 'the decrease is applied');

reset role;
select * from finish();
rollback;
