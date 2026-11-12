begin;
select plan(14);
\ir fixtures/split_reservation.sql.fixture

update reservations set type = 'tour' where id = 'e2900000-0000-4000-8000-000000000301';
insert into reservation_guides (reservation_id, worker_id, assigned_by)
values ('e2900000-0000-4000-8000-000000000301', 'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000308', 'RES19 Spread', 5, 'rental', '2035-04-20 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000309', 'RES19 Whole', 3, 'rental', '2035-04-21 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservation_items (id, reservation_id, category_id, quantity, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000411', 'e2900000-0000-4000-8000-000000000308', 'e2900000-0000-4000-8000-000000000102', 4,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000412', 'e2900000-0000-4000-8000-000000000309', 'e2900000-0000-4000-8000-000000000102', 2,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000413', 'e2900000-0000-4000-8000-000000000309', 'e2900000-0000-4000-8000-000000000102', 1,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
\ir fixtures/split_payload.sql.fixture
create temp table result (step text, departure_id uuid);
grant all on result to authenticated;

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

insert into result select 'quantity', departure_id from split_reservation(pg_temp.split_payload($j$[
  {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}
]$j$::jsonb));

select is((select quantity from reservation_items where id = 'e2900000-0000-4000-8000-000000000402'), 2, 'a divided quantity item keeps the rest on the original');
select is((select quantity from reservation_items i join result r on r.departure_id = i.reservation_id where r.step = 'quantity'), 1, 'the departure gets the quantity it was given');
select is((select sum(quantity)::integer from reservation_items where category_id = 'e2900000-0000-4000-8000-000000000102' and reservation_id in
  ('e2900000-0000-4000-8000-000000000301', (select departure_id from result where step = 'quantity'))), 3, 'the divided quantity is conserved');

insert into result select 'mixed', departure_id from split_reservation(pg_temp.split_payload($j$[
  {"people_count": 1, "time": "11:00", "items": [
    {"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1},
    {"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}
]$j$::jsonb));

select is((select reservation_id from reservation_items where id = 'e2900000-0000-4000-8000-000000000401'),
  (select departure_id from result where step = 'mixed'), 'a unit moves by updating its own row');
select is((select count(*)::integer from reservation_items where reservation_id = (select departure_id from result where step = 'mixed')), 2,
  'a departure can mix unit and quantity equipment');
select is((select quantity from reservation_items where id = 'e2900000-0000-4000-8000-000000000402'), 1, 'the original keeps one piece of the divided item');
select is((select count(*)::integer from reservation_items where id = 'e2900000-0000-4000-8000-000000000403' and reservation_id = 'e2900000-0000-4000-8000-000000000301'),
  1, 'extras stay on the original');
select is((select count(*)::integer from reservation_guides where reservation_id = 'e2900000-0000-4000-8000-000000000301'), 1, 'guides stay on the original');
select is((select people_count from reservations where id = 'e2900000-0000-4000-8000-000000000301'), 2, 'the original keeps the people not moved');

insert into result select 'spread', departure_id from split_reservation(pg_temp.split_payload($j$[
  {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000411", "quantity": 1}]},
  {"people_count": 1, "time": "11:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000411", "quantity": 1}]}
]$j$::jsonb, 'e2900000-0000-4000-8000-000000000308'));

select is((select quantity from reservation_items where id = 'e2900000-0000-4000-8000-000000000411'), 2, 'the original keeps what the departures left');
select is((select sum(quantity)::integer from reservation_items where reservation_id in
  (select departure_id from result where step = 'spread' union select 'e2900000-0000-4000-8000-000000000308')), 4, 'a spread quantity is conserved across the original and two departures');
select is((select min(pieces)::integer from (select count(*) pieces from reservation_items i join result r on r.departure_id = i.reservation_id
  where r.step = 'spread' group by i.reservation_id) per_departure), 1, 'every departure ends with equipment');

insert into result select 'whole', departure_id from split_reservation(pg_temp.split_payload($j$[
  {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000412", "quantity": 2}]}
]$j$::jsonb, 'e2900000-0000-4000-8000-000000000309'));

select is((select reservation_id from reservation_items where id = 'e2900000-0000-4000-8000-000000000412'),
  (select departure_id from result where step = 'whole'), 'a quantity item moved whole moves its row');
select is((select reservation_id from reservation_items where id = 'e2900000-0000-4000-8000-000000000413'),
  'e2900000-0000-4000-8000-000000000309'::uuid, 'the item left alone stays on the original');

reset role;
select * from finish();
rollback;
