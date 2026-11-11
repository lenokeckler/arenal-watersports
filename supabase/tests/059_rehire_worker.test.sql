begin;
select plan(10);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'rosa@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', 'celso@correo.cr', false),
  ('44444444-4444-4444-4444-444444444444', 'rosa', 'Rosa Reservas', 'reservas', null, false);

insert into public.worker_areas (worker_id, area, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'reservas', '11111111-1111-1111-1111-111111111111');
insert into public.worker_marks (worker_id, mark, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'guia', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.retire_worker('33333333-3333-3333-3333-333333333333'), 'retired', 'la persona sale de temporada');

select ok(
  not has_function_privilege('anon', 'public.rehire_worker(uuid)', 'execute'),
  'anon no recontrata'
);
select is(public.rehire_worker('44444444-4444-4444-4444-444444444444'), 'not_retired', 'solo se recontrata una cuenta dada de baja');
select is(public.rehire_worker('99999999-9999-9999-9999-999999999999'), 'not_found', 'una cuenta inexistente no se recontrata');

set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';
select is(public.rehire_worker('33333333-3333-3333-3333-333333333333'), 'not_allowed', 'nadie mas que administracion recontrata');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.rehire_worker('33333333-3333-3333-3333-333333333333'), 'ready', 'administracion recontrata a quien vuelve');

reset role;
select ok(
  (select deleted_at is null and status = 'active' and blocked_reason is null and failed_attempts = 0
     from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'recontratar levanta el bloqueo y devuelve la cuenta al listado'
);
select is(
  (select username || '/' || personal_email from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'celso/celso@correo.cr',
  'vuelve con el mismo usuario y el mismo correo'
);
select is(
  (select count(*) from public.worker_areas where worker_id = '33333333-3333-3333-3333-333333333333')
    + (select count(*) from public.worker_marks where worker_id = '33333333-3333-3333-3333-333333333333'),
  3::bigint,
  'vuelve con las mismas areas y marcas'
);
select ok(
  (select must_change_password from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'pasa por la pantalla de primer ingreso como una cuenta nueva'
);

select * from finish();
rollback;
