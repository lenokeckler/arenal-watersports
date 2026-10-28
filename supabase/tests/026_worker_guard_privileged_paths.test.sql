begin;
select plan(11);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'guia@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'celso@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'nuevo@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at) values
  ('22222222-2222-2222-2222-222222222222', 'guia', 'Guia', 'operaciones', true, '111110001',
   now() + interval '30 days');
insert into workers (id, username, full_name, base_role) values
  ('44444444-4444-4444-4444-444444444444', 'celso', 'Celso', 'reservas');
insert into worker_marks (worker_id, mark, granted_by)
values ('44444444-4444-4444-4444-444444444444', 'registro_guias_externos',
        '11111111-1111-1111-1111-111111111111');

select record_failed_sign_in('guia') from generate_series(1, 10);
select is(
  (select status::text || ':' || blocked_reason::text from workers where username = 'guia'),
  'blocked:failed_attempts',
  'el registro de intentos fallidos del servidor sigue bloqueando al llegar al limite'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select lives_ok(
  $$ update workers set status = 'active', blocked_reason = null, failed_attempts = 0
      where id = '22222222-2222-2222-2222-222222222222' $$,
  'administracion desbloquea a un trabajador'
);
select lives_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration'
      where id = '22222222-2222-2222-2222-222222222222' $$,
  'administracion bloquea a un trabajador'
);
select lives_ok(
  $$ update workers set expires_at = now() + interval '90 days'
      where id = '22222222-2222-2222-2222-222222222222' $$,
  'administracion cambia la fecha de vencimiento de un trabajador'
);
select lives_ok(
  $$ update workers set full_name = 'Guia Renombrado' where id = '22222222-2222-2222-2222-222222222222' $$,
  'administracion cambia el nombre de un trabajador'
);
select throws_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration'
      where id = '11111111-1111-1111-1111-111111111111' $$,
  'P0001', 'La cuenta de administracion no se bloquea',
  'administracion sigue sin poder bloquear su propia cuenta'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          must_change_password)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days', false) $$,
  '42501', 'Un guia externo nuevo nace activo, sin bloqueo y con cambio de contrasena pendiente',
  'reservas no registra un guia externo sin cambio de contrasena pendiente'
);
select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          created_by)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days', '11111111-1111-1111-1111-111111111111') $$,
  '42501', 'Un guia externo nuevo nace activo, sin bloqueo y con cambio de contrasena pendiente',
  'reservas no registra un guia externo a nombre de otra persona'
);
select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          deleted_at)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days', now()) $$,
  '42501', 'Un guia externo nuevo nace activo, sin bloqueo y con cambio de contrasena pendiente',
  'reservas no registra un guia externo ya retirado'
);
select lives_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days') $$,
  'reservas registra un guia externo bien formado'
);

reset role;
select hasnt_function('guard_lockout_fields', 'la guarda de bloqueo anterior ya no existe');

select * from finish();
rollback;
