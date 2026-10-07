begin;
select plan(17);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'guia@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'otro@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'celso@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'nuevo@arenal.local'),
  ('66666666-6666-6666-6666-666666666666', 'delegado@arenal.local'),
  ('77777777-7777-7777-7777-777777777777', 'bloqueado@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, personal_email, base_role, is_external_guide, national_id, expires_at) values
  ('22222222-2222-2222-2222-222222222222', 'guia', 'Guia', 'guia@correo.com', 'operaciones', true,
   '111110001', now() + interval '30 days'),
  ('33333333-3333-3333-3333-333333333333', 'otro', 'Otro', null, 'operaciones', true,
   '111110003', now() + interval '30 days'),
  ('77777777-7777-7777-7777-777777777777', 'bloqueado', 'Bloqueado', null, 'operaciones', true,
   '111110004', now() + interval '30 days');
insert into workers (id, username, full_name, base_role) values
  ('44444444-4444-4444-4444-444444444444', 'celso', 'Celso', 'reservas'),
  ('66666666-6666-6666-6666-666666666666', 'delegado', 'Delegado', 'reservas');
insert into worker_marks (worker_id, mark, granted_by)
values ('44444444-4444-4444-4444-444444444444', 'registro_guias_externos',
        '11111111-1111-1111-1111-111111111111');
insert into worker_areas (worker_id, area, granted_by)
values ('66666666-6666-6666-6666-666666666666', 'administracion', '11111111-1111-1111-1111-111111111111'),
       ('77777777-7777-7777-7777-777777777777', 'administracion', '11111111-1111-1111-1111-111111111111');
update workers set status = 'blocked', blocked_reason = 'administration'
 where id = '77777777-7777-7777-7777-777777777777';

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select lives_ok(
  $$ update workers set personal_email = 'guia@correo.com' where id = '22222222-2222-2222-2222-222222222222' $$,
  'un trabajador guarda su correo con el mismo valor'
);
select lives_ok(
  $$ update workers set full_name = full_name where id = '22222222-2222-2222-2222-222222222222' $$,
  'una actualizacion que no cambia nada no se rechaza'
);
select lives_ok(
  $$ update workers set personal_email = null where id = '22222222-2222-2222-2222-222222222222' $$,
  'un trabajador borra su correo personal'
);
select lives_ok(
  $$ update workers set personal_email = 'nuevo@correo.com' where id = '22222222-2222-2222-2222-222222222222' $$,
  'un trabajador vuelve a poner su correo personal'
);
select lives_ok(
  $$ update workers set last_work_area = 'reservas' where id = '22222222-2222-2222-2222-222222222222' $$,
  'un trabajador fija su ultimo modo de trabajo'
);
select lives_ok(
  $$ update workers set last_work_area = null where id = '22222222-2222-2222-2222-222222222222' $$,
  'un trabajador limpia su ultimo modo de trabajo'
);
select is(
  (select updated_by from workers where id = '22222222-2222-2222-2222-222222222222'),
  '22222222-2222-2222-2222-222222222222'::uuid,
  'el sellado de auditoria registra al trabajador como autor de su cambio'
);
select throws_ok(
  $$ update workers set updated_at = now() - interval '1 day' where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador no fija a mano su fecha de actualizacion'
);

update workers set personal_email = 'ajeno@correo.com' where id = '33333333-3333-3333-3333-333333333333';
select is(
  (select count(*)::int from workers where id = '33333333-3333-3333-3333-333333333333'),
  0,
  'un trabajador no ve ni cambia la fila de otro trabajador'
);

reset role;
select is(
  (select personal_email from workers where id = '33333333-3333-3333-3333-333333333333'),
  null,
  'la fila de otro trabajador conserva su correo'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}';

select throws_ok(
  $$ update workers set status = 'active', blocked_reason = null where id = '77777777-7777-7777-7777-777777777777' $$,
  '42501', 'Un trabajador solo cambia su correo personal y su ultimo modo de trabajo',
  'un trabajador bloqueado con area de administracion no se desbloquea solo'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}';

select lives_ok(
  $$ update workers set expires_at = now() + interval '5 days' where id = '66666666-6666-6666-6666-666666666666' $$,
  'un trabajador con area de administracion activa edita su propia fila como administrador'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          failed_attempts)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days', 3) $$,
  '42501', 'Un guia externo nuevo nace activo, sin bloqueo y con cambio de contrasena pendiente',
  'reservas no registra un guia externo con intentos fallidos'
);
select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          status, blocked_reason)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days', 'blocked', 'administration') $$,
  '42501', 'Un guia externo nuevo nace activo, sin bloqueo y con cambio de contrasena pendiente',
  'reservas no registra un guia externo ya bloqueado'
);
select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          last_work_area)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days', 'operaciones') $$,
  '42501', 'Un guia externo nuevo nace activo, sin bloqueo y con cambio de contrasena pendiente',
  'reservas no registra un guia externo con ultimo modo de trabajo'
);
select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          updated_by)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days', '11111111-1111-1111-1111-111111111111') $$,
  '42501', 'Un guia externo nuevo nace activo, sin bloqueo y con cambio de contrasena pendiente',
  'reservas no registra un guia externo con otro autor de actualizacion'
);
select lives_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          created_by, updated_by)
     values ('55555555-5555-5555-5555-555555555555', 'guia_nuevo', 'Guia Nuevo', 'operaciones',
             true, '111110002', now() + interval '30 days',
             '44444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444') $$,
  'reservas registra un guia externo a su propio nombre'
);

select * from finish();
rollback;
