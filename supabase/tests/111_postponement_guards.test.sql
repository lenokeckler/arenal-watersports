begin;
select plan(14);

insert into auth.users (id, email)
values ('e3000000-0000-4000-8000-000000000001', 'res20-reservas@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role)
values ('e3000000-0000-4000-8000-000000000001', 'res20-reservas', 'RES20 Reservas', 'res20-reservas@correo.com', 'reservas');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('e3000000-0000-4000-8000-000000000301', 'RES20 Scheduled', 2, 'rental', '2035-04-12 15:00:00+00', 60, 'scheduled',
   'e3000000-0000-4000-8000-000000000001', 'e3000000-0000-4000-8000-000000000001'),
  ('e3000000-0000-4000-8000-000000000302', 'RES20 Dispatched', 2, 'rental', '2035-04-13 15:00:00+00', 60, 'scheduled',
   'e3000000-0000-4000-8000-000000000001', 'e3000000-0000-4000-8000-000000000001'),
  ('e3000000-0000-4000-8000-000000000303', 'RES20 Closed', 2, 'rental', '2035-04-14 15:00:00+00', 60, 'scheduled',
   'e3000000-0000-4000-8000-000000000001', 'e3000000-0000-4000-8000-000000000001'),
  ('e3000000-0000-4000-8000-000000000304', 'RES20 Cancelled', 2, 'rental', '2035-04-15 15:00:00+00', 60, 'scheduled',
   'e3000000-0000-4000-8000-000000000001', 'e3000000-0000-4000-8000-000000000001');

update reservations
   set status = 'dispatched', dispatched_at = starts_at
 where id = 'e3000000-0000-4000-8000-000000000302';
update reservations set status = 'closed' where id = 'e3000000-0000-4000-8000-000000000303';
update reservations
   set status = 'cancelled', cancellation_reason = 'RES20 reason'
 where id = 'e3000000-0000-4000-8000-000000000304';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3000000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000009999'), now(), 'storm') $$,
  'P0001', 'Reservation was not found',
  'an unknown reservation cannot be postponed'
);

select throws_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000303'),
       (select updated_at from reservations where id = 'e3000000-0000-4000-8000-000000000303'), 'storm') $$,
  'P0001', 'Only scheduled or dispatched reservations can be postponed',
  'a closed reservation cannot be postponed'
);

select throws_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000304'),
       (select updated_at from reservations where id = 'e3000000-0000-4000-8000-000000000304'), 'storm') $$,
  'P0001', 'Only scheduled or dispatched reservations can be postponed',
  'a cancelled reservation cannot be postponed'
);

select throws_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000303'), '2000-01-01 00:00:00+00', 'storm') $$,
  'P0001', 'Only scheduled or dispatched reservations can be postponed',
  'the status is checked before the token'
);

select throws_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000301'), '2000-01-01 00:00:00+00', 'storm') $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a stale token is refused'
);

select throws_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000301'), null, 'storm') $$,
  'P0001', 'Reservation changed since the form was loaded',
  'a missing token is stale'
);

select throws_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000301'),
       (select updated_at from reservations where id = 'e3000000-0000-4000-8000-000000000301'), null) $$,
  'P0001', 'A postponement cause is required',
  'a postponement needs a cause'
);

select throws_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000302'),
       (select updated_at from reservations where id = 'e3000000-0000-4000-8000-000000000302'), 'other') $$,
  'P0001', 'Dispatched reservations can only be postponed for weather',
  'a dispatched reservation is not postponed for the cause other'
);

select lives_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000302'),
       (select updated_at from reservations where id = 'e3000000-0000-4000-8000-000000000302'), 'heavy_rain') $$,
  'a dispatched reservation is postponed for weather'
);

select lives_ok(
  $$ select assert_reservation_postponable(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000301'),
       (select updated_at from reservations where id = 'e3000000-0000-4000-8000-000000000301'), 'other') $$,
  'a scheduled reservation is postponed for any cause'
);

select throws_ok(
  $$ select assert_postponement_start(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000301'), '2035-04-12 15:00:00+00') $$,
  'P0001', 'New start must be later than the current start and now',
  'the new start must differ from the current one'
);

select throws_ok(
  $$ select assert_postponement_start(
       (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000301'), now() - interval '1 day') $$,
  'P0001', 'New start must be later than the current start and now',
  'the new start cannot be in the past'
);

select throws_ok(
  $$ select assert_postponement_reason('other', '   ') $$,
  'P0001', 'Postponement reason is required',
  'the cause other needs a written reason'
);

select lives_ok(
  $$ select assert_postponement_reason('storm', null),
            assert_postponement_reason('other', 'Cliente enfermo'),
            assert_postponement_start(
              (select r from reservations r where r.id = 'e3000000-0000-4000-8000-000000000301'),
              '2035-04-13 15:00:00+00') $$,
  'a weather cause needs no reason and a later start passes'
);

reset role;

select * from finish();
rollback;
