begin;
select plan(20);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'guia@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', null, false);

insert into public.workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at, must_change_password) values
  ('55555555-5555-5555-5555-555555555555', 'guia', 'Guia Externo', 'operaciones', true, '1-1111-1111', now() + interval '2 days', false);

select ok(
  not has_function_privilege('anon', 'public.grant_worker_area(uuid, public.work_area)', 'execute')
    and not has_function_privilege('anon', 'public.revoke_worker_area(uuid, public.work_area)', 'execute'),
  'anon no habilita ni quita areas'
);
select ok(
  (select bool_and(p.prosecdef) from pg_proc p where p.proname in ('grant_worker_area', 'revoke_worker_area')),
  'las dos funciones son security definer'
);
select is(
  (select array_agg(distinct p.proconfig[1]) from pg_proc p where p.proname in ('grant_worker_area', 'revoke_worker_area')),
  array['search_path=""'],
  'las dos funciones fijan el search_path vacio'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(public.grant_worker_area('33333333-3333-3333-3333-333333333333', 'reservas'), 'granted', 'administracion habilita reservas a quien despacha en la playa');
select is(public.grant_worker_area('33333333-3333-3333-3333-333333333333', 'reservas'), 'granted', 'habilitar dos veces no falla');
select is(public.grant_worker_area('33333333-3333-3333-3333-333333333333', 'administracion'), 'area_not_grantable', 'administracion no se habilita como area adicional');
select is(public.grant_worker_area('55555555-5555-5555-5555-555555555555', 'reservas'), 'external_guide', 'a un guia externo no se le habilitan areas');
select is(public.grant_worker_area('99999999-9999-9999-9999-999999999999', 'reservas'), 'not_found', 'una cuenta inexistente no recibe areas');
select is(public.grant_worker_area('11111111-1111-1111-1111-111111111111', 'operaciones'), 'granted', 'la cuenta de administracion tambien puede sumar un area');

reset role;
update public.workers set last_work_area = 'administracion' where id = '11111111-1111-1111-1111-111111111111';
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

reset role;
select is(
  (select granted_by from public.worker_areas where worker_id = '33333333-3333-3333-3333-333333333333' and area = 'reservas'),
  '11111111-1111-1111-1111-111111111111'::uuid,
  'el area habilitada queda a nombre de administracion'
);
select is(
  (select count(*) from public.worker_areas where worker_id = '33333333-3333-3333-3333-333333333333'),
  2::bigint,
  'la cuenta queda con su area base y la adicional, sin permisos sueltos'
);

set local role authenticated;
reset role;
update public.workers set last_work_area = 'reservas' where id = '33333333-3333-3333-3333-333333333333';
set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(public.has_area('reservas'), 'con el area habilitada y elegida la persona alcanza reservas');
select is(public.grant_worker_area('33333333-3333-3333-3333-333333333333', 'reservas'), 'not_allowed', 'nadie mas que administracion habilita areas');
select is(public.revoke_worker_area('33333333-3333-3333-3333-333333333333', 'reservas'), 'not_allowed', 'nadie mas que administracion quita areas');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.revoke_worker_area('33333333-3333-3333-3333-333333333333', 'operaciones'), 'base_area', 'el area base no se quita');
select is(public.revoke_worker_area('99999999-9999-9999-9999-999999999999', 'reservas'), 'not_found', 'una cuenta inexistente no pierde areas');
select is(public.revoke_worker_area('33333333-3333-3333-3333-333333333333', 'reservas'), 'revoked', 'administracion quita el area adicional');
select is(public.revoke_worker_area('33333333-3333-3333-3333-333333333333', 'reservas'), 'revoked', 'quitar dos veces no falla');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(not public.has_area('reservas'), 'al quitar el area el acceso se corta de inmediato');
select ok(public.has_area('operaciones'), 'el area base sigue intacta');

select * from finish();
rollback;
