begin;
select plan(13);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'rita@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'lucia@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('33333333-3333-3333-3333-333333333333', 'rita', 'Rita Mora', 'reservas', null, false),
  ('44444444-4444-4444-4444-444444444444', 'lucia', 'Lucia Vargas', 'reservas', null, false);

select ok(
  'registro_guias_externos' = any (public.grantable_worker_marks()),
  'la marca de registro de guias externos se puede poner y quitar desde el panel'
);
select ok(
  (select pg_get_expr(p.polwithcheck, p.polrelid) like '%registro_guias_externos%' from pg_policy p where p.polname = 'workers_insert'),
  'crear una cuenta de guia externo exige la marca o administracion'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(not public.has_mark('registro_guias_externos'), 'sin la marca la persona de reservas no puede registrar guias externos');
select is(
  public.grant_worker_mark('44444444-4444-4444-4444-444444444444', 'registro_guias_externos'),
  'not_allowed',
  'quien no es administracion no puede poner la marca'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(
  public.grant_worker_mark('33333333-3333-3333-3333-333333333333', 'registro_guias_externos'),
  'granted',
  'administracion pone la marca de registro de guias externos'
);
select is(
  public.grant_worker_mark('33333333-3333-3333-3333-333333333333', 'registro_guias_externos'),
  'granted',
  'ponerla dos veces no falla ni la duplica'
);

reset role;
select is(
  (select base_role::text from public.workers where id = '33333333-3333-3333-3333-333333333333'),
  'reservas',
  'la marca no cambia el rol'
);
select is(
  (select count(*) from public.worker_areas where worker_id = '33333333-3333-3333-3333-333333333333'),
  1::bigint,
  'la marca no suma areas'
);
select is(
  (select count(*) from public.worker_marks where worker_id = '33333333-3333-3333-3333-333333333333' and mark = 'registro_guias_externos'),
  1::bigint,
  'la marca queda una sola vez en la cuenta'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(public.has_mark('registro_guias_externos'), 'con la marca la persona de reservas puede registrar guias externos');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(
  public.revoke_worker_mark('33333333-3333-3333-3333-333333333333', 'registro_guias_externos'),
  'revoked',
  'administracion quita la marca en cualquier momento'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(not public.has_mark('registro_guias_externos'), 'al quitarla deja de poder registrar guias externos de inmediato');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select ok(public.is_admin(), 'administracion conserva el permiso de crear cuentas con o sin la marca');

select * from finish();
rollback;
