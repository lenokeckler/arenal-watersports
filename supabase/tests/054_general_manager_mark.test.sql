begin;
select plan(9);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', null, false);

select ok(
  (select pg_get_expr(p.polwithcheck, p.polrelid) like '%encargado_general%' from pg_policy p where p.polname = 'photos_insert'),
  'subir fotos de estado exige la marca de encargado general o administracion'
);
select ok(
  (select pg_get_expr(p.polqual, p.polrelid) like '%encargado_general%' from pg_policy p where p.polname = 'photos_update'),
  'reemplazar fotos de estado exige la marca de encargado general o administracion'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(not public.has_mark('encargado_general'), 'sin la marca la persona no es encargado general');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.grant_worker_mark('33333333-3333-3333-3333-333333333333', 'encargado_general'), 'granted', 'administracion pone la marca de encargado general');

reset role;
select is(
  (select base_role::text from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'operaciones',
  'la marca de encargado general no cambia el rol'
);
select is(
  (select count(*) from public.worker_areas where worker_id = '33333333-3333-3333-3333-333333333333'),
  1::bigint,
  'la marca de encargado general no suma areas'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(public.has_mark('encargado_general'), 'con la marca la persona puede subir y reemplazar fotos de estado');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(public.revoke_worker_mark('33333333-3333-3333-3333-333333333333', 'encargado_general'), 'revoked', 'administracion quita la marca de encargado general');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(not public.has_mark('encargado_general'), 'al quitarla deja de poder subir fotos de inmediato');

select * from finish();
rollback;
