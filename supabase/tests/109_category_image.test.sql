begin;
select plan(17);

insert into auth.users (id, email)
select 'c1000000-0000-0000-0000-000000000001', 'cat-image-admin@arenal.local'
where not exists (select 1 from workers where base_role = 'administracion');
insert into auth.users (id, email) values
  ('c1000000-0000-0000-0000-000000000002', 'cat-image-ops@arenal.local'),
  ('c1000000-0000-0000-0000-000000000003', 'cat-image-res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role)
select 'c1000000-0000-0000-0000-000000000001', 'cat_image_admin', 'Category image admin', 'cat-image-admin@correo.com', 'administracion'
where not exists (select 1 from workers where base_role = 'administracion');
select set_config('cat_image.admin_id',
  (select id::text from workers where base_role = 'administracion' and status = 'active'), true);
select set_config('cat_image.admin_claims',
  json_build_object('sub', current_setting('cat_image.admin_id'), 'role', 'authenticated')::text, true);
insert into workers (id, username, full_name, base_role) values
  ('c1000000-0000-0000-0000-000000000002', 'cat_image_ops', 'Category image operations', 'operaciones'),
  ('c1000000-0000-0000-0000-000000000003', 'cat_image_res', 'Category image reservations', 'reservas');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values
  ('c1000001-0000-0000-0000-000000000001', 'Category image kayaks', 'by_unit', true, 60,
   current_setting('cat_image.admin_id')::uuid, current_setting('cat_image.admin_id')::uuid),
  ('c1000001-0000-0000-0000-000000000002', 'Category image paddles', 'by_unit', true, 60,
   current_setting('cat_image.admin_id')::uuid, current_setting('cat_image.admin_id')::uuid);

select ok(
  (select public from storage.buckets where id = 'category-images'),
  'el bucket de imagenes de categoria es publico'
);

select is(
  (select file_size_limit from storage.buckets where id = 'category-images'),
  5242880::bigint,
  'el bucket limita cada imagen a 5 MB'
);

select is(
  (select allowed_mime_types from storage.buckets where id = 'category-images'),
  array['image/jpeg', 'image/png', 'image/webp'],
  'el bucket solo admite jpeg, png y webp'
);

set local role authenticated;
select set_config('request.jwt.claims', current_setting('cat_image.admin_claims'), true);

select lives_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values
       ('category-images', 'c1000001-0000-0000-0000-000000000001/aaaaaaaa-0000-0000-0000-000000000001.png', current_setting('cat_image.admin_id')::uuid),
       ('category-images', 'c1000001-0000-0000-0000-000000000001/aaaaaaaa-0000-0000-0000-000000000002.png', current_setting('cat_image.admin_id')::uuid) $$,
  'administracion sube imagenes al bucket de categorias'
);

with touched as (
  update storage.objects set metadata = '{"size": 9}'::jsonb
   where bucket_id = 'category-images'
     and name like 'c1000001-0000-0000-0000-000000000001/aaaaaaaa-0000-0000-0000-000000000001.%'
  returning 1
)
select is(
  (select count(*)::integer from touched),
  1,
  'administracion actualiza una imagen de categoria'
);

select set_config('storage.allow_delete_query', 'true', true);

with removed as (
  delete from storage.objects
   where bucket_id = 'category-images'
     and name like 'c1000001-0000-0000-0000-000000000001/aaaaaaaa-0000-0000-0000-000000000001.%'
  returning 1
)
select is(
  (select count(*)::integer from removed),
  1,
  'administracion borra una imagen de categoria'
);

set local request.jwt.claims to '{"sub":"c1000000-0000-0000-0000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('category-images',
             'c1000001-0000-0000-0000-000000000001/bbbbbbbb-0000-0000-0000-000000000001.png',
             'c1000000-0000-0000-0000-000000000002') $$,
  '42501', null,
  'operaciones no sube imagenes de categoria'
);

select is(
  (select count(*)::integer from storage.objects
    where bucket_id = 'category-images'
      and name like 'c1000001-0000-0000-0000-000000000001/%'),
  1,
  'operaciones lee las imagenes de categoria'
);

with touched as (
  update storage.objects set metadata = '{"size": 9}'::jsonb
   where bucket_id = 'category-images'
  returning 1
)
select is(
  (select count(*)::integer from touched),
  0,
  'operaciones no actualiza imagenes de categoria'
);

select set_config('storage.allow_delete_query', 'true', true);

with removed as (
  delete from storage.objects
   where bucket_id = 'category-images'
  returning 1
)
select is(
  (select count(*)::integer from removed),
  0,
  'operaciones no borra imagenes de categoria'
);

select is(
  (select image_path from board_category_summary
    where category_id = 'c1000001-0000-0000-0000-000000000001'),
  null,
  'operaciones ve la columna image_path en el resumen del tablero'
);

set local request.jwt.claims to '{"sub":"c1000000-0000-0000-0000-000000000003","role":"authenticated"}';

select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('category-images',
             'c1000001-0000-0000-0000-000000000001/bbbbbbbb-0000-0000-0000-000000000002.png',
             'c1000000-0000-0000-0000-000000000003') $$,
  '42501', null,
  'reservas no sube imagenes de categoria'
);

reset role;
set local role anon;

select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner)
     values ('category-images',
             'c1000001-0000-0000-0000-000000000001/bbbbbbbb-0000-0000-0000-000000000003.png',
             null) $$,
  '42501', null,
  'una sesion sin autenticar no sube imagenes de categoria'
);

reset role;
set local role authenticated;
select set_config('request.jwt.claims', current_setting('cat_image.admin_claims'), true);

select throws_ok(
  $$ update equipment_categories
        set image_path = 'c1000001-0000-0000-0000-000000000002/aaaaaaaa-0000-0000-0000-000000000001.png'
      where id = 'c1000001-0000-0000-0000-000000000001' $$,
  '23514', null,
  'una categoria no admite la imagen de otra categoria'
);

select lives_ok(
  $$ update equipment_categories set image_path = null
      where id = 'c1000001-0000-0000-0000-000000000001' $$,
  'una categoria admite no tener imagen'
);

select lives_ok(
  $$ update equipment_categories
        set image_path = 'c1000001-0000-0000-0000-000000000001/aaaaaaaa-0000-0000-0000-000000000002.png'
      where id = 'c1000001-0000-0000-0000-000000000001' $$,
  'una categoria admite una imagen bajo su propio id'
);

set local request.jwt.claims to '{"sub":"c1000000-0000-0000-0000-000000000002","role":"authenticated"}';

with touched as (
  update equipment_categories set image_path = null
   where id = 'c1000001-0000-0000-0000-000000000001'
  returning 1
)
select is(
  (select count(*)::integer from touched),
  0,
  'operaciones no cambia la imagen de una categoria'
);

reset role;
select * from finish();
rollback;
