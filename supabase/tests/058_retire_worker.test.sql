begin;
select plan(13);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, national_id, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', null, false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', 'celso@correo.cr', '1-2345-6789', false);

insert into public.worker_areas (worker_id, area, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'reservas', '11111111-1111-1111-1111-111111111111');
insert into public.worker_marks (worker_id, mark, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'guia', '11111111-1111-1111-1111-111111111111');
insert into public.password_reset_pins (worker_id, pin_hash, expires_at) values
  ('33333333-3333-3333-3333-333333333333', 'hash', now() + interval '10 minutes');
insert into auth.sessions (id, user_id, created_at) values
  ('cccccccc-0000-0000-0000-000000000033', '33333333-3333-3333-3333-333333333333', now());

select ok(
  not has_function_privilege('anon', 'public.retire_worker(uuid)', 'execute'),
  'anon no da de baja'
);
select is(
  (select p.proconfig from pg_proc p where p.proname = 'retire_worker'),
  array['search_path=""'],
  'la funcion fija el search_path vacio'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(public.retire_worker('33333333-3333-3333-3333-333333333333'), 'not_allowed', 'nadie mas que administracion da de baja');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.retire_worker('11111111-1111-1111-1111-111111111111'), 'admin_account', 'la cuenta de administracion no se da de baja');
select is(public.retire_worker('99999999-9999-9999-9999-999999999999'), 'not_found', 'una cuenta inexistente no se da de baja');
select is(public.retire_worker('33333333-3333-3333-3333-333333333333'), 'retired', 'administracion da de baja la cuenta de quien sale');
select is(public.retire_worker('33333333-3333-3333-3333-333333333333'), 'retired', 'dar de baja dos veces no falla');

reset role;
select ok(
  (select deleted_at is not null and status = 'blocked' and blocked_reason = 'administration'
     from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'la cuenta queda bloqueada y marcada como ex trabajador, no borrada'
);
select is(
  (select username || '/' || personal_email || '/' || national_id from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'celso/celso@correo.cr/1-2345-6789',
  'se conservan el usuario, el correo y la cedula'
);
select is(
  (select count(*) from public.worker_areas where worker_id = '33333333-3333-3333-3333-333333333333')
    + (select count(*) from public.worker_marks where worker_id = '33333333-3333-3333-3333-333333333333'),
  3::bigint,
  'se conservan las areas y las marcas'
);
select is(
  (select count(*) from auth.sessions where user_id = '33333333-3333-3333-3333-333333333333'),
  0::bigint,
  'las sesiones abiertas de esa persona se cierran en el momento'
);
select is(
  (select count(*) from public.password_reset_pins where worker_id = '33333333-3333-3333-3333-333333333333' and used_at is null),
  0::bigint,
  'se anula cualquier PIN de recuperacion pendiente'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.unlock_worker('33333333-3333-3333-3333-333333333333'), 'retired', 'una cuenta dada de baja no se desbloquea: solo se recontrata');

select * from finish();
rollback;
