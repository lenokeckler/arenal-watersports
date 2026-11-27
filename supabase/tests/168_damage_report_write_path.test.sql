begin;
select plan(7);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones');

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Gear', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, impact_count, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'G-1', 'available', 0,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ insert into damage_reports (unit_id, cause, description, impact_delta)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'collision', 'Golpe', 3) $$,
  '42501', null,
  'operations cannot write a report around the function'
);

select throws_ok(
  $$ insert into damage_reports (unit_id, cause, description, completed_by, completed_at)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'collision', 'Golpe',
             '11111111-1111-1111-1111-111111111111', '2026-01-01') $$,
  '42501', null,
  'nobody can invent who completed a report'
);

select lives_ok(
  $$ select create_damage_report(
       'bbbbbbbb-0000-0000-0000-000000000001', 1, 'collision', 'Golpe') $$,
  'the function still records the report'
);

select is(
  (select impact_count from equipment_units where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  1,
  'the report recorded by the function adds its hits'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select throws_ok(
  $$ insert into damage_reports (unit_id, cause, description)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'collision', 'Golpe') $$,
  '42501', null,
  'administration cannot write around the function either'
);

reset role;

select ok(
  not has_table_privilege('authenticated', 'public.damage_reports', 'insert'),
  'signed in accounts have no insert privilege on the reports'
);

select ok(
  not has_table_privilege('anon', 'public.damage_reports', 'insert'),
  'visitors have no insert privilege on the reports'
);

select * from finish();
rollback;
