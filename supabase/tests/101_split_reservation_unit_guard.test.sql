begin;
select plan(4);
\ir fixtures/split_reservation.sql.fixture

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select lives_ok(
  $$ select assert_split_departure_units_available('e2900000-0000-4000-8000-000000000301',
       '[{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]'::jsonb,
       tstzrange('2035-04-12 15:30:00+00', '2035-04-12 16:30:00+00', '[)')) $$,
  'the original does not conflict with the unit it gives away'
);

select lives_ok(
  $$ select assert_split_departure_units_available('e2900000-0000-4000-8000-000000000301',
       '[{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]'::jsonb,
       tstzrange('2035-04-12 15:30:00+00', '2035-04-12 16:30:00+00', '[)')) $$,
  'a departure of quantity equipment needs no unit check'
);

reset role;

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000307', 'RES19 Unit holder', 2, 'rental', '2035-04-12 17:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000307', 'e2900000-0000-4000-8000-000000000201',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');

set local role authenticated;

select throws_ok(
  $$ select assert_split_departure_units_available('e2900000-0000-4000-8000-000000000301',
       '[{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]'::jsonb,
       tstzrange('2035-04-12 17:30:00+00', '2035-04-12 18:30:00+00', '[)')) $$,
  'P0001', 'Equipment unit conflicts with another reservation',
  'a unit held by another reservation in the departure window is refused'
);

reset role;
update equipment_units set status = 'in_maintenance' where id = 'e2900000-0000-4000-8000-000000000201';
set local role authenticated;

select throws_ok(
  $$ select assert_split_departure_units_available('e2900000-0000-4000-8000-000000000301',
       '[{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]'::jsonb,
       tstzrange('2035-04-12 19:00:00+00', '2035-04-12 20:00:00+00', '[)')) $$,
  'P0001', 'Equipment unit is not available for reservation',
  'a unit out of service is refused'
);

reset role;
select * from finish();
rollback;
