begin;
select plan(14);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'res', 'Res', 'reservas');

insert into equipment_categories
  (id, name, tracking_mode, has_motor, usage_metric, consumes_fuel, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Motor gear', 'by_unit', true, 'engine_hours', true,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-RETIRED', 'decommissioned',
   now(), 'Sold', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_units set usage_total = 100, next_oil_change_at = 100
 where id = 'bbbbbbbb-0000-0000-0000-000000000001';

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select register_maintenance_job(
  'bbbbbbbb-0000-0000-0000-000000000001', 'tire_change', '2026-09-06');

select is(
  (select work_type || ':' || performed_at::text || ':' || is_external::text
     from maintenance_records where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'tire_change:2026-09-06:false',
  'a work is registered with its type and its date'
);

select is(
  (select cost_amount is null and cost_currency is null
     from maintenance_records where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  true,
  'the cost stays empty when the work cost nothing'
);

select is(
  (select created_by from maintenance_records where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  '22222222-2222-2222-2222-222222222222'::uuid,
  'the work is registered in the name of who did it'
);

select register_maintenance_job(
  'bbbbbbbb-0000-0000-0000-000000000001', 'part_change', '2026-09-06',
  'New handlebar', 35000, 'CRC', true);

select is(
  (select cost_amount::text || ':' || cost_currency::text || ':' || is_external::text
     from maintenance_records where work_type = 'part_change'),
  '35000.00:CRC:true',
  'the cost keeps its currency and the external mark is kept apart from the cost'
);

select is(
  (select next_oil_change_at from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  100::numeric,
  'a work that is not an oil change leaves the threshold alone'
);

select throws_ok(
  $$ select register_maintenance_job(
       'bbbbbbbb-0000-0000-0000-000000000001', 'oil_change', '2026-09-06') $$,
  '23514',
  null,
  'an oil change must define the next threshold'
);

select throws_ok(
  $$ select register_maintenance_job(
       'bbbbbbbb-0000-0000-0000-000000000001', 'oil_change', '2026-09-06',
       null, null, null, false, 90) $$,
  '23514',
  null,
  'the next threshold must be above the accumulated usage'
);

select register_maintenance_job(
  'bbbbbbbb-0000-0000-0000-000000000001', 'oil_change', '2026-09-06',
  null, null, null, false, 150);

select is(
  (select next_oil_change_at from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  150::numeric,
  'an oil change defines the threshold of the next notice'
);

select throws_ok(
  $$ select register_maintenance_job(
       'bbbbbbbb-0000-0000-0000-000000000001', 'tire_change', '2026-09-06',
       null, null, null, false, 200) $$,
  '23514',
  null,
  'only an oil change defines a threshold'
);

select throws_ok(
  $$ select register_maintenance_job(
       'bbbbbbbb-0000-0000-0000-000000000001', 'tire_change', '2026-09-06',
       null, 1000, null) $$,
  '23514',
  null,
  'a cost without currency is refused'
);

select throws_ok(
  $$ select register_maintenance_job(
       'bbbbbbbb-0000-0000-0000-000000000001', 'other', '2026-09-06') $$,
  '23514',
  null,
  'a work of another type needs a description'
);

select throws_ok(
  $$ select register_maintenance_job(
       'bbbbbbbb-0000-0000-0000-000000000001', 'welding', '2026-09-06') $$,
  '22023',
  null,
  'a type of work that does not exist is refused'
);

select throws_ok(
  $$ select register_maintenance_job(
       'bbbbbbbb-0000-0000-0000-000000000002', 'tire_change', '2026-09-06') $$,
  '55000',
  null,
  'a decommissioned unit takes no maintenance'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select throws_ok(
  $$ select register_maintenance_job(
       'bbbbbbbb-0000-0000-0000-000000000001', 'tire_change', '2026-09-06') $$,
  '42501',
  null,
  'a worker without the operations area cannot register a work'
);

select * from finish();
rollback;
