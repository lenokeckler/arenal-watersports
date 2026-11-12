begin;
select plan(7);
insert into auth.users(id, email) values ('e4200000-0000-4000-8000-000000000001', 'res10-unit-price@arenal.local');
insert into workers(id, username, full_name, base_role) values
  ('e4200000-0000-4000-8000-000000000001', 'res10-unit-price', 'RES10 Unit Price', 'reservas');
insert into equipment_categories(id, name, tracking_mode, is_reservable, units_are_interchangeable, guide_only, default_duration_minutes, created_by, updated_by)
values ('e4200000-0000-4000-8000-000000000101', 'RES10 Unit Tour', 'by_unit', true, false, true, 60,
  'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001');
insert into equipment_units(id, category_id, code, status, created_by, updated_by) values
  ('e4200000-0000-4000-8000-000000000201', 'e4200000-0000-4000-8000-000000000101', 'RES10-UNIT-PRICE', 'available',
   'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001'),
  ('e4200000-0000-4000-8000-000000000202', 'e4200000-0000-4000-8000-000000000101', 'RES10-UNIT-UNAVAILABLE', 'in_maintenance',
   'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001');
insert into tariffs(category_id, type, amount_usd, amount_crc, created_by, updated_by) values
  ('e4200000-0000-4000-8000-000000000101', 'tour', 80, 40000,
   'e4200000-0000-4000-8000-000000000001', 'e4200000-0000-4000-8000-000000000001');
set local role authenticated;
set local request.jwt.claims to '{"sub":"e4200000-0000-4000-8000-000000000001","role":"authenticated"}';
select is((select list_amount_usd from custom_combo_price(jsonb_build_array(jsonb_build_object('unit_id', 'e4200000-0000-4000-8000-000000000201')), 30)), 40::numeric,
  'unit commitment uses its category tariff with quantity one');
select is((select list_amount_crc from custom_combo_price(jsonb_build_array(jsonb_build_object('unit_id', 'e4200000-0000-4000-8000-000000000201')), 30)), 20000::numeric,
  'unit commitment calculates CRC from the resolved category');
select throws_ok($$ select custom_combo_price(jsonb_build_array(jsonb_build_object('unit_id', 'e4200000-0000-4000-8000-000000000299')), 60) $$,
  'P0001', 'Every custom combo selection must be reservable', 'unknown units cannot be priced');
select throws_ok($$ select custom_combo_price(jsonb_build_array(jsonb_build_object('unit_id', 'e4200000-0000-4000-8000-000000000202')), 60) $$,
  'P0001', 'Every custom combo selection must be reservable', 'unavailable units cannot be priced');
select throws_ok($$ select custom_combo_price(jsonb_build_array(jsonb_build_object('unit_id', 'e4200000-0000-4000-8000-000000000201', 'quantity', 1)), 60) $$,
  'P0001', 'Custom combo equipment selections are invalid', 'a unit commitment cannot include quantity');
select throws_ok($$ select custom_combo_price(jsonb_build_array(jsonb_build_object('category_id', 'e4200000-0000-4000-8000-000000000101', 'quantity', 1)), 60) $$,
  'P0001', 'Every custom combo category must be reservable', 'non-interchangeable categories require a concrete unit');
select throws_ok($$ select custom_combo_price(jsonb_build_array(jsonb_build_object('unit_id', 'e4200000-0000-4000-8000-000000000201'), jsonb_build_object('category_id', 'e4200000-0000-4000-8000-000000000101', 'quantity', 1)), 60) $$,
  'P0001', 'Custom combo equipment categories cannot repeat', 'a category and its concrete unit cannot appear twice');
select * from finish();
rollback;
