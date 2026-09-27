begin;
select plan(7);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'diego@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas'),
  ('44444444-4444-4444-4444-444444444444', 'diego', 'Diego', 'operaciones');

delete from worker_areas
 where worker_id = '44444444-4444-4444-4444-444444444444' and area = 'operaciones';

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, dispatched_at,
   created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 120, 'dispatched', '2026-09-05 10:00:00+00',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select lives_ok(
  $$ insert into reservation_postponements
       (id, reservation_id, reason, previous_starts_at, new_starts_at)
     values ('eeeeeeee-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
             'Tormenta electrica', '2026-09-05 10:00:00+00', '2026-09-06 10:00:00+00') $$,
  'reservas registra el motivo de una posposicion'
);
select is(
  (select created_by from reservation_postponements
   where id = 'eeeeeeee-0000-0000-0000-000000000001'),
  '33333333-3333-3333-3333-333333333333'::uuid,
  'la base firma quien registro la posposicion, no el cliente'
);
select ok(
  (select created_at from reservation_postponements
   where id = 'eeeeeeee-0000-0000-0000-000000000001') is not null,
  'la posposicion queda marcada con cuando se registro'
);

select throws_ok(
  $$ insert into reservation_postponements
       (reservation_id, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', '2026-09-05 10:00:00+00', '2026-09-06 10:00:00+00') $$,
  '23502', null,
  'una posposicion sin motivo no se guarda'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from reservation_postponements),
  1,
  'operaciones si ve el historial de posposiciones de la reserva que despacha'
);
select throws_ok(
  $$ insert into reservation_postponements
       (reservation_id, reason, previous_starts_at, new_starts_at)
     values ('dddddddd-0000-0000-0000-000000000001', 'Otro motivo',
             '2026-09-06 10:00:00+00', '2026-09-07 10:00:00+00') $$,
  '42501', null,
  'operaciones no registra posposiciones: esa decision es de reservas'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select is(
  (select count(*)::int from reservation_postponements),
  0,
  'quien no tiene area asignada no ve el historial de posposiciones'
);

reset role;

select * from finish();
rollback;
