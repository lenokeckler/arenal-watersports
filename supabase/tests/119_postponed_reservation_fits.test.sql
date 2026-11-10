begin;
select plan(8);

\ir fixtures/postponement_release.sql.fixture

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes,
   consumes_fuel, has_motor, usage_metric, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000104', 'RES20 Chaleco', 'active', 'by_quantity', true, true, 60, false, false, null,
        'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e3300000-0000-4000-8000-000000000104', 2, 'e3300000-0000-4000-8000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000305', 'RES20 Vests', 2, 'rental', '2035-04-13 15:00:00+00', 60, 'scheduled', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000306', 'RES20 Lancha', 2, 'rental', '2035-04-14 15:00:00+00', 60, 'scheduled', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservation_items
  (id, reservation_id, unit_id, category_id, quantity, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000511', 'e3300000-0000-4000-8000-000000000302', null, 'e3300000-0000-4000-8000-000000000104', 2, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000512', 'e3300000-0000-4000-8000-000000000305', null, 'e3300000-0000-4000-8000-000000000104', 2, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000513', 'e3300000-0000-4000-8000-000000000306', 'e3300000-0000-4000-8000-000000000201', null, null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select private.assert_postponed_reservation_fits('e3300000-0000-4000-8000-000000000301', tstzrange('2035-04-14 15:00:00+00', '2035-04-14 16:00:00+00')) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a unit held by another reservation in the new window is refused'
);
select throws_ok(
  $$ select private.assert_postponed_reservation_fits('e3300000-0000-4000-8000-000000000301', tstzrange('2035-04-14 14:30:00+00', '2035-04-14 15:30:00+00')) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a partial overlap is refused too'
);
select lives_ok(
  $$ select private.assert_postponed_reservation_fits('e3300000-0000-4000-8000-000000000301', tstzrange('2035-04-12 15:30:00+00', '2035-04-12 16:30:00+00')) $$,
  'a window that only overlaps the reservation itself is allowed'
);
select lives_ok(
  $$ select private.assert_postponed_reservation_fits('e3300000-0000-4000-8000-000000000301', tstzrange('2035-04-15 15:00:00+00', '2035-04-15 16:00:00+00')) $$,
  'a free window is allowed'
);
select lives_ok(
  $$ select private.assert_postponed_reservation_fits('e3300000-0000-4000-8000-000000000302', tstzrange('2035-04-12 17:00:00+00', '2035-04-12 18:00:00+00')) $$,
  'a by-quantity item does not count against itself'
);

reset role;
update reservations set starts_at = '2035-04-13 15:00:00+00' where id = 'e3300000-0000-4000-8000-000000000302';
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select private.assert_postponed_reservation_fits('e3300000-0000-4000-8000-000000000302', tstzrange('2035-04-13 15:00:00+00', '2035-04-13 16:00:00+00')) $$,
  'P0001', 'Equipment category quantity is not available for reservation', 'stock already committed in the new window is refused'
);

reset role;
update reservations set starts_at = '2035-04-16 15:00:00+00' where id = 'e3300000-0000-4000-8000-000000000302';
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select lives_ok(
  $$ select private.assert_postponed_reservation_fits('e3300000-0000-4000-8000-000000000302', tstzrange('2035-04-16 15:00:00+00', '2035-04-16 16:00:00+00')) $$,
  'stock that is free in the new window is allowed'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000003","role":"authenticated"}';

select throws_ok(
  $$ select private.assert_postponed_reservation_fits('e3300000-0000-4000-8000-000000000301', tstzrange('2035-04-15 15:00:00+00', '2035-04-15 16:00:00+00')) $$,
  'P0001', 'Reservations access is required', 'a worker without the reservations area is refused'
);

reset role;
select * from finish();
rollback;
