begin;
select plan(19);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'rosa@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('22222222-2222-2222-2222-222222222222', 'rosa', 'Rosa Reservas', 'reservas', null, false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', null, false);

insert into public.worker_areas (worker_id, area, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'reservas', '11111111-1111-1111-1111-111111111111');

select ok(
  has_function_privilege('authenticated', 'public.choose_work_area(public.work_area)', 'execute')
    and has_function_privilege('authenticated', 'public.current_work_area()', 'execute'),
  'authenticated elige y consulta su modo'
);
select ok(
  not has_function_privilege('anon', 'public.choose_work_area(public.work_area)', 'execute')
    and not has_function_privilege('anon', 'public.current_work_area()', 'execute'),
  'anon no elige ni consulta modos'
);
select is(
  (select array_agg(distinct p.proconfig[1]) from pg_proc p where p.proname in ('choose_work_area', 'current_work_area')),
  array['search_path=""'],
  'las funciones de modo fijan el search_path vacio'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(public.current_work_area()::text, 'reservas', 'quien tiene una sola area entra directo en ella');
select ok(public.has_area('reservas'), 'con una sola area no hace falta elegir modo');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(public.current_work_area(), null, 'con dos areas y sin modo elegido no hay modo');
select ok(not public.has_area('operaciones') and not public.has_area('reservas'), 'sin modo elegido no alcanza ninguna area');
select is(public.choose_work_area('reservas'), 'chosen', 'elige el modo reservas');
select is(public.current_work_area()::text, 'reservas', 'el modo queda en reservas');
select ok(public.has_area('reservas'), 'en modo reservas alcanza reservas');
select ok(not public.has_area('operaciones'), 'en modo reservas no alcanza operaciones aunque la tenga habilitada');
select is(public.choose_work_area('operaciones'), 'chosen', 'cambia de modo sin cerrar sesion');
select ok(public.has_area('operaciones') and not public.has_area('reservas'), 'en modo operaciones solo alcanza operaciones');
select is(public.choose_work_area('administracion'), 'not_enabled', 'el modo nunca otorga un area que no tiene');
select ok(not public.has_area('administracion'), 'intentar un modo ajeno no le da esa area');

reset role;
select is(
  (select last_work_area::text from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'operaciones',
  'el ultimo modo usado queda guardado para la proxima entrada'
);
delete from public.worker_areas where worker_id = '33333333-3333-3333-3333-333333333333' and area = 'operaciones';
set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(public.current_work_area()::text, 'reservas', 'al quedar con una sola area entra directo en ella');
select ok(not public.has_area('operaciones'), 'el area quitada no vuelve por el modo guardado');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","must_change_password":true}';
select is(public.choose_work_area('reservas'), 'not_allowed', 'con la contrasena pendiente no se elige modo');

select * from finish();
rollback;
