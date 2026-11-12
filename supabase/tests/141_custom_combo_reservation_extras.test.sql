begin;
select plan(9);

insert into auth.users(id, email) values
  ('e4100000-0000-4000-8000-000000000001', 'res10-combo-extras@arenal.local');
insert into workers(id, username, full_name, base_role)
values ('e4100000-0000-4000-8000-000000000001', 'res10-combo-extras', 'RES10 Combo Extras', 'reservas');
insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, guide_only,
   default_duration_minutes, created_by, updated_by)
values
  ('e4100000-0000-4000-8000-000000000101', 'RES10 Combo Boat', 'active', 'by_unit', true, false, true,
   60, 'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001'),
  ('e4100000-0000-4000-8000-000000000102', 'RES10 Other Tour Unit', 'active', 'by_unit', true, false, true,
   60, 'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001'),
  ('e4100000-0000-4000-8000-000000000103', 'RES10 Combo Extra Inventory', 'active', 'by_quantity', false, false, false,
   null, 'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001');
insert into equipment_units(id, category_id, code, status, created_by, updated_by)
values
  ('e4100000-0000-4000-8000-000000000201', 'e4100000-0000-4000-8000-000000000101', 'RES10-COMBO-BOAT', 'available',
   'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001'),
  ('e4100000-0000-4000-8000-000000000202', 'e4100000-0000-4000-8000-000000000102', 'RES10-OTHER-TOUR', 'available',
   'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001');
insert into equipment_stock(category_id, quantity_available, updated_by)
values ('e4100000-0000-4000-8000-000000000103', 4, 'e4100000-0000-4000-8000-000000000001');
insert into tariffs(category_id, type, amount_usd, amount_crc, created_by, updated_by)
values
  ('e4100000-0000-4000-8000-000000000101', 'tour', 30, 15000,
   'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001'),
  ('e4100000-0000-4000-8000-000000000102', 'tour', 10, 5000,
   'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001');
insert into extras(id, name, price_usd, price_crc, occupies_category_id, occupies_quantity, created_by, updated_by)
values ('e4100000-0000-4000-8000-000000000301', 'RES10 Combo Physical Extra', 5, 2500,
  'e4100000-0000-4000-8000-000000000103', 1,
  'e4100000-0000-4000-8000-000000000001', 'e4100000-0000-4000-8000-000000000001');
insert into extra_compatibility(extra_id, unit_id)
values ('e4100000-0000-4000-8000-000000000301', 'e4100000-0000-4000-8000-000000000201');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e4100000-0000-4000-8000-000000000001","role":"authenticated"}';
select ok(exists (select 1 from equipment_units as unit
  join equipment_categories as category on category.id = unit.category_id
  where unit.id = 'e4100000-0000-4000-8000-000000000201'
    and unit.status = 'available' and category.status = 'active'
    and category.is_reservable and category.guide_only and not category.units_are_interchangeable),
  'the selected unit is active, reservable and guide-only');
select is((select list_amount_usd from custom_combo_price(
  jsonb_build_array(jsonb_build_object('unit_id', 'e4100000-0000-4000-8000-000000000201')),
  60, array['e4100000-0000-4000-8000-000000000301']::uuid[], 'e4100000-0000-4000-8000-000000000201')),
  35::numeric, 'combo extras add their price once to the equipment tariff');
select throws_ok($$ select * from custom_combo_price(
  jsonb_build_array(jsonb_build_object('unit_id', 'e4100000-0000-4000-8000-000000000202')),
  60, array['e4100000-0000-4000-8000-000000000301']::uuid[], 'e4100000-0000-4000-8000-000000000202') $$,
  'P0001', 'Every selected extra must be active and compatible', 'combo extras must match their selected source unit');
select lives_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Combo With Extra', 'people_count', 1, 'date', '2041-01-01', 'time', '09:00',
  'duration_minutes', 60,
  'items', jsonb_build_array(jsonb_build_object('unit_id', 'e4100000-0000-4000-8000-000000000201')),
  'extra_ids', jsonb_build_array('e4100000-0000-4000-8000-000000000301'),
  'extra_unit_id', 'e4100000-0000-4000-8000-000000000201')) $$,
  'custom combo reservations persist compatible boat extras');
select is((select count(*)::integer from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  where reservation.customer_name = 'RES10 Combo With Extra'
    and item.extra_id = 'e4100000-0000-4000-8000-000000000301'
    and item.extra_unit_id = 'e4100000-0000-4000-8000-000000000201'),
  1, 'the extra is associated with the concrete boat in reservation details');
select is((select list_amount_crc from reservation_pricing as pricing
  join reservations as reservation on reservation.id = pricing.reservation_id
  where reservation.customer_name = 'RES10 Combo With Extra'),
  17500::numeric, 'reservation pricing includes the extra without charging the boat tariff twice');
select is((select free from category_availability('e4100000-0000-4000-8000-000000000103',
  '2041-01-01 15:00:00+00', '2041-01-01 16:00:00+00', null)),
  3, 'inventory-bearing extras reduce available stock');
select is((select extra.name || ':' || unit.code from reservation_items as item
  join reservations as reservation on reservation.id = item.reservation_id
  join extras as extra on extra.id = item.extra_id
  join equipment_units as unit on unit.id = item.extra_unit_id
  where reservation.customer_name = 'RES10 Combo With Extra'),
  'RES10 Combo Physical Extra:RES10-COMBO-BOAT', 'the detail relationship resolves the extra and its selected boat');
select throws_ok($$ select create_custom_combo_reservation(jsonb_build_object(
  'customer_name', 'RES10 Missing Extra Unit', 'people_count', 1, 'date', '2041-01-02', 'time', '09:00',
  'duration_minutes', 60,
  'items', jsonb_build_array(jsonb_build_object('unit_id', 'e4100000-0000-4000-8000-000000000201')),
  'extra_ids', jsonb_build_array('e4100000-0000-4000-8000-000000000301'))) $$,
  'P0001', 'A selected combo unit is required for extras', 'selected extras require their concrete source unit');
reset role;
select * from finish();
rollback;
