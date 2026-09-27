begin;
select plan(31);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Kayak doble', 'by_quantity', true, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_categories
  (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000002', 'Lancha rapida', 'by_unit',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', 'LANCHA-1',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into combos (id, name, audience, package_price_usd, created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000001', 'Paquete kayak', 'foreign', 100,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 120,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select matches(
  (select code from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  '^R-[0-9]{6}$',
  'el codigo de reserva se genera con formato R-000000'
);

select is(
  (select ends_at from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  '2026-09-05 12:00:00+00'::timestamptz,
  'ends_at sale de starts_at mas la duracion'
);

select is(
  (select status from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  'scheduled'::reservation_status,
  'una reserva nueva queda en estado scheduled'
);

select is(
  (select extra_time_minutes from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  0,
  'extra_time_minutes arranca en cero'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000009', 'Pedro', 1, 'rental',
        '2026-09-06 09:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select isnt(
  (select code from reservations where id = 'dddddddd-0000-0000-0000-000000000009'),
  (select code from reservations where id = 'dddddddd-0000-0000-0000-000000000001'),
  'dos reservas reciben codigos distintos'
);

select lives_ok(
  $$ insert into reservations
       (id, customer_name, people_count, type, starts_at, duration_minutes, code,
        created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000010', 'Ana', 1, 'rental',
             '2026-09-07 09:00:00+00', 60, 'R-555555',
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'una reserva con codigo explicito valido se inserta bien'
);

select throws_ok(
  $$ insert into reservations
       (customer_name, people_count, type, starts_at, duration_minutes, code,
        created_by, updated_by)
     values ('Otro', 1, 'rental', '2026-09-08 09:00:00+00', 60, 'R-555555',
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  '23505', null,
  'el codigo de reserva no se repite'
);

select throws_ok(
  $$ insert into reservations
       (customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
     values ('Sin gente', 0, 'rental', '2026-09-09 09:00:00+00', 60,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'people_count exige un valor positivo'
);

select throws_ok(
  $$ insert into reservations
       (customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
     values ('Sin duracion', 1, 'rental', '2026-09-09 09:00:00+00', 0,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'duration_minutes exige un valor positivo'
);

select throws_ok(
  $$ insert into reservations
       (customer_name, people_count, type, starts_at, duration_minutes, extra_time_minutes,
        created_by, updated_by)
     values ('Tiempo negativo', 1, 'rental', '2026-09-09 09:00:00+00', 60, -1,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'extra_time_minutes no acepta valores negativos'
);

select throws_ok(
  $$ insert into reservations
       (customer_name, people_count, type, combo_id, starts_at, duration_minutes,
        created_by, updated_by)
     values ('Combo mal puesto', 1, 'rental', 'cccccccc-0000-0000-0000-000000000001',
             '2026-09-09 09:00:00+00', 60,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una reserva que no es combo no puede llevar combo_id'
);

select lives_ok(
  $$ insert into reservations
       (customer_name, people_count, type, combo_id, starts_at, duration_minutes,
        created_by, updated_by)
     values ('Grupo combo', 4, 'combo', 'cccccccc-0000-0000-0000-000000000001',
             '2026-09-09 09:00:00+00', 60,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'una reserva de tipo combo con combo_id se inserta bien'
);

select throws_ok(
  $$ insert into reservations
       (id, customer_name, people_count, type, starts_at, duration_minutes,
        parent_reservation_id, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000099', 'Auto padre', 1, 'rental',
             '2026-09-09 09:00:00+00', 60, 'dddddddd-0000-0000-0000-000000000099',
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una reserva no puede apuntarse a si misma como padre'
);

select lives_ok(
  $$ insert into reservations
       (id, customer_name, people_count, type, starts_at, duration_minutes,
        parent_reservation_id, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000020', 'Hija sin cobro', 1, 'rental',
             '2026-09-10 09:00:00+00', 60,
             'dddddddd-0000-0000-0000-000000000001',
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'una reserva hija sin cobro propio se inserta bien'
);

select lives_ok(
  $$ insert into reservation_pricing
       (reservation_id, list_amount_usd, agreed_amount_usd, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000001', 120, 100,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'la reserva original lleva su precio en reservation_pricing'
);

select throws_ok(
  $$ insert into reservation_pricing
       (reservation_id, agreed_amount_usd, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000020', 50,
             '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111') $$,
  'P0001', null,
  'una reserva hija no puede llevar cobro propio'
);

select throws_ok(
  $$ update reservation_pricing
       set reservation_id = 'dddddddd-0000-0000-0000-000000000020'
     where reservation_id = 'dddddddd-0000-0000-0000-000000000001' $$,
  'P0001', null,
  'mover el precio a una reserva hija tambien se rechaza'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000021', 'Reserva efimera', 1, 'rental',
        '2026-09-11 09:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_pricing
  (reservation_id, agreed_amount_usd, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000021', 75,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
delete from reservations where id = 'dddddddd-0000-0000-0000-000000000021';

select is(
  (select count(*)::int from reservation_pricing
     where reservation_id = 'dddddddd-0000-0000-0000-000000000021'),
  0,
  'borrar la reserva se lleva su precio por cascade'
);

select throws_ok(
  $$ insert into reservation_items
       (reservation_id, category_id, quantity, unit_id, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001', 2,
             gen_random_uuid(),
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un item no puede ser unidad y cantidad a la vez'
);

select throws_ok(
  $$ insert into reservation_items
       (reservation_id, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000001',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un item no puede quedar sin unidad y sin categoria/cantidad'
);

select lives_ok(
  $$ insert into reservation_items
       (reservation_id, unit_id, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000001',
             'bbbbbbbb-0000-0000-0000-000000000001',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'un item por unidad concreta es valido'
);

select lives_ok(
  $$ insert into reservation_items
       (reservation_id, category_id, quantity, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001', 2,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'un item por cantidad es valido'
);

select throws_ok(
  $$ insert into reservation_items
       (reservation_id, category_id, quantity, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001', 0,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'la cantidad de un item por categoria exige un valor positivo'
);

select lives_ok(
  $$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
     values ('dddddddd-0000-0000-0000-000000000001',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'asignar un guia a una reserva es valido'
);

select ok(
  (select assigned_at is not null from reservation_guides
     where reservation_id = 'dddddddd-0000-0000-0000-000000000001'
       and worker_id = '11111111-1111-1111-1111-111111111111'),
  'assigned_at se llena con el default'
);

select throws_ok(
  $$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
     values ('dddddddd-0000-0000-0000-000000000001',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23505', null,
  'un guia no se asigna dos veces a la misma reserva'
);

select throws_ok(
  $$ update reservations set status = 'cancelled'
     where id = 'dddddddd-0000-0000-0000-000000000001' $$,
  '23514', null,
  'cancelar sin motivo es rechazado'
);

select lives_ok(
  $$ update reservations set status = 'cancelled', cancellation_reason = 'Cliente no se presento'
     where id = 'dddddddd-0000-0000-0000-000000000001' $$,
  'cancelar con motivo se acepta'
);

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-0000000000f1', 'Horometro', 2, 'rental',
        '2026-09-05 10:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select throws_ok(
  $$ insert into reservation_items
       (reservation_id, unit_id, usage_out, usage_in, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-0000000000f1',
             'bbbbbbbb-0000-0000-0000-000000000001', 12.5, 11.0,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'cerrar con menos horas de las que salio es rechazado'
);

select lives_ok(
  $$ insert into reservation_items
       (reservation_id, unit_id, usage_out, usage_in, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-0000000000f1',
             'bbbbbbbb-0000-0000-0000-000000000001', 12.5, 12.5,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'cerrar con la misma lectura se acepta: una salida puede no mover el horometro'
);

select lives_ok(
  $$ insert into reservation_items
       (reservation_id, unit_id, usage_out, created_by, updated_by)
     values ('dddddddd-0000-0000-0000-0000000000f1',
             'bbbbbbbb-0000-0000-0000-000000000001', 30.0,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'una salida despachada y sin cerrar, con lectura de salida y sin la de regreso, se acepta'
);

select * from finish();
rollback;
