begin;
select plan(26);

insert into auth.users (id, email) values
  ('16600000-0000-0000-0000-000000000009', 'photo-rights-admin@arenal.local'),
  ('16600000-0000-0000-0000-000000000001', 'photo-rights-staff@arenal.local'),
  ('16600000-0000-0000-0000-000000000002', 'photo-rights-reservations@arenal.local'),
  ('16600000-0000-0000-0000-000000000003', 'photo-rights-manager@arenal.local'),
  ('16600000-0000-0000-0000-000000000004', 'photo-rights-external@arenal.local');
insert into public.workers (id, username, full_name, personal_email, base_role) values
  ('16600000-0000-0000-0000-000000000009', 'photo_rights_admin', 'Administrator', 'photo-rights-admin@correo.com', 'administracion'),
  ('16600000-0000-0000-0000-000000000001', 'photo_rights_staff', 'Operations staff', null, 'operaciones'),
  ('16600000-0000-0000-0000-000000000002', 'photo_rights_reservations', 'Reservations', null, 'reservas'),
  ('16600000-0000-0000-0000-000000000003', 'photo_rights_manager', 'General manager', null, 'operaciones');
insert into public.workers
  (id, username, full_name, personal_email, base_role, is_external_guide, national_id, expires_at)
values
  ('16600000-0000-0000-0000-000000000004', 'photo_rights_external', 'External guide', null,
   'operaciones', true, '1-1660-0004', now() + interval '30 days');
insert into public.worker_marks (worker_id, mark, granted_by) values
  ('16600000-0000-0000-0000-000000000003', 'encargado_general', '16600000-0000-0000-0000-000000000009');
insert into public.equipment_categories (id, name, tracking_mode, has_condition_photos, created_by, updated_by)
values ('16610000-0000-0000-0000-000000000001', 'Photo rights category', 'by_unit', true,
        '16600000-0000-0000-0000-000000000001', '16600000-0000-0000-0000-000000000001');
insert into public.equipment_units (id, category_id, code, created_by, updated_by) values
  ('16620000-0000-0000-0000-000000000001', '16610000-0000-0000-0000-000000000001',
   'PHOTO-RIGHTS-1', '16600000-0000-0000-0000-000000000001', '16600000-0000-0000-0000-000000000001'),
  ('16620000-0000-0000-0000-000000000002', '16610000-0000-0000-0000-000000000001',
   'PHOTO-RIGHTS-2', '16600000-0000-0000-0000-000000000001', '16600000-0000-0000-0000-000000000001');
insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by)
values ('16620000-0000-0000-0000-000000000002', 'front', 'photo-rights/kept', '16600000-0000-0000-0000-000000000001');
insert into storage.objects (bucket_id, name, owner) values
  ('unit-condition-photos', 'photo-rights/kept', '16600000-0000-0000-0000-000000000001'),
  ('unit-condition-photos', 'photo-rights/loose', '16600000-0000-0000-0000-000000000001');
set local storage.allow_delete_query = 'true';

set local role authenticated;
set local request.jwt.claims to '{"sub":"16600000-0000-0000-0000-000000000001","role":"authenticated"}';
select lives_ok(
  $$insert into storage.objects (bucket_id, name, owner) values ('unit-condition-photos', 'photo-rights/first', '16600000-0000-0000-0000-000000000001'), ('unit-condition-photos', 'photo-rights/second', '16600000-0000-0000-0000-000000000001')$$,
  'any operations staff member uploads a photo file'
);
select lives_ok(
  $$insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by) values ('16620000-0000-0000-0000-000000000001', 'front', 'photo-rights/first', '16600000-0000-0000-0000-000000000001')$$,
  'any operations staff member records a photo'
);
with changed as (update public.unit_condition_photos set storage_path = 'photo-rights/second' where unit_id = '16620000-0000-0000-0000-000000000001' returning 1)
select is((select count(*)::integer from changed), 1, 'any operations staff member replaces a photo');
select throws_ok(
  $$update public.unit_condition_photos set unit_id = '16620000-0000-0000-0000-000000000002', angle = 'back' where unit_id = '16620000-0000-0000-0000-000000000001'$$,
  '23514', null, 'a recorded photo cannot be moved to another machine'
);
select throws_ok(
  $$update public.unit_condition_photos set angle = 'back' where unit_id = '16620000-0000-0000-0000-000000000001'$$,
  '23514', null, 'a recorded photo cannot be moved to another angle'
);
select lives_ok(
  $$insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by) values ('16620000-0000-0000-0000-000000000002', 'front', 'photo-rights/kept', '16600000-0000-0000-0000-000000000001') on conflict (unit_id, angle) do update set unit_id = excluded.unit_id, angle = excluded.angle, storage_path = excluded.storage_path$$,
  'replacing a photo through the same slot still works'
);
with changed as (update storage.objects set metadata = '{"size":1}'::jsonb where bucket_id = 'unit-condition-photos' and name = 'photo-rights/second' returning 1)
select is((select count(*)::integer from changed), 0, 'a stored photo file is never overwritten');
with gone as (delete from storage.objects where bucket_id = 'unit-condition-photos' and name = 'photo-rights/second' returning 1)
select is((select count(*)::integer from gone), 0, 'the file of a recorded photo cannot be deleted on its own');
with gone as (delete from public.unit_condition_photos where unit_id = '16620000-0000-0000-0000-000000000001' returning 1)
select is((select count(*)::integer from gone), 1, 'any operations staff member deletes a photo');
with gone as (delete from storage.objects where bucket_id = 'unit-condition-photos' and name = 'photo-rights/second' returning 1)
select is((select count(*)::integer from gone), 1, 'the file goes once no photo points to it');
select is(
  (select count(*)::integer from public.unit_condition_photo_changes),
  0, 'staff without the mark cannot read the photo record'
);
select throws_ok(
  $$insert into public.unit_condition_photo_changes (unit_id, angle, action) values ('16620000-0000-0000-0000-000000000001', 'front', 'deleted')$$,
  '42501', null, 'nobody writes the photo record by hand'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"16600000-0000-0000-0000-000000000004","role":"authenticated"}';
