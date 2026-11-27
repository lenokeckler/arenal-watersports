begin;
select plan(9);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'jefe@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'temporal@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('44444444-4444-4444-4444-444444444444', 'marcos', 'Marcos', 'operaciones');
insert into workers
  (id, username, full_name, base_role, is_external_guide, national_id, expires_at)
values
  ('55555555-5555-5555-5555-555555555555', 'temporal', 'Guia temporal', 'operaciones',
   true, '1-1700-0017', now() + interval '30 days');

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
  'operaciones sube una foto de estado'
);

with touched as (
  update storage.objects set metadata = '{"size": 1024}'::jsonb
   where bucket_id = 'unit-condition-photos'
  returning 1
)
select is(
  (select count(*)::integer from touched),
  0,
  'un archivo de foto guardado no se sobrescribe, ni con la marca'
);

select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('otro-bucket', 'cualquier/cosa',
             '44444444-4444-4444-4444-444444444444') $$,
  '42501', null,
  'subir fotos no abre el resto del almacenamiento, solo este bucket'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::integer from storage.objects
    where bucket_id = 'unit-condition-photos'),
  1,
  'el resto de operaciones si ve la foto de estado'
);

set local request.jwt.claims to '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}';

select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('unit-condition-photos',
             'bbbbbbbb-0000-0000-0000-000000000001/front',
             '55555555-5555-5555-5555-555555555555') $$,
  '42501', null,
  'un guia temporal no sube una foto de estado'
);

set local storage.allow_delete_query = 'true';

with gone as (
  delete from storage.objects
   where bucket_id = 'unit-condition-photos'
  returning 1
)
select is(
  (select count(*)::integer from gone),
  0,
  'un guia temporal tampoco borra una foto que ya existe'
);

reset role;

select is(
  (select count(*)::integer from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and cmd = 'DELETE'
      and qual like '%unit-condition-photos%'
      and qual like '%can_manage_unit_photos%'
      and qual like '%unit_condition_photos p%'),
  1,
  'borrar un archivo exige permiso y que ninguna foto lo este usando'
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
