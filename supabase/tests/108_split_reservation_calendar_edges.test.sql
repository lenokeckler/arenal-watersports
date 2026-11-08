begin;
select plan(11);
\ir fixtures/split_reservation.sql.fixture
\ir fixtures/split_payload.sql.fixture

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000202', 'e2900000-0000-4000-8000-000000000101', 'RES19-LANCHA-2', 'available',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000203', 'e2900000-0000-4000-8000-000000000101', 'RES19-LANCHA-3', 'available',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000330', 'RES19 Neighbour', 7, 'rental', '2035-06-01 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000331', 'RES19 Sold out', 4, 'rental', '2035-06-01 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000332', 'RES19 Three pieces', 4, 'rental', '2035-06-02 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000333', 'RES19 Night', 4, 'rental', '2035-06-03 05:30:00+00', 1500, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000334', 'RES19 After midnight', 4, 'rental', '2035-06-04 06:10:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservation_items (id, reservation_id, unit_id, category_id, quantity, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000441', 'e2900000-0000-4000-8000-000000000330', null, 'e2900000-0000-4000-8000-000000000102', 7,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000442', 'e2900000-0000-4000-8000-000000000331', null, 'e2900000-0000-4000-8000-000000000102', 3,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000443', 'e2900000-0000-4000-8000-000000000331', 'e2900000-0000-4000-8000-000000000201', null, null,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000444', 'e2900000-0000-4000-8000-000000000331', 'e2900000-0000-4000-8000-000000000202', null, null,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000445', 'e2900000-0000-4000-8000-000000000332', null, 'e2900000-0000-4000-8000-000000000102', 3,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000446', 'e2900000-0000-4000-8000-000000000332', 'e2900000-0000-4000-8000-000000000203', null, null,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000447', 'e2900000-0000-4000-8000-000000000333', null, 'e2900000-0000-4000-8000-000000000102', 3,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000448', 'e2900000-0000-4000-8000-000000000334', null, 'e2900000-0000-4000-8000-000000000102', 2,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
alter table reservations disable trigger reservations_stamp_audit;
update reservations set updated_at = '2020-01-01 00:00:00+00' where id::text like 'e2900000%';
alter table reservations enable trigger reservations_stamp_audit;

create temp table result (step text, departure_id uuid);
create temp table stale_payload as
select pg_temp.split_payload('[{"people_count": 1, "time": "08:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000442", "quantity": 1}]}]'::jsonb,
  'e2900000-0000-4000-8000-000000000331') as payload;
grant all on result, stale_payload to authenticated;

select is((select free from category_availability('e2900000-0000-4000-8000-000000000102', '2035-06-01 15:00:00+00', '2035-06-01 16:00:00+00')), 0,
  'the category is fully committed in the window before the split');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

insert into result select 'sold_out', departure_id from split_reservation(pg_temp.split_payload('[
  {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000442", "quantity": 2}]}
]'::jsonb, 'e2900000-0000-4000-8000-000000000331'));
select is((select sum(quantity)::integer from reservation_items where category_id = 'e2900000-0000-4000-8000-000000000102'
  and reservation_id in ('e2900000-0000-4000-8000-000000000331', (select departure_id from result where step = 'sold_out'))), 3,
  'pieces the reservation already holds move even when the category is fully committed');

select throws_ok($$ select split_reservation((select payload from stale_payload)) $$, 'P0001',
  'Reservation changed since the form was loaded', 'a second submit with the token read before the split is stale');

insert into result select 'overlap', departure_id from split_reservation(pg_temp.split_payload('[
  {"people_count": 1, "time": "09:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000443", "quantity": 1}]}
]'::jsonb, 'e2900000-0000-4000-8000-000000000331'));
select is((select reservation_id from reservation_items where id = 'e2900000-0000-4000-8000-000000000443'),
  (select departure_id from result where step = 'overlap'), 'a unit moves to a window that overlaps the original when the original keeps another unit');
select is((select reservation_id from reservation_items where id = 'e2900000-0000-4000-8000-000000000444'),
  'e2900000-0000-4000-8000-000000000331'::uuid, 'the other unit stays on the original');

insert into result select 'spread', departure_id from split_reservation(pg_temp.split_payload('[
  {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000445", "quantity": 1}]},
  {"people_count": 1, "time": "11:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000445", "quantity": 2}]}
]'::jsonb, 'e2900000-0000-4000-8000-000000000332'));
select is((select count(*)::integer from reservation_items where id = 'e2900000-0000-4000-8000-000000000445' and reservation_id in
  (select departure_id from result where step = 'spread')), 1, 'a quantity item whose every piece is given away ends in a departure');
select is((select sum(quantity)::integer from reservation_items where category_id = 'e2900000-0000-4000-8000-000000000102'
  and reservation_id in (select departure_id from result where step = 'spread')), 3, 'every piece of the item is conserved across the departures');
select is((select reservation_id from reservation_items where id = 'e2900000-0000-4000-8000-000000000446'),
  'e2900000-0000-4000-8000-000000000332'::uuid, 'the original keeps the unit that was not given');

insert into result select 'night', departure_id from split_reservation(pg_temp.split_payload('[
  {"people_count": 1, "time": "23:45", "items": [{"item_id": "e2900000-0000-4000-8000-000000000447", "quantity": 1}]},
  {"people_count": 1, "time": "00:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000447", "quantity": 1}]}
]'::jsonb, 'e2900000-0000-4000-8000-000000000333'));
select is((select min(starts_at) from reservations r join result on result.departure_id = r.id where result.step = 'night'),
  '2035-06-02 06:00:00+00'::timestamptz, 'midnight stays on the original Costa Rica date, not the UTC date');
select is((select max(ends_at) from reservations r join result on result.departure_id = r.id where result.step = 'night'),
  '2035-06-04 06:45:00+00'::timestamptz, 'a duration that crosses a day is kept whole');

insert into result select 'early', departure_id from split_reservation(pg_temp.split_payload('[
  {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000448", "quantity": 1}]}
]'::jsonb, 'e2900000-0000-4000-8000-000000000334'));
select is((select starts_at from reservations where id = (select departure_id from result where step = 'early')),
  '2035-06-04 16:00:00+00'::timestamptz, 'an original just after midnight in Costa Rica keeps its local date');

reset role;
select * from finish();
rollback;
