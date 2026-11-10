begin;
select plan(20);
\ir fixtures/split_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": true, "items": [{}]}]'::jsonb) $$,
  'P0001', 'Every departure needs at least one person', 'a boolean people count is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": null, "items": [{}]}]'::jsonb) $$,
  'P0001', 'Every departure needs at least one person', 'a null people count is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": 1.5, "items": [{}]}]'::jsonb) $$,
  'P0001', 'Every departure needs at least one person', 'a fractional people count is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": 9999999999, "items": [{}]}]'::jsonb) $$,
  'P0001', 'Every departure needs at least one person', 'a people count over nine digits is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": -1, "items": [{}]}]'::jsonb) $$,
  'P0001', 'Every departure needs at least one person', 'a negative people count is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[null]'::jsonb) $$,
  'P0001', 'Every departure needs at least one person', 'a null departure is refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": 1, "items": {"item_id": "x"}}]'::jsonb) $$,
  'P0001', 'Every departure needs equipment', 'items that are an object are refused'
);

select throws_ok(
  $$ select assert_split_departures_shape('[{"people_count": 1}]'::jsonb) $$,
  'P0001', 'Every departure needs equipment', 'a departure without items is refused'
);

select is(
  (select count(*)::integer from split_item_allocations('[{"people_count": 1}]'::jsonb)),
  0,
  'a departure without items has no allocations'
);

select is(
  (select count(*)::integer from split_item_allocations('[{"people_count": 1, "items": {"item_id": "x"}}]'::jsonb)),
  0,
  'items that are not an array have no allocations'
);

select results_eq(
  $$ select departure_position, item_id, quantity from split_item_allocations(
       '[{"items": [{"item_id": "not-a-uuid", "quantity": "1.5"}]}]'::jsonb) $$,
  $$ values (1, null::uuid, null::integer) $$,
  'malformed ids and quantities become nulls'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1.0}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid', 'a decimal quantity is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 2147483648}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid', 'a quantity beyond integer range is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"items": [{"item_id": "e2900000-0000-4000-8000-000000000402"}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid', 'a missing quantity is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 2}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid', 'a unit item cannot carry a quantity of two'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]},
         {"items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid', 'a unit cannot go to two departures'
);

select lives_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 2}]},
         {"items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}]'::jsonb) $$,
  'pieces split across departures that add up to the total pass'
);

select lives_ok(
  $$ select assert_split_remainder(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       '[{"people_count": 3, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 2}]}]'::jsonb) $$,
  'the original may keep exactly one person and one piece'
);

select throws_ok(
  $$ select assert_split_remainder(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       '[{"people_count": 2, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]},
         {"people_count": 2, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Original reservation must keep at least one person', 'people summed across departures leave nobody'
);

select throws_ok(
  $$ select assert_split_remainder(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       '[{"people_count": 999999999, "items": []}, {"people_count": 999999999, "items": []},
         {"people_count": 999999999, "items": []}]'::jsonb) $$,
  'P0001', 'Original reservation must keep at least one person', 'people sums beyond integer range still leave nobody'
);

reset role;
select * from finish();
rollback;
