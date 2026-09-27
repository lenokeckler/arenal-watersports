begin;
select plan(9);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'jefe@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('44444444-4444-4444-4444-444444444444', 'marcos', 'Marcos', 'operaciones');

insert into worker_marks (worker_id, mark, granted_by)
values ('44444444-4444-4444-4444-444444444444', 'encargado_general',
        '11111111-1111-1111-1111-111111111111');

insert into storage.buckets (id, name, public)
values ('otro-bucket', 'otro-bucket', false);

set local role authenticated;
set local request.jwt.claims to '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}';

select lives_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('unit-condition-photos',
             'bbbbbbbb-0000-0000-0000-000000000001/right_side',
             '44444444-4444-4444-4444-444444444444') $$,
  'el encargado general sube una foto de estado'
);

select lives_ok(
  $$ update storage.objects set metadata = '{"size": 1024}'::jsonb
     where bucket_id = 'unit-condition-photos' $$,
  'el encargado general reemplaza la foto que ya existe'
);

select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('otro-bucket', 'cualquier/cosa',
             '44444444-4444-4444-4444-444444444444') $$,
  '42501', null,
  'la marca no abre el resto del almacenamiento, solo este bucket'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::integer from storage.objects
    where bucket_id = 'unit-condition-photos'),
  1,
  'el resto de operaciones si ve la foto de estado'
);

select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('unit-condition-photos',
             'bbbbbbbb-0000-0000-0000-000000000001/front',
             '22222222-2222-2222-2222-222222222222') $$,
  '42501', null,
  'operaciones sin la marca no sube una foto de estado'
);

with touched as (
  update storage.objects set metadata = '{"size": 9}'::jsonb
   where bucket_id = 'unit-condition-photos'
  returning 1
)
select is(
  (select count(*)::integer from touched),
  0,
  'operaciones sin la marca tampoco reemplaza la foto que ya existe'
);

reset role;

select is(
  (select count(*)::integer from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and cmd = 'DELETE'),
  0,
  'ninguna politica concede borrar objetos: una foto se reemplaza, no se borra'
);

reset role;
set local role anon;

select is(
  (select count(*)::integer from storage.objects
    where bucket_id = 'unit-condition-photos'),
  0,
  'una sesion sin autenticar no lee ninguna foto de estado'
);

select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('unit-condition-photos', 'suelto/anon', null) $$,
  '42501', null,
  'una sesion sin autenticar no sube nada al bucket de fotos'
);

reset role;
select * from finish();
rollback;
