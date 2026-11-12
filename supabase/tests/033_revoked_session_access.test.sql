begin;
select plan(14);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas');

insert into worker_marks (worker_id, mark, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'registro_guias_externos',
   '11111111-1111-1111-1111-111111111111');

insert into auth.sessions (id, user_id, not_after) values
  ('aaaaaaaa-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', null),
  ('aaaaaaaa-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', now() - interval '1 minute'),
  ('aaaaaaaa-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', now() + interval '1 hour');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select ok(
  not has_function_privilege('authenticated', 'public.session_is_live()', 'execute'),
  'authenticated no ejecuta session_is_live directamente'
);
select ok(
  not has_function_privilege('anon', 'public.session_is_live()', 'execute'),
  'anon no ejecuta session_is_live directamente'
);

update auth.sessions set created_at = now() where created_at is null;

set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"aaaaaaaa-0000-0000-0000-000000000001"}';
select ok(has_area('reservas'), 'una sesion viva conserva el area');
select ok(has_mark('registro_guias_externos'), 'una sesion viva conserva la marca');
select is(
  (select count(*) from reservations), 1::bigint,
  'una sesion viva lee reservas por la API'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","session_id":"aaaaaaaa-0000-0000-0000-000000000003"}';
select ok(is_admin(), 'una sesion viva con vencimiento futuro conserva administracion');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"aaaaaaaa-0000-0000-0000-000000000099"}';
select ok(not has_area('reservas'), 'una sesion revocada pierde el area');
select ok(not has_mark('registro_guias_externos'), 'una sesion revocada pierde la marca');
select is(
  (select count(*) from reservations), 0::bigint,
  'una sesion revocada no lee reservas por la API'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","session_id":"aaaaaaaa-0000-0000-0000-000000000099"}';
select ok(not is_admin(), 'una sesion revocada pierde administracion');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"aaaaaaaa-0000-0000-0000-000000000002"}';
select ok(not has_area('reservas'), 'una sesion vencida pierde el area');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"aaaaaaaa-0000-0000-0000-000000000001","must_change_password":true}';
select ok(not has_area('reservas'), 'una cuenta pendiente con sesion viva sigue sin area');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(has_area('reservas'), 'sin el reclamo de sesion conserva el area');

reset role;
set local request.jwt.claims to '';
set local role service_role;
select is(
  (select count(*) from reservations), 1::bigint,
  'service_role sigue leyendo reservas'
);

select * from finish();
rollback;
