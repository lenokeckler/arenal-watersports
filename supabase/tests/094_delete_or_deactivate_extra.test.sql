begin;
select plan(18);

insert into auth.users (id, email)
select 'e3940000-0000-4000-8000-000000000001', 'extra-admin@arenal.local'
where not exists (select 1 from workers where base_role = 'administracion');
insert into auth.users (id, email) values
  ('e3940000-0000-4000-8000-000000000002', 'extra-ops@arenal.local'),
  ('e3940000-0000-4000-8000-000000000003', 'extra-res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role)
select 'e3940000-0000-4000-8000-000000000001', 'extra_admin', 'Extra admin', 'extra-admin@arenal.local', 'administracion'
where not exists (select 1 from workers where base_role = 'administracion');
insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3940000-0000-4000-8000-000000000002', 'extra_ops', 'Extra operations', 'extra-ops@arenal.local', 'operaciones'),
  ('e3940000-0000-4000-8000-000000000003', 'extra_res', 'Extra reservations', 'extra-res@arenal.local', 'reservas');

select set_config('extra.admin_id',
  (select id::text from workers where base_role = 'administracion' and status = 'active'), true);
update workers set last_work_area = 'administracion'
where id = current_setting('extra.admin_id')::uuid;

select set_config('extra.admin_claims',
  json_build_object('sub', current_setting('extra.admin_id'), 'role', 'authenticated')::text, true);

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('e3940001-0000-4000-8000-000000000001', 'Extra test boats', 'by_unit', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid);

insert into equipment_units (id, category_id, code, created_by, updated_by) values
  ('e3940002-0000-4000-8000-000000000001', 'e3940001-0000-4000-8000-000000000001', 'EXTRA-B1', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid);

insert into extras (id, name, created_by, updated_by) values
  ('e3940003-0000-4000-8000-000000000001', 'Extra unused', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid),
  ('e3940003-0000-4000-8000-000000000002', 'Extra scheduled', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid),
  ('e3940003-0000-4000-8000-000000000003', 'Extra cancelled', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid),
  ('e3940003-0000-4000-8000-000000000004', 'Extra bystander', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid);

insert into extra_compatibility (extra_id, unit_id) values
  ('e3940003-0000-4000-8000-000000000001', 'e3940002-0000-4000-8000-000000000001'),
  ('e3940003-0000-4000-8000-000000000002', 'e3940002-0000-4000-8000-000000000001'),
  ('e3940003-0000-4000-8000-000000000004', 'e3940002-0000-4000-8000-000000000001');

insert into reservations (id, customer_name, people_count, type, starts_at, duration_minutes, status, cancellation_reason, created_by, updated_by) values
  ('e3940004-0000-4000-8000-000000000001', 'Extra scheduled', 1, 'rental', '2035-01-05 15:00:00+00', 60, 'scheduled', null, current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid),
  ('e3940004-0000-4000-8000-000000000002', 'Extra cancelled', 1, 'rental', '2035-01-06 15:00:00+00', 60, 'cancelled', 'No show', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid);

insert into reservation_items (id, reservation_id, extra_id, created_by, updated_by) values
  ('e3940005-0000-4000-8000-000000000001', 'e3940004-0000-4000-8000-000000000001', 'e3940003-0000-4000-8000-000000000002', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid),
  ('e3940005-0000-4000-8000-000000000002', 'e3940004-0000-4000-8000-000000000002', 'e3940003-0000-4000-8000-000000000003', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid);

select ok(
  not has_function_privilege('anon', 'public.delete_or_deactivate_extra(uuid)', 'execute'),
  'anon cannot execute the extra removal function'
);

select is(
  (select proconfig from pg_proc where proname = 'delete_or_deactivate_extra' and pronamespace = 'public'::regnamespace),
  array['search_path=""'], 'the extra removal function pins an empty search path'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"e3940000-0000-4000-8000-000000000002","role":"authenticated"}';
select throws_ok(
  $$select delete_or_deactivate_extra('e3940003-0000-4000-8000-000000000001')$$,
  '42501', null, 'a non-admin cannot remove an extra'
);

set local request.jwt.claims to '{"sub":"e3940000-0000-4000-8000-000000000003","role":"authenticated"}';
select throws_ok(
  $$select delete_or_deactivate_extra('e3940003-0000-4000-8000-000000000001')$$,
  '42501', null, 'a reservations worker cannot remove an extra'
);

select set_config('request.jwt.claims', current_setting('extra.admin_claims'), true);

select throws_ok(
  $$select delete_or_deactivate_extra('e3940003-0000-4000-8000-000000000099')$$,
  'P0002', null, 'an unknown extra is rejected'
);

select is(
  delete_or_deactivate_extra('e3940003-0000-4000-8000-000000000001'),
  'deleted', 'an extra never used is deleted'
);

select is(
  (select count(*) from extras where id = 'e3940003-0000-4000-8000-000000000001'),
  0::bigint, 'the deleted extra is gone'
);

select is(
  (select count(*) from extra_compatibility where extra_id = 'e3940003-0000-4000-8000-000000000001'),
  0::bigint, 'the compatibility rows of the deleted extra are gone'
);

select is(
  delete_or_deactivate_extra('e3940003-0000-4000-8000-000000000002'),
  'deactivated', 'an extra used in a scheduled reservation is deactivated'
);

select is(
  (select status::text from extras where id = 'e3940003-0000-4000-8000-000000000002'),
  'inactive', 'the used extra stays as inactive'
);

select is(
  (select updated_by from extras where id = 'e3940003-0000-4000-8000-000000000002'),
  current_setting('extra.admin_id')::uuid, 'the deactivation is recorded under the admin'
);

select is(
  (select count(*) from extra_compatibility where extra_id = 'e3940003-0000-4000-8000-000000000002'),
  1::bigint, 'the compatibility rows of a used extra are kept'
);

select is(
  (select count(*) from reservation_items where extra_id = 'e3940003-0000-4000-8000-000000000002'),
  1::bigint, 'the reservation item of a used extra is intact'
);

select is(
  delete_or_deactivate_extra('e3940003-0000-4000-8000-000000000003'),
  'deactivated', 'an extra used only in a cancelled reservation is deactivated'
);

select is(
  (select status::text from extras where id = 'e3940003-0000-4000-8000-000000000003'),
  'inactive', 'the extra of a cancelled reservation stays as inactive'
);

select is(
  delete_or_deactivate_extra('e3940003-0000-4000-8000-000000000002'),
  'deactivated', 'removing an inactive used extra again stays deactivated'
);

select is(
  (select status::text from extras where id = 'e3940003-0000-4000-8000-000000000004'),
  'active', 'other extras are not touched'
);

select throws_ok(
  $$insert into extras (name, created_by, updated_by) values (' EXTRA BYSTANDER ', current_setting('extra.admin_id')::uuid, current_setting('extra.admin_id')::uuid)$$,
  '23505', null, 'a duplicate name differing in case and spaces is rejected'
);

select * from finish();
rollback;
