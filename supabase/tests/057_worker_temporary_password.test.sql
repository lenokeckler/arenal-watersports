begin;
select plan(11);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'rosa@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', null, false),
  ('44444444-4444-4444-4444-444444444444', 'rosa', 'Rosa Reservas', 'reservas', 'rosa@correo.cr', false);

insert into auth.sessions (id, user_id, created_at) values
  ('cccccccc-0000-0000-0000-000000000033', '33333333-3333-3333-3333-333333333333', now());

select ok(
  not has_function_privilege('anon', 'public.prepare_worker_temporary_password(uuid)', 'execute'),
  'anon no prepara contrasenas temporales'
);
select is(
  (select p.proconfig from pg_proc p where p.proname = 'prepare_worker_temporary_password'),
  array['search_path=""'],
  'la funcion fija el search_path vacio'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(public.prepare_worker_temporary_password('44444444-4444-4444-4444-444444444444'), 'not_allowed', 'nadie mas que administracion entrega contrasenas temporales');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.prepare_worker_temporary_password('44444444-4444-4444-4444-444444444444'), 'has_personal_email', 'quien tiene correo personal recupera con el PIN');
select is(public.prepare_worker_temporary_password('11111111-1111-1111-1111-111111111111'), 'admin_account', 'la cuenta de administracion no recibe contrasena temporal');
select is(public.prepare_worker_temporary_password('99999999-9999-9999-9999-999999999999'), 'not_found', 'una cuenta inexistente no recibe contrasena temporal');
select is(public.prepare_worker_temporary_password('33333333-3333-3333-3333-333333333333'), 'ready', 'quien no tiene correo personal recibe una contrasena temporal');

reset role;
select ok(
  (select must_change_password from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'la contrasena temporal obliga a cambiarla al entrar'
);
select is(
  (select count(*) from auth.sessions where user_id = '33333333-3333-3333-3333-333333333333'),
  0::bigint,
  'las sesiones abiertas con la clave anterior se cierran'
);
select ok(
  not (select must_change_password from public.workers where id = '44444444-4444-4444-4444-444444444444'),
  'una cuenta rechazada queda igual'
);

update public.workers set deleted_at = now(), status = 'blocked', blocked_reason = 'administration'
 where id = '33333333-3333-3333-3333-333333333333';
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.prepare_worker_temporary_password('33333333-3333-3333-3333-333333333333'), 'retired', 'una cuenta dada de baja solo se recontrata');

select * from finish();
rollback;
