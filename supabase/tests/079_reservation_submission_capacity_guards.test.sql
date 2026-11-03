begin;
select plan(9);

insert into auth.users (id, email) values
  ('e7900000-0000-4000-8000-000000000001', 'res15-capacity@arenal.local'),
  ('e7900000-0000-4000-8000-000000000002', 'res15-operations@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e7900000-0000-4000-8000-000000000001', 'res15-capacity', 'RES15 Capacity', 'reservas'),
  ('e7900000-0000-4000-8000-000000000002', 'res15-operations', 'RES15 Operations', 'operaciones');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values
  ('e7900000-0000-4000-8000-000000000101', 'RES15 Quantity', 'by_quantity', true, false, 60,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000102', 'RES15 Unit', 'by_unit', true, false, 60,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000103', 'RES15 Split quantity', 'by_quantity', true, false, 60,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e7900000-0000-4000-8000-000000000101', 3, 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000103', 3, 'e7900000-0000-4000-8000-000000000001');
insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values ('e7900000-0000-4000-8000-000000000201', 'e7900000-0000-4000-8000-000000000102', 'RES15-UNIT-1', 'available',
        'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001');
insert into combos (id, name, audience, package_price_usd, created_by, updated_by)
values ('e7900000-0000-4000-8000-000000000301', 'RES15 Combo', 'foreign', 100,
        'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001');
insert into combo_items (combo_id, category_id, quantity)
values ('e7900000-0000-4000-8000-000000000301', 'e7900000-0000-4000-8000-000000000101', 2);
insert into reservations
  (id, customer_name, people_count, type, combo_id, starts_at, duration_minutes, created_by, updated_by)
values
  ('e7900000-0000-4000-8000-000000000401', 'RES15 Quantity commitment', 1, 'rental', null,
   '2035-04-11 15:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000402', 'RES15 Unit commitment', 1, 'rental', null,
   '2035-04-12 15:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000403', 'RES15 Combo commitment', 1, 'combo',
   'e7900000-0000-4000-8000-000000000301', '2035-04-12 17:00:00+00', 60,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000404', 'RES15 Quantity update', 1, 'rental', null,
   '2035-04-12 15:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000405', 'RES15 Quantity adjacent', 1, 'rental', null,
   '2035-04-12 16:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000406', 'RES15 Quantity combo', 1, 'rental', null,
   '2035-04-12 17:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000407', 'RES15 Closed commitment', 1, 'rental', null,
   '2035-04-12 18:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000408', 'RES15 Closed target', 1, 'rental', null,
   '2035-04-12 18:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000409', 'RES15 Split first', 1, 'rental', null,
   '2035-04-12 19:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000410', 'RES15 Split second', 1, 'rental', null,
   '2035-04-12 19:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000411', 'RES15 Split target', 1, 'rental', null,
   '2035-04-12 19:00:00+00', 60, 'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001');
insert into reservation_items
  (id, reservation_id, unit_id, category_id, quantity, created_by, updated_by)
values
  ('e7900000-0000-4000-8000-000000000501', 'e7900000-0000-4000-8000-000000000401', null,
   'e7900000-0000-4000-8000-000000000101', 2,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000502', 'e7900000-0000-4000-8000-000000000402',
   'e7900000-0000-4000-8000-000000000201', null, null,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000503', 'e7900000-0000-4000-8000-000000000407', null,
   'e7900000-0000-4000-8000-000000000101', 3,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000504', 'e7900000-0000-4000-8000-000000000409', null,
   'e7900000-0000-4000-8000-000000000103', 1,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001'),
  ('e7900000-0000-4000-8000-000000000505', 'e7900000-0000-4000-8000-000000000410', null,
   'e7900000-0000-4000-8000-000000000103', 1,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001');
update reservations
set status = 'closed', closed_at = '2035-04-12 19:00:00+00'
where id = 'e7900000-0000-4000-8000-000000000407';
insert into reservation_items
  (reservation_id, category_id, quantity, created_by, updated_by)
values
  ('e7900000-0000-4000-8000-000000000404', 'e7900000-0000-4000-8000-000000000101', 2,
   'e7900000-0000-4000-8000-000000000001', 'e7900000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e7900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity)
     values ('e7900000-0000-4000-8000-000000000404', 'e7900000-0000-4000-8000-000000000101', 2) $$,
  'P0001', 'Equipment category quantity is not available for reservation',
  'quantity commitments cannot exceed available stock for an overlapping window'
);
select lives_ok(
  $$ update reservation_items set quantity = 3
     where reservation_id = 'e7900000-0000-4000-8000-000000000404' $$,
  'editing a quantity commitment excludes that item from its own capacity check'
);
select lives_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity)
     values ('e7900000-0000-4000-8000-000000000405', 'e7900000-0000-4000-8000-000000000101', 3) $$,
  'quantity capacity is reusable in an adjacent non-overlapping window'
);
select throws_ok(
  $$ insert into reservation_items (reservation_id, unit_id)
     values ('e7900000-0000-4000-8000-000000000404', 'e7900000-0000-4000-8000-000000000201') $$,
  'P0001', 'Equipment unit conflicts with another reservation',
  'a concrete unit cannot be committed to overlapping reservations'
);
select lives_ok(
  $$ insert into reservation_items (reservation_id, unit_id)
     values ('e7900000-0000-4000-8000-000000000405', 'e7900000-0000-4000-8000-000000000201') $$,
  'a concrete unit can be committed again after the prior window ends'
);
select throws_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity)
     values ('e7900000-0000-4000-8000-000000000406', 'e7900000-0000-4000-8000-000000000101', 2) $$,
  'P0001', 'Equipment category quantity is not available for reservation',
  'combo category quantities count against the overlapping category capacity'
);
select lives_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity)
     values ('e7900000-0000-4000-8000-000000000408', 'e7900000-0000-4000-8000-000000000101', 3) $$,
  'closed reservation quantities no longer consume category capacity'
);
select throws_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity)
     values ('e7900000-0000-4000-8000-000000000411', 'e7900000-0000-4000-8000-000000000103', 2) $$,
  'P0001', 'Equipment category quantity is not available for reservation',
  'split commitments are summed before category capacity is checked'
);

reset role;
set local request.jwt.claims to '{"sub":"e7900000-0000-4000-8000-000000000002","role":"authenticated"}';
set local role authenticated;
select lives_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity)
     values ('e7900000-0000-4000-8000-000000000405', 'e7900000-0000-4000-8000-000000000101', 1) $$,
  'Operations retains direct quantity item insertion access'
);

reset role;
select * from finish();
rollback;
