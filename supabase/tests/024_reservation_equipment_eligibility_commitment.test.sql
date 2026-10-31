begin;
select plan(12);

insert into auth.users (id, email) values
  ('e2700000-0000-4000-8000-000000000001', 'res17-commit@arenal.local'),
  ('e2700000-0000-4000-8000-000000000002', 'res17-ops@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e2700000-0000-4000-8000-000000000001', 'res17-commit', 'RES17 Reservas', 'reservas'),
  ('e2700000-0000-4000-8000-000000000002', 'res17-ops', 'RES17 Operations', 'operaciones');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values
  ('e2700000-0000-4000-8000-000000000101', 'RES17 Interchangeable', 'by_unit', true, true, 60,
   'e2700000-0000-4000-8000-000000000001', 'e2700000-0000-4000-8000-000000000001'),
  ('e2700000-0000-4000-8000-000000000102', 'RES17 Stock', 'by_quantity', true, true, 60,
   'e2700000-0000-4000-8000-000000000001', 'e2700000-0000-4000-8000-000000000001');
insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values ('e2700000-0000-4000-8000-000000000201', 'e2700000-0000-4000-8000-000000000101', 'RES17-COMMIT', 'damaged',
        'e2700000-0000-4000-8000-000000000001', 'e2700000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, quantity_damaged, updated_by)
values ('e2700000-0000-4000-8000-000000000102', 0, 3, 'e2700000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2700000-0000-4000-8000-000000000001","role":"authenticated"}';
select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES17 Failed unit', 'people_count', 1,
    'date', '2035-05-02', 'time', '09:00', 'duration_minutes', 60,
    'category_id', 'e2700000-0000-4000-8000-000000000101', 'quantity', 1)) $$,
  'P0001', 'Equipment category is not available for reservation',
  'the RPC rejects a category whose last available unit became damaged'
);
select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES17 Failed stock', 'people_count', 1,
    'date', '2035-05-02', 'time', '09:00', 'duration_minutes', 60,
    'category_id', 'e2700000-0000-4000-8000-000000000102', 'quantity', 1)) $$,
  'P0001', 'Equipment category is not available for reservation',
  'damaged stock is not usable stock'
);
select is((select count(*)::integer from reservations where customer_name like 'RES17 Failed%'), 0,
  'rejected equipment leaves no reservation behind');

reset role;
update equipment_units set status = 'available' where id = 'e2700000-0000-4000-8000-000000000201';
update equipment_stock set quantity_available = 1 where category_id = 'e2700000-0000-4000-8000-000000000102';
set local role authenticated;
select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES17 Returned unit', 'people_count', 1,
    'date', '2035-05-02', 'time', '09:00', 'duration_minutes', 60,
    'category_id', 'e2700000-0000-4000-8000-000000000101', 'quantity', 3)) $$,
  'returning equipment to service permits category quantities above physical capacity'
);
select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES17 Returned stock', 'people_count', 1,
    'date', '2035-05-02', 'time', '09:00', 'duration_minutes', 60,
    'category_id', 'e2700000-0000-4000-8000-000000000102', 'quantity', 3)) $$,
  'positive available stock permits commitments without a capacity ceiling'
);
select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES17 Overbooked', 'people_count', 1,
    'date', '2035-05-02', 'time', '09:00', 'duration_minutes', 60,
    'category_id', 'e2700000-0000-4000-8000-000000000101', 'quantity', 3)) $$,
  'physical eligibility does not introduce collision blocking for category commitments'
);

reset role;
set local request.jwt.claims to '{"sub":"e2700000-0000-4000-8000-000000000002","role":"authenticated"}';
set local role authenticated;
select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES17 Operations', 'people_count', 1,
    'date', '2035-05-02', 'time', '09:00', 'duration_minutes', 60,
    'category_id', 'e2700000-0000-4000-8000-000000000101', 'quantity', 1)) $$,
  'P0001', 'Reservations access is required',
  'physical eligibility does not grant Operations reservation creation'
);
reset role;
update workers set status = 'blocked' where id = 'e2700000-0000-4000-8000-000000000001';
set local request.jwt.claims to '{"sub":"e2700000-0000-4000-8000-000000000001","role":"authenticated"}';
set local role authenticated;
select throws_ok($$ select lock_reservable_category('e2700000-0000-4000-8000-000000000101') $$,
  'P0001', 'Equipment reservation access is required', 'blocked workers cannot acquire eligibility locks');
reset role;
set local request.jwt.claims to '{"role":"authenticated"}';
set local role authenticated;
select throws_ok($$ select lock_reservable_category('e2700000-0000-4000-8000-000000000101') $$,
  'P0001', 'Authenticated worker is required', 'an authenticated role without an identity cannot lock inventory');
reset role;
set local request.jwt.claims to '{"role":"anon"}';
set local role anon;
select throws_ok($$ select lock_reservable_category('e2700000-0000-4000-8000-000000000101') $$,
  '42501', null, 'anonymous users cannot call the eligibility lock');
select throws_ok($$ select reservable_equipment_categories() $$,
  '42501', null, 'anonymous users cannot list reservable equipment');
reset role;
select is((select count(*)::integer from reservations where customer_name = 'RES17 Operations'), 0,
  'unauthorized creation leaves no reservation behind');
select * from finish();
rollback;
