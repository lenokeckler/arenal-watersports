begin;
select plan(19);
\ir fixtures/split_reservation.sql.fixture
\ir fixtures/split_payload.sql.fixture

insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
values ('e2900000-0000-4000-8000-000000000301', 'tariff', 50, 'USD', 'cash', 'e2900000-0000-4000-8000-000000000001');
insert into deposits (reservation_id, amount, currency, created_by)
values ('e2900000-0000-4000-8000-000000000301', 20, 'USD', 'e2900000-0000-4000-8000-000000000001');
create temp table result (departure_id uuid, departure_code text);
grant all on result to authenticated;

insert into auth.users (id, email) values
  ('e2900000-0000-4000-8000-000000000011', 'res19-operations@arenal.local'),
  ('e2900000-0000-4000-8000-000000000012', 'res19-admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role) values
  ('e2900000-0000-4000-8000-000000000011', 'res19-operations', 'RES19 Operations', 'res19-operations@correo.com', 'operaciones'),
  ('e2900000-0000-4000-8000-000000000012', 'res19-admin', 'RES19 Admin', 'res19-admin@correo.com', 'reservas');
delete from worker_areas where worker_id = 'e2900000-0000-4000-8000-000000000012';
insert into worker_areas (worker_id, area, granted_by)
values ('e2900000-0000-4000-8000-000000000012', 'administracion', 'e2900000-0000-4000-8000-000000000001');

set local role anon;
select throws_ok($$ select split_reservation('{}'::jsonb) $$, '42501', null, 'anon cannot execute the split');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000011","role":"authenticated"}';
select throws_ok($$ select split_reservation('{}'::jsonb) $$, 'P0001', 'Reservations access is required', 'an operations-only worker is refused');
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000012","role":"authenticated"}';
select throws_ok($$ select split_reservation('{}'::jsonb) $$, 'P0001', 'Reservations access is required', 'an administration-only worker is refused');

set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok($$ select split_reservation('[]'::jsonb) $$, 'P0001', 'Reservation payload must be an object', 'a non-object payload is refused');

insert into result
select * from split_reservation(pg_temp.split_payload($j$[
  {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000401", "quantity": 1}]},
  {"people_count": 2, "time": "23:30", "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}
]$j$::jsonb));

select is((select count(*)::integer from result), 2, 'one row is returned per new departure');
select is((select count(*)::integer from reservations r join result on result.departure_id = r.id and result.departure_code = r.code),
  2, 'the returned ids and codes belong to the new reservations');
select is((select count(distinct departure_code)::integer from result where departure_code <> (select code from reservations where id = 'e2900000-0000-4000-8000-000000000301')), 2, 'each departure has its own code');
select is((select parent_reservation_id from reservations where id = (select departure_id from result limit 1)),
  'e2900000-0000-4000-8000-000000000301'::uuid, 'a departure references the reservation it came from');
select is((select count(*)::integer from reservations r join result on result.departure_id = r.id
  where r.customer_name = 'RES19 Original' and r.type = 'rental' and r.combo_id is null and r.status = 'scheduled' and r.duration_minutes = 60),
  2, 'departures keep customer, type, duration and are scheduled');
select is((select people_count from reservations where id = 'e2900000-0000-4000-8000-000000000301'), 1, 'the original keeps the remaining people');
select is((select sum(people_count)::integer from reservations r join result on result.departure_id = r.id), 3, 'the departures carry the people moved');
select is((select starts_at from reservations where id = (select departure_id from result order by departure_code limit 1)),
  '2035-04-12 16:00:00+00'::timestamptz, 'the first departure starts at the payload time on the original Costa Rica date');
select is((select starts_at from reservations where id = (select departure_id from result order by departure_code desc limit 1)),
  '2035-04-13 05:30:00+00'::timestamptz, 'a 23:30 Costa Rica time lands on the next UTC day');
select is((select count(*)::integer from reservation_charges where reservation_id = 'e2900000-0000-4000-8000-000000000301' and kind = 'tariff' and amount = 50),
  1, 'the charge stays whole on the original');
select is((select count(*)::integer from reservation_charges c join result on result.departure_id = c.reservation_id), 0, 'the departures are born without a charge');
select is((select count(*)::integer from deposits where reservation_id = 'e2900000-0000-4000-8000-000000000301'), 1, 'the deposit stays on the original');
select is((select count(*)::integer from deposits d join result on result.departure_id = d.reservation_id), 0, 'the departures hold no deposit');
select is((select count(*)::integer from reservation_pricing p join result on result.departure_id = p.reservation_id), 0, 'the departures have no pricing row');
select is((select count(*)::integer from reservation_charges), 1, 'no charge was created by the split');

reset role;
select * from finish();
rollback;
