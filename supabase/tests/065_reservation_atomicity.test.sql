begin;
select plan(11);

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
    'RES04 Fixture María López', 3, '2028-02-29', '09:30', 90,
    'e2400000-0000-4000-8000-000000000101', 2
  ) $$,
  'el formulario registra una renta con categoria por cantidad'
);
select is(
  (select count(*)::integer from reservations where customer_name = 'RES04 Fixture María López'),
  1,
  'se crea una reserva'
);
select is(
  (select type from reservations where customer_name = 'RES04 Fixture María López'),
  'rental'::reservation_type,
  'la reserva queda como renta'
);
select is(
  (select status from reservations where customer_name = 'RES04 Fixture María López'),
  'scheduled'::reservation_status,
  'la reserva queda programada'
);
select is(
  (select starts_at from reservations where customer_name = 'RES04 Fixture María López'),
  '2028-02-29 15:30:00+00'::timestamptz,
  'la fecha y hora civil se convierten desde la zona de Costa Rica'
);
select is(
  (select created_by from reservations where customer_name = 'RES04 Fixture María López'),
  'e2400000-0000-4000-8000-000000000002'::uuid,
  'la persona creadora viene de la sesion autenticada'
);
select is(
  (select updated_by from reservations where customer_name = 'RES04 Fixture María López'),
  'e2400000-0000-4000-8000-000000000002'::uuid,
  'la persona actualizadora inicial viene de la sesion autenticada'
);
select is(
  (select count(*)::integer from reservation_items ri
   join reservations r on r.id = ri.reservation_id
   where r.customer_name = 'RES04 Fixture María López' and ri.category_id = 'e2400000-0000-4000-8000-000000000101'
     and ri.quantity = 2),
  1,
  'se guarda un item de categoria y cantidad'
);
reset role;
set local request.jwt.claims to '{}';
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Sin sesion', 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  'P0001', null,
  'no se registra una reserva sin identidad autenticada'
);
reset role;
revoke insert on reservation_items from authenticated;
set local role authenticated;
set local request.jwt.claims to '{"sub":"e2400000-0000-4000-8000-000000000002","role":"authenticated"}';
select throws_ok(
  $$ select create_rental_reservation(
    'RES04 Fixture Falla item', 1, '2028-02-29', '09:30', 60,
    'e2400000-0000-4000-8000-000000000101', 1
  ) $$,
  '42501', null,
  'falla el segundo insert cuando authenticated no puede insertar items'
);
reset role;
grant insert on reservation_items to authenticated;
select is(
  (select count(*)::integer from reservations where customer_name = 'RES04 Fixture Falla item'),
  0,
  'el fallo del item revierte la reserva creada en la misma llamada'
);
set local request.jwt.claims to '{}';
select * from finish();
rollback;
