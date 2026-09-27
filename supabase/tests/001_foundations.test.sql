begin;
select plan(11);

select has_type('public', 'work_area', 'existe el tipo work_area');
select has_table('public', 'workers', 'existe la tabla workers');

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'otro@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'guia@arenal.local');

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role)
     values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'administracion') $$,
  '23514',
  null,
  'una cuenta de administracion sin correo personal es rechazada'
);

insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

select throws_ok(
  $$ insert into workers (id, username, full_name, personal_email, base_role)
     values ('22222222-2222-2222-2222-222222222222', 'admin2', 'Otro', 'o@correo.com', 'administracion') $$,
  '23505',
  null,
  'no se puede crear una segunda cuenta de administracion'
);

select throws_ok(
  $$ update workers set status = 'blocked' where username = 'admin' $$,
  'La cuenta de administracion no se bloquea'
);
select throws_ok(
  $$ update workers set base_role = 'operaciones' where username = 'admin' $$,
  'La cuenta de administracion no cambia de rol'
);
select throws_ok(
  $$ delete from workers where username = 'admin' $$,
  'La cuenta de administracion no se elimina'
);

select lives_ok(
  $$ insert into workers (id, username, full_name, base_role)
     values ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones') $$,
  'una cuenta que no es de administracion no exige correo personal'
);

select throws_ok(
  $$ update workers set base_role = 'administracion', personal_email = 'ismael@correo.com'
     where username = 'ismael' $$,
  '23505',
  null,
  'tampoco se puede ascender a alguien existente a administracion habiendo ya una'
);

select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide)
     values ('33333333-3333-3333-3333-333333333333', '112340567', 'Guia', 'operaciones', true) $$,
  '23514',
  null,
  'un guia externo sin cedula ni caducidad es rechazado'
);

select lives_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, national_id, expires_at)
     values ('33333333-3333-3333-3333-333333333333', '112340567', 'Guia', 'operaciones', true,
             '112340567', now() + interval '1 year') $$,
  'un guia externo con cedula y caducidad se inserta correctamente'
);

select * from finish();
rollback;
