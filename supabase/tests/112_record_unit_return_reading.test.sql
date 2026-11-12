begin;
select plan(17);

insert into auth.users (id, email) values
  ('e3100000-0000-4000-8000-000000000001', 'res20-admin@arenal.local'),
  ('e3100000-0000-4000-8000-000000000002', 'res20-reservas@arenal.local'),
  ('e3100000-0000-4000-8000-000000000003', 'res20-ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e3100000-0000-4000-8000-000000000001', 'res20-admin', 'RES20 Admin', 'res20-admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('e3100000-0000-4000-8000-000000000002', 'res20-reservas', 'RES20 Reservas', 'reservas'),
  ('e3100000-0000-4000-8000-000000000003', 'res20-ops', 'RES20 Ops', 'operaciones');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes,
   consumes_fuel, created_by, updated_by)
values ('e3100000-0000-4000-8000-000000000101', 'RES20 Lancha', 'active', 'by_unit', true, false, 60,
        true, 'e3100000-0000-4000-8000-000000000001', 'e3100000-0000-4000-8000-000000000001');

insert into equipment_units (id, category_id, code, status, fuel_max, fuel_level, usage_total, created_by, updated_by)
values ('e3100000-0000-4000-8000-000000000201', 'e3100000-0000-4000-8000-000000000101', 'RES20-LANCHA-1', 'available',
        4, 3, 100, 'e3100000-0000-4000-8000-000000000001', 'e3100000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3100000-0000-4000-8000-000000000002","role":"authenticated"}';

update equipment_units set fuel_level = 0 where id = 'e3100000-0000-4000-8000-000000000201';

select is(
  (select fuel_level from equipment_units where id = 'e3100000-0000-4000-8000-000000000201'),
  3,
  'reservas cannot update a unit directly'
);

select lives_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', 1, 112.5) $$,
  'reservas records the return reading through the helper'
);

select is(
  (select fuel_level from equipment_units where id = 'e3100000-0000-4000-8000-000000000201'),
  1,
  'the unit fuel level is updated'
);

select is(
  (select usage_total from equipment_units where id = 'e3100000-0000-4000-8000-000000000201'),
  112.5,
  'the unit usage total is updated'
);

select lives_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', null, 120) $$,
  'a null fuel level is accepted'
);

select is(
  (select fuel_level from equipment_units where id = 'e3100000-0000-4000-8000-000000000201'),
  1,
  'a null fuel level leaves the column untouched'
);

select throws_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000009999', 1, 1) $$,
  'P0001', 'Equipment unit was not found',
  'an unknown unit is refused'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3100000-0000-4000-8000-000000000003","role":"authenticated"}';

select throws_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', 0, 130) $$,
  'P0001', 'Reservations access is required',
  'a worker without the reservas area cannot record a reading'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3100000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', 5, 130) $$,
  '23514', null,
  'a fuel level above the unit maximum is refused'
);

select throws_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', -1, 130) $$,
  '23514', null,
  'a negative fuel level is refused'
);

select lives_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', 0, 130) $$,
  'an empty tank is a valid reading'
);

select is(
  (select fuel_level from equipment_units where id = 'e3100000-0000-4000-8000-000000000201'),
  0,
  'zero fuel is stored and not treated as missing'
);

select lives_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', null, null) $$,
  'a call with both readings null is accepted'
);

select is(
  (select usage_total from equipment_units where id = 'e3100000-0000-4000-8000-000000000201'),
  130::numeric,
  'a null usage total leaves the column untouched'
);

select throws_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', 1, -5) $$,
  'P0001', 'Unit usage reading cannot go backwards',
  'a negative usage total is refused'
);

select throws_ok(
  $$ select private.record_unit_return_reading('e3100000-0000-4000-8000-000000000201', 1, 50) $$,
  'P0001', 'Unit usage reading cannot go backwards',
  'a usage total below the unit current total is refused'
);

reset role;

select is(
  (select usage_total from equipment_units where id = 'e3100000-0000-4000-8000-000000000201'),
  130::numeric,
  'a refused call leaves the unit untouched'
);

select * from finish();
rollback;
