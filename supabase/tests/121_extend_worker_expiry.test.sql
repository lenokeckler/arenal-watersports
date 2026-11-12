begin;
select plan(17);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'vencida@arenal.local'),
  ('66666666-6666-6666-6666-666666666666', 'porvencer@arenal.local'),
  ('77777777-7777-7777-7777-777777777777', 'retirada@arenal.local');

insert into public.workers (id, username, full_name, base_role, personal_email, must_change_password) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'administracion', 'admin@correo.cr', false),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso Rojas', 'operaciones', 'celso@correo.cr', false);

insert into public.workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at, must_change_password) values
  ('55555555-5555-5555-5555-555555555555', 'vencida', 'Guia Vencida', 'operaciones', true, '1-1111-1111', now() - interval '3 days', false),
  ('66666666-6666-6666-6666-666666666666', 'porvencer', 'Guia Por Vencer', 'operaciones', true, '2-2222-2222', now() + interval '2 days', false),
  ('77777777-7777-7777-7777-777777777777', 'retirada', 'Guia Retirada', 'operaciones', true, '3-3333-3333', now() + interval '5 days', false);

update public.workers set deleted_at = now() where id = '77777777-7777-7777-7777-777777777777';

select ok(
  not has_function_privilege('anon', 'public.extend_worker_expiry(uuid, timestamptz)', 'execute'),
  'anon no extiende caducidades'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}';
select ok(not public.is_active_worker(), 'una cuenta de guia externo vencida no entra al sistema');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(
  public.extend_worker_expiry('55555555-5555-5555-5555-555555555555', now() + interval '30 days'),
  'not_allowed',
  'nadie mas que administracion extiende una caducidad'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(
  public.extend_worker_expiry('99999999-9999-9999-9999-999999999999', now() + interval '30 days'),
  'not_found',
  'una cuenta inexistente no se extiende'
);
select is(
  public.extend_worker_expiry('33333333-3333-3333-3333-333333333333', now() + interval '30 days'),
  'not_external_guide',
  'solo las cuentas de guia externo caducan'
);
select is(
  public.extend_worker_expiry('77777777-7777-7777-7777-777777777777', now() + interval '30 days'),
  'retired',
  'una cuenta dada de baja solo se recontrata'
);
select is(
  public.extend_worker_expiry('55555555-5555-5555-5555-555555555555', now() - interval '1 day'),
  'invalid_date',
  'una fecha pasada no reactiva la cuenta'
);
select is(
  public.extend_worker_expiry('55555555-5555-5555-5555-555555555555', null),
  'invalid_date',
  'sin fecha no se extiende'
);
select is(
  public.extend_worker_expiry('66666666-6666-6666-6666-666666666666', now() + interval '1 day'),
  'invalid_date',
  'una fecha anterior a la caducidad actual no la acorta'
);
select is(
  public.extend_worker_expiry('66666666-6666-6666-6666-666666666666', (select expires_at from public.workers where id = '66666666-6666-6666-6666-666666666666')),
  'invalid_date',
  'la misma fecha no cambia nada'
);

select is(
  public.extend_worker_expiry('55555555-5555-5555-5555-555555555555', now() + interval '30 days'),
  'extended',
  'administracion reactiva una cuenta vencida con una fecha nueva'
);

set local request.jwt.claims to '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}';
select ok(public.is_active_worker(), 'al extender la fecha la cuenta vuelve a entrar al sistema');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(
  public.extend_worker_expiry('66666666-6666-6666-6666-666666666666', now() + interval '20 days'),
  'extended',
  'administracion extiende una cuenta que esta por vencer'
);

reset role;
select ok(
  (select expires_at > now() + interval '19 days' from public.workers where id = '66666666-6666-6666-6666-666666666666'),
  'la fecha por vencer quedo en la fecha nueva'
);
select ok(
  (select deleted_at is null and status = 'active' and base_role = 'operaciones' and is_external_guide
     from public.workers where id = '55555555-5555-5555-5555-555555555555'),
  'extender no cambia el rol, el estado ni la condicion de guia externo'
);
select is(
  (select count(*) from public.workers where id = '33333333-3333-3333-3333-333333333333' and expires_at is null),
  1::bigint,
  'las cuentas que no son de guia externo siguen sin caducidad'
);
select is(
  (select expires_at from public.workers where id = '77777777-7777-7777-7777-777777777777') > now(),
  true,
  'la cuenta dada de baja conserva su fecha anterior'
);

select * from finish();
rollback;
