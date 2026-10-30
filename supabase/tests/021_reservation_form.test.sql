begin;
select plan(10);

insert into auth.users (id, email) values
  ('e2400000-0000-4000-8000-000000000001', 'res04-admin-fixture@arenal.local'),
  ('e2400000-0000-4000-8000-000000000002', 'res04-reservations-fixture@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e2400000-0000-4000-8000-000000000001', 'res04-admin-fixture', 'Reservations admin fixture', 'res04-admin@correo.com', 'reservas'),
  ('e2400000-0000-4000-8000-000000000002', 'res04-reservations-fixture', 'Reservas fixture', 'res04-reservas@correo.com', 'reservas');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values
  ('e2400000-0000-4000-8000-000000000101', 'RES04 Chaleco fixture', 'active', 'by_quantity', true, true, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000102', 'RES04 Lancha fixture', 'active', 'by_unit', true, false, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000103', 'RES04 Tabla fixture', 'inactive', 'by_quantity', true, true, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000104', 'RES04 Kayak fixture', 'active', 'by_unit', true, true, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000105', 'RES04 No reservable fixture', 'active', 'by_quantity', false, true, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000106', 'RES04 Cantidad no intercambiable fixture', 'active', 'by_quantity', true, false, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2400000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select create_rental_reservation(
    '   ', 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta un nombre de cliente en blanco'
);
select throws_ok(
  $$ select create_rental_reservation(
    null, 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta un nombre de cliente nulo'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Personas nulas', null, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta una cantidad de personas nula'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Personas cero', 0, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta una cantidad de personas no positiva'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Fecha nula', 1, null, '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta una fecha nula'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Hora nula', 1, '2028-02-29', null, 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta una hora nula'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Duracion nula', 1, '2028-02-29', '09:30', null,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta una duracion nula'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Duracion cero', 1, '2028-02-29', '09:30', 0,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta una duracion no positiva'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Cantidad nula', 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', null
  ) $$,
  'P0001', null,
  'no se acepta una cantidad de equipo nula'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Cantidad cero', 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', 0
  ) $$,
  'P0001', null,
  'no se acepta una cantidad de equipo no positiva'
);
select * from finish();
rollback;
