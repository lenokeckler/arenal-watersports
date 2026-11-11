begin;
select plan(5);
\ir fixtures/split_reservation.sql.fixture
\ir fixtures/split_payload.sql.fixture

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000307', 'RES19 Unit holder', 2, 'rental', '2035-04-12 17:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservation_items (id, reservation_id, unit_id, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000421', 'e2900000-0000-4000-8000-000000000307', 'e2900000-0000-4000-8000-000000000201',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
create temp table result (departure_id uuid);
grant all on result to authenticated;

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "11:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]}]'::jsonb)) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a unit held in the departure window is refused'
);

reset role;
delete from reservation_items where id = 'e2900000-0000-4000-8000-000000000421';
delete from reservations where id = 'e2900000-0000-4000-8000-000000000307';
update equipment_units set status = 'in_maintenance' where id = 'e2900000-0000-4000-8000-000000000201';
set local role authenticated;

select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "11:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]}]'::jsonb)) $$,
  'P0001', 'Equipment unit is not available for reservation', 'a unit in maintenance is refused'
);

reset role;
update equipment_units set status = 'available' where id = 'e2900000-0000-4000-8000-000000000201';
set local role authenticated;

select throws_ok(
  $$ select split_reservation(pg_temp.split_payload($j$[
    {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]},
    {"people_count": 1, "time": "11:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]}
  ]$j$::jsonb)) $$,
  'P0001', 'Split equipment quantity is not valid', 'two departures cannot take the same unit'
);

insert into result select departure_id from split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "09:30", "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]}]'::jsonb));

select is((select count(*)::integer from result), 1, 'a window overlapping only the original passes');
select is((select reservation_id from reservation_items where id = 'e2900000-0000-4000-8000-000000000401'),
  (select departure_id from result), 'the unit now belongs to the departure');

reset role;
select * from finish();
rollback;