select is(public.can_manage_unit_photos(), false, 'a temporary guide does not manage photos');
select is(
  (select count(*)::integer from public.unit_condition_photos where storage_path = 'photo-rights/kept'),
  1, 'a temporary guide still sees the photos'
);
select throws_ok(
  $$insert into public.unit_condition_photos (unit_id, angle, storage_path, uploaded_by) values ('16620000-0000-0000-0000-000000000001', 'back', 'photo-rights/external', '16600000-0000-0000-0000-000000000004')$$,
  '42501', null, 'a temporary guide records no photo'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name, owner) values ('unit-condition-photos', 'photo-rights/external', '16600000-0000-0000-0000-000000000004')$$,
  '42501', null, 'a temporary guide uploads no file'
);
with changed as (update public.unit_condition_photos set storage_path = 'photo-rights/loose' where storage_path = 'photo-rights/kept' returning 1)
select is((select count(*)::integer from changed), 0, 'a temporary guide replaces no photo');
with gone as (delete from public.unit_condition_photos where storage_path = 'photo-rights/kept' returning 1)
select is((select count(*)::integer from gone), 0, 'a temporary guide deletes no photo');
with gone as (delete from storage.objects where bucket_id = 'unit-condition-photos' and name = 'photo-rights/loose' returning 1)
select is((select count(*)::integer from gone), 0, 'a temporary guide deletes no file');

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"16600000-0000-0000-0000-000000000002","role":"authenticated"}';
select is(public.can_manage_unit_photos(), false, 'reservations does not manage photos');
with gone as (delete from public.unit_condition_photos where storage_path = 'photo-rights/kept' returning 1)
select is((select count(*)::integer from gone), 0, 'reservations deletes no photo');

reset role;
set local role anon;
set local request.jwt.claims to '{"role":"anon"}';
select throws_ok(
  $$delete from public.unit_condition_photos where storage_path = 'photo-rights/kept'$$,
  '42501', null, 'anonymous requests cannot delete photos'
);
select ok(
  not has_function_privilege('anon', 'public.can_manage_unit_photos()', 'execute'),
  'anonymous requests cannot ask who manages photos'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"16600000-0000-0000-0000-000000000003","role":"authenticated"}';
select is(
  (select string_agg(action, ',' order by changed_at) from public.unit_condition_photo_changes
    where unit_id = '16620000-0000-0000-0000-000000000001'),
  'uploaded,replaced,deleted', 'the general manager reads what happened to a photo'
);
select is(
  (select array_agg(distinct changed_by) from public.unit_condition_photo_changes
    where unit_id = '16620000-0000-0000-0000-000000000001'),
  array['16600000-0000-0000-0000-000000000001'::uuid], 'the record says who did it'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"16600000-0000-0000-0000-000000000009","role":"authenticated"}';
select ok(
  public.can_manage_unit_photos()
    and (select count(*) from public.unit_condition_photo_changes
          where unit_id = '16620000-0000-0000-0000-000000000001') = 3,
  'the administrator manages photos and reads the record'
);

select * from finish();
rollback;
