begin;
select plan(29);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Jet Ski', 'by_unit', true, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into equipment_categories (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 'Chaleco', 'by_quantity',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-01',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes,
   status, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Vieja', 2, 'rental',
   now() - interval '6 years', 60, 'closed',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (id, reservation_id, unit_id, created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
        'bbbbbbbb-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_guides (reservation_id, worker_id, assigned_by)
values ('dddddddd-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111');

insert into reservation_charges
  (reservation_id, kind, amount, currency, payment_method, created_by)
values ('dddddddd-0000-0000-0000-000000000001', 'tariff', 120, 'USD', 'Efectivo',
        '11111111-1111-1111-1111-111111111111');

insert into refunds (reservation_id, amount, currency, reason, created_by)
values ('dddddddd-0000-0000-0000-000000000001', 60, 'USD',
        'Cliente cancelo por mal clima', '11111111-1111-1111-1111-111111111111');

insert into deposits (reservation_id, amount, currency, created_by)
values ('dddddddd-0000-0000-0000-000000000001', 200, 'USD',
        '11111111-1111-1111-1111-111111111111');

insert into damage_reports (id, unit_id, reservation_id, cause, description, created_by)
values ('eeeeeeee-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
        'dddddddd-0000-0000-0000-000000000001', 'collision', 'Golpe contra el muelle',
        '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes,
   status, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000002', 'Reciente', 2, 'rental',
   now() - interval '1 year', 60, 'closed',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (id, reservation_id, unit_id, created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000002', 'dddddddd-0000-0000-0000-000000000002',
        'bbbbbbbb-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_guides (reservation_id, worker_id, assigned_by)
values ('dddddddd-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111');

insert into reservation_charges
  (reservation_id, kind, amount, currency, payment_method, created_by)
values ('dddddddd-0000-0000-0000-000000000002', 'tariff', 120, 'USD', 'Efectivo',
        '11111111-1111-1111-1111-111111111111');

insert into refunds (reservation_id, amount, currency, reason, created_by)
values ('dddddddd-0000-0000-0000-000000000002', 60, 'USD',
        'Cliente cancelo por mal clima', '11111111-1111-1111-1111-111111111111');

insert into deposits (reservation_id, amount, currency, created_by)
values ('dddddddd-0000-0000-0000-000000000002', 200, 'USD',
        '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes,
   status, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000003', 'Madre partida', 4, 'rental',
   now() - interval '6 years', 60, 'closed',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes,
   status, parent_reservation_id, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000004', 'Hija partida', 2, 'rental',
   now() - interval '6 months', 60, 'closed',
   'dddddddd-0000-0000-0000-000000000003',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes,
   status, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000005', 'Programada vieja', 2, 'rental',
   now() - interval '6 years', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes,
   status, dispatched_at, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000006', 'Despachada vieja', 2, 'rental',
   now() - interval '6 years', 60, 'dispatched', now() - interval '6 years',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes,
   status, cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000007', 'Cancelada vieja', 2, 'rental',
   now() - interval '6 years', 60, 'cancelled', 'Cliente no llego',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into inventory_counts (id, counted_at, created_by)
values ('ffffffff-0000-0000-0000-000000000001', now() - interval '2 years',
        '11111111-1111-1111-1111-111111111111');
insert into inventory_count_lines
  (id, count_id, category_id, quantity_available, quantity_damaged, quantity_in_repair)
values ('99999999-0000-0000-0000-000000000001', 'ffffffff-0000-0000-0000-000000000001',
        'aaaaaaaa-0000-0000-0000-000000000002', 5, 1, 0);

insert into inventory_counts (id, counted_at, created_by)
values ('ffffffff-0000-0000-0000-000000000002', now() - interval '3 months',
        '11111111-1111-1111-1111-111111111111');
insert into inventory_count_lines
  (id, count_id, category_id, quantity_available, quantity_damaged, quantity_in_repair)
values ('99999999-0000-0000-0000-000000000002', 'ffffffff-0000-0000-0000-000000000002',
        'aaaaaaaa-0000-0000-0000-000000000002', 6, 0, 1);

select is(
  (select count(*)::int
   from pg_publication_tables
   where pubname = 'supabase_realtime'
     and tablename in ('reservations', 'reservation_items',
                       'equipment_units', 'equipment_stock')),
  4,
  'las cuatro tablas del tablero estan publicadas en tiempo real'
);

select is(
  (select count(*)::int
   from pg_publication_tables
   where pubname = 'supabase_realtime'
     and tablename = 'reservation_charges'),
  0,
  'una tabla de dinero no esta publicada en tiempo real'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select throws_ok(
  $$ select purge_expired_history() $$,
  '42501',
  null,
  'authenticated no puede ni siquiera invocar la purga'
);

reset role;

set local role anon;

select throws_ok(
  $$ select purge_expired_history() $$,
  '42501',
  null,
  'anon, sin autenticar, tampoco puede invocar la purga'
);

reset role;

set local role service_role;

select lives_ok(
  $$ select purge_expired_history() $$,
  'service_role si puede invocar la purga y esta corre sin error'
);

reset role;

select is(
  (select count(*)::int from reservations
   where id = 'dddddddd-0000-0000-0000-000000000001'),
  0,
  'una reserva de mas de cinco anos sale del historial'
);

select is(
  (select count(*)::int from reservation_charges
   where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  0,
  'sus cobros salen con ella'
);

select is(
  (select count(*)::int from refunds
   where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  0,
  'sus reembolsos salen con ella'
);

select is(
  (select count(*)::int from deposits
   where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  0,
  'sus depositos salen con ella'
);

select is(
  (select count(*)::int from reservation_items
   where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  0,
  'sus items salen con ella'
);

select is(
  (select count(*)::int from reservation_guides
   where reservation_id = 'dddddddd-0000-0000-0000-000000000001'),
  0,
  'sus guias salen con ella'
);

select is(
  (select count(*)::int from reservations
   where id = 'dddddddd-0000-0000-0000-000000000002'),
  1,
  'una reserva dentro del plazo se conserva'
);

select is(
  (select count(*)::int from reservation_charges
   where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
  1,
  'sus cobros se conservan'
);

select is(
  (select count(*)::int from refunds
   where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
  1,
  'sus reembolsos se conservan'
);

select is(
  (select count(*)::int from deposits
   where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
  1,
  'sus depositos se conservan'
);

select is(
  (select count(*)::int from reservation_items
   where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
  1,
  'sus items se conservan'
);

select is(
  (select count(*)::int from reservation_guides
   where reservation_id = 'dddddddd-0000-0000-0000-000000000002'),
  1,
  'sus guias se conservan'
);

select is(
  (select count(*)::int from damage_reports
   where id = 'eeeeeeee-0000-0000-0000-000000000001'),
  1,
  'el reporte de dano de una reserva expirada sigue existiendo'
);

select is(
  (select reservation_id from damage_reports
   where id = 'eeeeeeee-0000-0000-0000-000000000001'),
  null::uuid,
  'su reservation_id queda en null en vez de arrastrarlo al borrado'
);

select is(
  (select count(*)::int from reservations
   where id = 'dddddddd-0000-0000-0000-000000000003'),
  0,
  'la madre de una reserva partida sale cuando expira'
);

select is(
  (select count(*)::int from reservations
   where id = 'dddddddd-0000-0000-0000-000000000004'),
  1,
  'la hija dentro del plazo sobrevive a su madre'
);

select is(
  (select parent_reservation_id from reservations
   where id = 'dddddddd-0000-0000-0000-000000000004'),
  null::uuid,
  'el puntero a la madre se limpia en vez de dejarlo colgado'
);

select is(
  (select count(*)::int from reservations
   where id = 'dddddddd-0000-0000-0000-000000000005'),
  1,
  'una reserva scheduled vieja sobrevive: no es historial'
);

select is(
  (select count(*)::int from reservations
   where id = 'dddddddd-0000-0000-0000-000000000006'),
  1,
  'una reserva dispatched vieja sobrevive: no es historial'
);

select is(
  (select count(*)::int from reservations
   where id = 'dddddddd-0000-0000-0000-000000000007'),
  0,
  'una reserva cancelled vieja tambien se purga: cancelled si es historial'
);

select is(
  (select count(*)::int from inventory_counts
   where id = 'ffffffff-0000-0000-0000-000000000001'),
  0,
  'un conteo de mas de un ano se purga'
);

select is(
  (select count(*)::int from inventory_count_lines
   where id = '99999999-0000-0000-0000-000000000001'),
  0,
  'sus lineas caen solas por la cascada'
);

select is(
  (select count(*)::int from inventory_counts
   where id = 'ffffffff-0000-0000-0000-000000000002'),
  1,
  'un conteo reciente se conserva'
);

select is(
  (select count(*)::int from inventory_count_lines
   where id = '99999999-0000-0000-0000-000000000002'),
  1,
  'sus lineas se conservan con el'
);

select * from finish();
rollback;
