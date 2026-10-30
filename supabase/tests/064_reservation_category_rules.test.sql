begin;
select plan(8);

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

select lives_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture cantidad no intercambiable', 2, '2028-02-29', '11:00', 60,
    'e2400000-0000-4000-8000-000000000106', 1
  ) $$,
  'se acepta una categoria por cantidad sin unidades intercambiables'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Lancha no intercambiable', 2, '2028-02-29', '11:30', 60,
    'e2400000-0000-4000-8000-000000000102', 1
  ) $$,
  'P0001', null,
  'no se acepta una categoria por unidad no intercambiable'
);
select lives_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Kayak', 2, '2028-02-29', '10:00', 60,
    'e2400000-0000-4000-8000-000000000104', 1
  ) $$,
  'se acepta una categoria por unidad con unidades intercambiables'
);
select is(
  (select count(*)::integer from reservation_items ri
   join reservations r on r.id = ri.reservation_id
   where r.customer_name = 'RES04 Fixture Kayak'
     and ri.category_id = 'e2400000-0000-4000-8000-000000000104'
     and ri.quantity = 1 and ri.unit_id is null),
  1,
  'el kayak intercambiable se registra por categoria y cantidad sin asignar unidad'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Hora limite', 1, '2028-02-29', '24:00', 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se acepta la hora limite de veinticuatro horas'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Lancha fixture', 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000102', 1
  ) $$,
  'P0001', null,
  'no se acepta una categoria por unidad'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Tabla', 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000103', 1
  ) $$,
  'P0001', null,
  'no se acepta una categoria inactiva'
);
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture No reservable', 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000105', 1
  ) $$,
  'P0001', null,
  'no se acepta una categoria que no es reservable'
);
select * from finish();
rollback;
