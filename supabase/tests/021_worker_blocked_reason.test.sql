begin;
select plan(5);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'otro@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, personal_email, national_id, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'ismael@correo.com', '1-1111-1111', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'marcos', 'Marcos', 'marcos@correo.com', '2-2222-2222', 'operaciones');

select throws_ok(
  $$ update workers set status = 'blocked' where username = 'ismael' $$,
  '23514', null,
  'un bloqueo sin motivo viola la restriccion de motivo de bloqueo'
);

select throws_ok(
  $$ update workers set blocked_reason = 'administration' where username = 'ismael' $$,
  '23514', null,
  'un motivo de bloqueo en una cuenta activa viola la restriccion'
);

update workers set failed_attempts = 5 where username = 'ismael';

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ update workers set failed_attempts = 0 where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', null,
  'un trabajador no reescribe el contador de intentos de su propia cuenta'
);

select throws_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration'
      where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', null,
  'un trabajador no cambia el estado de su propia cuenta'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select lives_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration'
      where id = '33333333-3333-3333-3333-333333333333' $$,
  'administracion bloquea una cuenta con motivo administracion'
);

reset role;
select * from finish();
rollback;
