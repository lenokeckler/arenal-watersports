begin;
select plan(6);

insert into auth.users (id, email) values
  ('22222222-2222-2222-2222-222222222222', 'ismael@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'rosa@arenal.local');

insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'rosa', 'Rosa', 'operaciones');

set local role anon;
select throws_ok(
  $$ select sign_in_attempt_limit() $$,
  '42501', null,
  'una sesion anonima no ejecuta la lectura del limite de intentos'
);
select throws_ok(
  $$ select record_failed_sign_in('ismael') $$,
  '42501', null,
  'una sesion anonima no ejecuta el registro de intentos fallidos'
);

reset role;
set local role authenticated;
select throws_ok(
  $$ select record_failed_sign_in('ismael') $$,
  '42501', null,
  'un trabajador autenticado no ejecuta el registro de intentos fallidos'
);
select throws_ok(
  $$ select sign_in_attempt_limit() $$,
  '42501', null,
  'un trabajador autenticado no ejecuta la lectura del limite de intentos'
);
select throws_ok(
  $$ select record_successful_sign_in('33333333-3333-3333-3333-333333333333') $$,
  '42501', null,
  'un trabajador autenticado no ejecuta el registro de ingreso exitoso'
);

reset role;
set local role service_role;
select lives_ok(
  $$ select record_failed_sign_in('rosa') $$,
  'el rol de servicio ejecuta el registro de intentos fallidos'
);

reset role;
select * from finish();
rollback;
