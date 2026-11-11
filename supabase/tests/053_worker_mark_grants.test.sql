begin;
select plan(19);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'reservas@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'otro@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'guia@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('22222222-2222-2222-2222-222222222222', 'rosa', 'Rosa Reservas', 'reservas', null, false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', null, false),
  ('44444444-4444-4444-4444-444444444444', 'otro', 'Otro Operador', 'operaciones', null, false);

insert into public.workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at, must_change_password) values
  ('55555555-5555-5555-5555-555555555555', 'guia', 'Guia Externo', 'operaciones', true, '1-1111-1111', now() + interval '2 days', false);

select ok(
  not has_function_privilege('anon', 'public.grant_worker_mark(uuid, public.worker_mark)', 'execute')
    and not has_function_privilege('anon', 'public.revoke_worker_mark(uuid, public.worker_mark)', 'execute'),
  'anon no pone ni quita marcas'
);
select ok(
  (select bool_and(p.prosecdef) from pg_proc p where p.proname in ('grant_worker_mark', 'revoke_worker_mark')),
  'las dos funciones son security definer'
);
select is(
  (select array_agg(distinct p.proconfig[1]) from pg_proc p where p.proname in ('grant_worker_mark', 'revoke_worker_mark')),
  array['search_path=""'],
  'las dos funciones fijan el search_path vacio'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(public.grant_worker_mark('33333333-3333-3333-3333-333333333333', 'guia'), 'granted', 'administracion marca como guia a quien despacha en la manana');
select is(public.grant_worker_mark('33333333-3333-3333-3333-333333333333', 'guia'), 'granted', 'marcar dos veces no falla');
select is(public.grant_worker_mark('33333333-3333-3333-3333-333333333333', 'registro_guias_externos'), 'mark_not_grantable', 'la marca de registro de guias externos no se pone aqui');
select is(public.grant_worker_mark('55555555-5555-5555-5555-555555555555', 'guia'), 'external_guide', 'un guia externo no recibe marcas');
select is(public.grant_worker_mark('99999999-9999-9999-9999-999999999999', 'guia'), 'not_found', 'una cuenta inexistente no recibe marcas');

reset role;
select is(
  (select base_role::text from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'operaciones',
  'la marca no cambia el rol de la cuenta'
);
select is(
  (select count(*) from public.worker_areas where worker_id = '33333333-3333-3333-3333-333333333333'),
  1::bigint,
  'la marca no suma areas'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  (select array_agg(username order by username) from public.workers where id <> auth.uid()),
  array['celso'],
  'al asignar un tour solo aparecen los trabajadores marcados como guia'
);
select is(public.grant_worker_mark('44444444-4444-4444-4444-444444444444', 'guia'), 'not_allowed', 'nadie mas que administracion pone marcas');
select is(public.revoke_worker_mark('33333333-3333-3333-3333-333333333333', 'guia'), 'not_allowed', 'nadie mas que administracion quita marcas');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(public.has_mark('guia'), 'la persona marcada tiene la marca de guia');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.revoke_worker_mark('33333333-3333-3333-3333-333333333333', 'guia'), 'revoked', 'administracion quita la marca de guia');
select is(public.revoke_worker_mark('33333333-3333-3333-3333-333333333333', 'guia'), 'revoked', 'quitar dos veces no falla');
select is(public.revoke_worker_mark('99999999-9999-9999-9999-999999999999', 'guia'), 'not_found', 'una cuenta inexistente no pierde marcas');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(not public.has_mark('guia'), 'al quitar la marca se pierde de inmediato');

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  (select count(*) from public.workers where id <> auth.uid()),
  0::bigint,
  'sin la marca deja de aparecer en la lista de guias'
);

select * from finish();
rollback;
