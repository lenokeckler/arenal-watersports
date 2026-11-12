begin;
select plan(16);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'guia@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at) values
  ('22222222-2222-2222-2222-222222222222', 'guia', 'Guia', 'operaciones', true, '111110001',
   now() + interval '30 days');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ update workers set personal_email = 'guia@correo.com' where id = '22222222-2222-2222-2222-222222222222' $$,
  'un trabajador cambia su propio correo personal'
);

select lives_ok(
  $$ update workers set last_work_area = 'operaciones' where id = '22222222-2222-2222-2222-222222222222' $$,
  'un trabajador cambia su propio ultimo modo de trabajo'
);

select throws_ok(
  $$ update workers set must_change_password = false where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Solo el servidor marca la contrasena como cambiada',
  'un trabajador no cambia su obligacion de cambiar la contrasena'
);

select throws_ok(
  $$ update workers set expires_at = now() + interval '90 days' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su fecha de vencimiento'
);

select throws_ok(
  $$ update workers set is_external_guide = false where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su marca de guia externo'
);

select throws_ok(
  $$ update workers set national_id = '999999999' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su cedula'
);

select throws_ok(
  $$ update workers set full_name = 'Otro Nombre' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su nombre completo'
);

select throws_ok(
  $$ update workers set username = 'otro_usuario' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su usuario'
);

select throws_ok(
  $$ update workers set base_role = 'reservas' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su rol base'
);

select throws_ok(
  $$ update workers set deleted_at = now() where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su fecha de retiro'
);

select throws_ok(
  $$ update workers set created_by = '11111111-1111-1111-1111-111111111111' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia quien lo creo'
);

select throws_ok(
  $$ update workers set updated_by = '11111111-1111-1111-1111-111111111111' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia quien lo modifico'
);

select throws_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su estado'
);

select throws_ok(
  $$ update workers set failed_attempts = 3 where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su contador de intentos'
);

select throws_ok(
  $$ update workers set blocked_reason = 'administration' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no cambia su motivo de bloqueo'
);

select throws_ok(
  $$ update workers set personal_email = 'nuevo@correo.com', expires_at = now() + interval '90 days' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no mezcla un cambio permitido con uno prohibido'
);

reset role;
select * from finish();
rollback;
