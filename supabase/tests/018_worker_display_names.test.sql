begin;
select plan(6);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'jefe@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, personal_email, national_id, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'ismael@correo.com', '1-1111-1111', 'operaciones'),
  ('44444444-4444-4444-4444-444444444444', 'marcos', 'Marcos', 'marcos@correo.com', '2-2222-2222', 'operaciones');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select full_name from worker_display_names(
     array['44444444-4444-4444-4444-444444444444']::uuid[])),
  'Marcos',
  'operaciones lee el nombre visible de quien firmo un registro'
);

select is(
  (select count(*)::integer from worker_display_names(
     array['22222222-2222-2222-2222-222222222222',
           '44444444-4444-4444-4444-444444444444']::uuid[])),
  2,
  'la funcion resuelve varias firmas de una sola vez'
);

select is(
  (select count(*)::integer from workers
    where id = '44444444-4444-4444-4444-444444444444'),
  0,
  'la rendija del nombre no abrio la fila del companero en workers'
);

select is(
  (select count(*)::integer from worker_display_names(
     array['44444444-4444-4444-4444-444444444444']::uuid[])
    where full_name is null),
  0,
  'la funcion no devuelve columnas sensibles: solo el identificador y el nombre'
);

select is(
  (select count(*)::integer from worker_display_names(
     array['99999999-9999-9999-9999-999999999999']::uuid[])),
  0,
  'un identificador desconocido devuelve vacio, no un error'
);

reset role;
set local role anon;

select throws_ok(
  $$ select * from worker_display_names(
       array['44444444-4444-4444-4444-444444444444']::uuid[]) $$,
  '42501', null,
  'una sesion sin autenticar no puede ejecutar la funcion de nombres'
);

reset role;
select * from finish();
rollback;
