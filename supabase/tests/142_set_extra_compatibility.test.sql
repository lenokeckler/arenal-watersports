begin;
select plan(19);

insert into auth.users (id, email)
select 'e4200000-0000-4000-8000-000000000001', 'compat-admin@arenal.local'
where not exists (select 1 from workers where base_role = 'administracion');
insert into auth.users (id, email) values
  ('e4200000-0000-4000-8000-000000000002', 'compat-ops@arenal.local'),
  ('e4200000-0000-4000-8000-000000000003', 'compat-res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role)
select 'e4200000-0000-4000-8000-000000000001', 'compat_admin', 'Compat admin', 'compat-admin@arenal.local', 'administracion'
where not exists (select 1 from workers where base_role = 'administracion');
insert into workers (id, username, full_name, personal_email, base_role) values
  ('e4200000-0000-4000-8000-000000000002', 'compat_ops', 'Compat operations', 'compat-ops@arenal.local', 'operaciones'),
  ('e4200000-0000-4000-8000-000000000003', 'compat_res', 'Compat reservations', 'compat-res@arenal.local', 'reservas');

select set_config('compat.admin_id',
  (select id::text from workers where base_role = 'administracion' and status = 'active'), true);
update workers set last_work_area = 'administracion'
where id = current_setting('compat.admin_id')::uuid;

select set_config('compat.admin_claims',
  json_build_object('sub', current_setting('compat.admin_id'), 'role', 'authenticated')::text, true);

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('e4200001-0000-4000-8000-000000000001', 'Compat test boats', 'by_unit', current_setting('compat.admin_id')::uuid, current_setting('compat.admin_id')::uuid);

insert into equipment_units (id, category_id, code, created_by, updated_by) values
  ('e4200002-0000-4000-8000-000000000001', 'e4200001-0000-4000-8000-000000000001', 'COMPAT-B1', current_setting('compat.admin_id')::uuid, current_setting('compat.admin_id')::uuid),
  ('e4200002-0000-4000-8000-000000000002', 'e4200001-0000-4000-8000-000000000001', 'COMPAT-B2', current_setting('compat.admin_id')::uuid, current_setting('compat.admin_id')::uuid),
  ('e4200002-0000-4000-8000-000000000003', 'e4200001-0000-4000-8000-000000000001', 'COMPAT-B3', current_setting('compat.admin_id')::uuid, current_setting('compat.admin_id')::uuid);

insert into extras (id, name, created_by, updated_by) values
  ('e4200003-0000-4000-8000-000000000001', 'Compat target', current_setting('compat.admin_id')::uuid, current_setting('compat.admin_id')::uuid),
  ('e4200003-0000-4000-8000-000000000002', 'Compat bystander', current_setting('compat.admin_id')::uuid, current_setting('compat.admin_id')::uuid);

insert into extra_compatibility (extra_id, unit_id) values
  ('e4200003-0000-4000-8000-000000000002', 'e4200002-0000-4000-8000-000000000001');

select ok(
  not has_function_privilege('anon', 'public.set_extra_compatibility(uuid, uuid[])', 'execute'),
  'anon cannot execute the extra compatibility function'
);

select is(
  (select proconfig from pg_proc where proname = 'set_extra_compatibility' and pronamespace = 'public'::regnamespace),
  array['search_path=""'], 'the extra compatibility function pins an empty search path'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"e4200000-0000-4000-8000-000000000002","role":"authenticated"}';
select throws_ok(
  $$select set_extra_compatibility('e4200003-0000-4000-8000-000000000001', array['e4200002-0000-4000-8000-000000000001']::uuid[])$$,
  '42501', null, 'an operations worker cannot define the units of an extra'
);

set local request.jwt.claims to '{"sub":"e4200000-0000-4000-8000-000000000003","role":"authenticated"}';
select throws_ok(
  $$select set_extra_compatibility('e4200003-0000-4000-8000-000000000001', array['e4200002-0000-4000-8000-000000000001']::uuid[])$$,
  '42501', null, 'a reservations worker cannot define the units of an extra'
);

select set_config('request.jwt.claims', current_setting('compat.admin_claims'), true);

select throws_ok(
  $$select set_extra_compatibility('e4200003-0000-4000-8000-000000000099', array['e4200002-0000-4000-8000-000000000001']::uuid[])$$,
  'P0002', null, 'an unknown extra is rejected'
);

select throws_ok(
  $$select set_extra_compatibility('e4200003-0000-4000-8000-000000000001', array['e4200002-0000-4000-8000-000000000099']::uuid[])$$,
  'P0002', null, 'an unknown unit is rejected'
);

select throws_ok(
  $$select set_extra_compatibility('e4200003-0000-4000-8000-000000000001', null)$$,
  '22023', null, 'a null list is rejected'
);

select throws_ok(
  $$select set_extra_compatibility('e4200003-0000-4000-8000-000000000001', array['e4200002-0000-4000-8000-000000000001', null]::uuid[])$$,
  '22023', null, 'a list containing a null is rejected'
);

select is(
  (select count(*) from extra_compatibility where extra_id = 'e4200003-0000-4000-8000-000000000001'),
  0::bigint, 'the rejected calls leave the extra untouched'
);

select is(
  set_extra_compatibility('e4200003-0000-4000-8000-000000000001', array['e4200002-0000-4000-8000-000000000001', 'e4200002-0000-4000-8000-000000000002']::uuid[]),
  2, 'the first call returns how many units are linked'
);

select is(
  (select array_agg(unit_id order by unit_id) from extra_compatibility where extra_id = 'e4200003-0000-4000-8000-000000000001'),
  array['e4200002-0000-4000-8000-000000000001', 'e4200002-0000-4000-8000-000000000002']::uuid[],
  'the extra is linked to exactly the given units'
);

select is(
  set_extra_compatibility('e4200003-0000-4000-8000-000000000001', array['e4200002-0000-4000-8000-000000000002', 'e4200002-0000-4000-8000-000000000003']::uuid[]),
  2, 'one call adds and removes units and returns the new count'
);

select is(
  (select array_agg(unit_id order by unit_id) from extra_compatibility where extra_id = 'e4200003-0000-4000-8000-000000000001'),
  array['e4200002-0000-4000-8000-000000000002', 'e4200002-0000-4000-8000-000000000003']::uuid[],
  'the set is replaced, not merged'
);

select is(
  set_extra_compatibility('e4200003-0000-4000-8000-000000000001', array['e4200002-0000-4000-8000-000000000002', 'e4200002-0000-4000-8000-000000000002']::uuid[]),
  1, 'a repeated unit id is linked once'
);

select is(
  (select count(*) from extra_compatibility where extra_id = 'e4200003-0000-4000-8000-000000000002'),
  1::bigint, 'other extras keep their units'
);

select is(
  (select updated_by from extras where id = 'e4200003-0000-4000-8000-000000000001'),
  current_setting('compat.admin_id')::uuid, 'the change is recorded under the admin'
);

select is(
  set_extra_compatibility('e4200003-0000-4000-8000-000000000001', array[]::uuid[]),
  0, 'an empty list returns zero'
);

select is(
  (select count(*) from extra_compatibility where extra_id = 'e4200003-0000-4000-8000-000000000001'),
  0::bigint, 'an empty list clears the extra'
);

select is(
  (select count(*) from extra_compatibility where extra_id = 'e4200003-0000-4000-8000-000000000002'),
  1::bigint, 'clearing one extra does not touch another'
);

select * from finish();
rollback;
