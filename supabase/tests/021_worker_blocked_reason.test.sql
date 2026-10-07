begin;
select plan(9);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'otro@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'celso@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, personal_email, national_id, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'ismael@correo.com', '1-1111-1111', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'marcos', 'Marcos', 'marcos@correo.com', '2-2222-2222', 'operaciones');
insert into workers (id, username, full_name, base_role) values
  ('44444444-4444-4444-4444-444444444444', 'celso', 'Celso', 'reservas');
insert into worker_marks (worker_id, mark, granted_by)
values ('44444444-4444-4444-4444-444444444444', 'registro_guias_externos',
        '11111111-1111-1111-1111-111111111111');

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
  '42501', 'Solo administracion cambia el bloqueo de una cuenta',
  'un trabajador no reescribe el contador de intentos de su propia cuenta'
);

select throws_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration'
      where id = '22222222-2222-2222-2222-222222222222' $$,
  '42501', 'Solo administracion cambia el bloqueo de una cuenta',
  'un trabajador no cambia el estado de su propia cuenta'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          status, blocked_reason)
     values ('55555555-5555-5555-5555-555555555555', 'guia_bloqueado', 'Guia Bloqueado', 'operaciones',
             true, '111110001', now() + interval '30 days', 'blocked', 'administration') $$,
  '42501', 'Solo administracion cambia el bloqueo de una cuenta',
  'reservas no registra un guia externo ya bloqueado'
);

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at,
                          failed_attempts)
     values ('55555555-5555-5555-5555-555555555555', 'guia_contador', 'Guia Contador', 'operaciones',
             true, '111110001', now() + interval '30 days', 3) $$,
  '42501', 'Solo administracion cambia el bloqueo de una cuenta',
  'reservas no registra un guia externo con intentos fallidos'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select lives_ok(
  $$ update workers set status = 'blocked', blocked_reason = 'administration'
      where id = '33333333-3333-3333-3333-333333333333' $$,
  'administracion bloquea una cuenta con motivo administracion'
);

select lives_ok(
  $$ update workers set status = 'active', blocked_reason = null, failed_attempts = 0
      where id = '33333333-3333-3333-3333-333333333333' $$,
  'administracion desbloquea una cuenta limpiando motivo y contador'
);

reset role;
select is(
  (select status::text || ':' || coalesce(blocked_reason::text, 'none') || ':' || failed_attempts::text
     from workers where username = 'marcos'),
  'active:none:0',
  'la cuenta desbloqueada queda activa sin motivo y con el contador en cero'
);

select * from finish();
rollback;
