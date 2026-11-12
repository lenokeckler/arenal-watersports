begin;
select plan(4);

insert into auth.users(id, email) values
  ('e2800000-0000-4000-8000-000000000001', 'res10-eligibility@arenal.local');
insert into workers(id, username, full_name, base_role)
values ('e2800000-0000-4000-8000-000000000001', 'res10-eligibility', 'RES10 Eligibility', 'reservas');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e2800000-0000-4000-8000-000000000101', 'RES10 Eligibility Rental', 'by_unit', true, true,
   false, 60, 'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000102', 'RES10 Eligibility Tour', 'by_unit', true, true,
   true, 60, 'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000103', 'RES10 Eligibility Missing', 'by_unit', true, true,
   false, 60, 'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');
insert into equipment_units(id, category_id, code, created_by, updated_by)
values
  ('e2800000-0000-4000-8000-000000000201', 'e2800000-0000-4000-8000-000000000101', 'RES10-ELIGIBILITY-RENTAL',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000202', 'e2800000-0000-4000-8000-000000000102', 'RES10-ELIGIBILITY-TOUR',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000203', 'e2800000-0000-4000-8000-000000000103', 'RES10-ELIGIBILITY-MISSING',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');
insert into tariffs(category_id, type, amount_usd, amount_crc, created_by, updated_by)
values
  ('e2800000-0000-4000-8000-000000000101', 'rental', 20, 10000,
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000102', 'rental', 20, 10000,
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');
insert into extras(id, name, status, created_by, updated_by)
values
  ('e2800000-0000-4000-8000-000000000301', 'RES10 Eligibility Active Extra', 'active',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000302', 'RES10 Eligibility Inactive Extra', 'inactive',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');
insert into extra_compatibility(extra_id, unit_id)
values
  ('e2800000-0000-4000-8000-000000000301', 'e2800000-0000-4000-8000-000000000201'),
  ('e2800000-0000-4000-8000-000000000302', 'e2800000-0000-4000-8000-000000000202');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2800000-0000-4000-8000-000000000001","role":"authenticated"}';
select results_eq(
  $$ select name, has_individual_tariff, has_compatible_extras
     from reservable_equipment_categories() where name like 'RES10 Eligibility %' order by name $$,
  $$ values
    ('RES10 Eligibility Missing'::text, false, false),
    ('RES10 Eligibility Rental'::text, true, true),
    ('RES10 Eligibility Tour'::text, false, false) $$,
  'eligibility uses each category reservation type and only active compatible extras'
);
reset role;

insert into tariffs(category_id, type, amount_usd, amount_crc, created_by, updated_by)
values ('e2800000-0000-4000-8000-000000000102', 'tour', 10, 5000,
  'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');
set local role authenticated;
select is((select has_individual_tariff from reservable_equipment_categories()
  where id = 'e2800000-0000-4000-8000-000000000102'), true,
  'guide-only categories use their tour tariff');
select is((select has_compatible_extras from reservable_equipment_categories()
  where id = 'e2800000-0000-4000-8000-000000000102'), false,
  'inactive compatible extras are not offered');
select throws_ok($$ select * from custom_combo_price(jsonb_build_array(
  jsonb_build_object('category_id', 'e2800000-0000-4000-8000-000000000103', 'quantity', 1)), 60) $$,
  'P0001', 'An individual tariff is missing for a custom combo category',
  'quote validation rejects categories without the required tariff');

select * from finish();
rollback;
