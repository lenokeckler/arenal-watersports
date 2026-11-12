begin;
select plan(6);

insert into auth.users (id, email) values
  ('e3700000-0000-4000-8000-000000000001', 'calendar-reservations@arenal.local'),
  ('e3700000-0000-4000-8000-000000000002', 'calendar-operations@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3700000-0000-4000-8000-000000000001', 'calendar-reservations', 'Calendar Reservations', 'calendar-reservations@correo.com', 'reservas'),
  ('e3700000-0000-4000-8000-000000000002', 'calendar-operations', 'Calendar Operations', 'calendar-operations@correo.com', 'operaciones');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values ('e3700000-0000-4000-8000-000000000101', 'Calendar fixture', 'by_quantity', true, 60,
  'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('e3700000-0000-4000-8000-000000000201', 'Calendar fixture', 1, 'rental', '2028-01-01 15:00:00+00', 60,
  'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('e3700000-0000-4000-8000-000000000201', 'e3700000-0000-4000-8000-000000000101', 1, 'e3700000-0000-4000-8000-000000000001', 'e3700000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3700000-0000-4000-8000-000000000001","role":"authenticated"}';
select is((select count(*)::integer from reservations where id = 'e3700000-0000-4000-8000-000000000201'), 1,
  'Reservations can read calendar reservations');
select is((select count(*)::integer from reservation_items where reservation_id = 'e3700000-0000-4000-8000-000000000201'), 1,
  'Reservations can read calendar equipment');

set local request.jwt.claims to '{"sub":"e3700000-0000-4000-8000-000000000002","role":"authenticated"}';
select is((select count(*)::integer from reservations where id = 'e3700000-0000-4000-8000-000000000201'), 1,
  'Operations can read calendar reservations');
select is((select count(*)::integer from reservation_items where reservation_id = 'e3700000-0000-4000-8000-000000000201'), 1,
  'Operations can read calendar equipment');

reset role;
set local request.jwt.claims to '{}';
update workers set status = 'blocked', blocked_reason = 'administration' where id = 'e3700000-0000-4000-8000-000000000002';
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3700000-0000-4000-8000-000000000002","role":"authenticated"}';
select is((select count(*)::integer from reservations where id = 'e3700000-0000-4000-8000-000000000201'), 0,
  'A blocked account cannot read calendar reservations');

set local request.jwt.claims to '{"role":"authenticated"}';
select is((select count(*)::integer from reservations where id = 'e3700000-0000-4000-8000-000000000201'), 0,
  'A missing identity cannot read calendar reservations');

select * from finish();
rollback;
