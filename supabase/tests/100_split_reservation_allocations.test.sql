begin;
select plan(14);
\ir fixtures/split_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select is(
  (select count(*)::integer from split_movable_items('e2900000-0000-4000-8000-000000000301')),
  2,
  'extras are not movable'
);

select is(
  (select count(*)::integer from split_movable_items('e2900000-0000-4000-8000-000000000306')),
  0,
  'dispatched items are not movable'
);

select results_eq(
  $$ select departure_position, quantity from split_item_allocations(
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]},
         {"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 2}]}]'::jsonb
     ) order by departure_position $$,
  $$ values (1, 1), (2, 2) $$,
  'allocations are numbered by departure position'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000404", "quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Split equipment does not belong to the reservation',
  'an item of another reservation is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000403", "quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Split equipment does not belong to the reservation',
  'an extra item is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000306',
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000404", "quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Split equipment does not belong to the reservation',
  'a dispatched item is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 0}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid',
  'a zero quantity is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 4}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid',
  'a quantity over the pieces held is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1},
                                       {"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid',
  'a duplicate item in one departure is refused'
);

select throws_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 2}]},
         {"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 2}]}]'::jsonb) $$,
  'P0001', 'Split equipment quantity is not valid',
  'a total over the pieces held across departures is refused'
);

select throws_ok(
  $$ select assert_split_remainder(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       '[{"people_count": 4, "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}]'::jsonb) $$,
  'P0001', 'Original reservation must keep at least one person',
  'the original must keep at least one person'
);

select throws_ok(
  $$ select assert_split_remainder(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       '[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1},
                                       {"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 3}]}]'::jsonb) $$,
  'P0001', 'Original reservation must keep equipment',
  'the original must keep at least one piece of equipment'
);

select lives_ok(
  $$ select assert_split_allocations_valid('e2900000-0000-4000-8000-000000000301',
       '[{"people_count": 2, "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1},
                                       {"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 2}]}]'::jsonb) $$,
  'a legal split passes the allocation guard'
);

select lives_ok(
  $$ select assert_split_remainder(
       (select r from reservations r where r.id = 'e2900000-0000-4000-8000-000000000301'),
       '[{"people_count": 2, "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1},
                                       {"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 2}]}]'::jsonb) $$,
  'a legal split passes the remainder guard'
);

reset role;
select * from finish();
rollback;
