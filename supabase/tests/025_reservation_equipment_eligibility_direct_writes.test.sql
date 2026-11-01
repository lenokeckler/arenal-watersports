begin;
select plan(13);

insert into auth.users (id, email) values
  ('e2800000-0000-4000-8000-000000000001', 'res17-direct@arenal.local'),
  ('e2800000-0000-4000-8000-000000000002', 'res17-direct-ops@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e2800000-0000-4000-8000-000000000001', 'res17-direct', 'RES17 Direct', 'reservas'),
  ('e2800000-0000-4000-8000-000000000002', 'res17-direct-ops', 'RES17 Direct Ops', 'operaciones');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values ('e2800000-0000-4000-8000-000000000101', 'RES17 Direct category', 'by_unit', true, true, 60,
        'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');
insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('e2800000-0000-4000-8000-000000000201', 'e2800000-0000-4000-8000-000000000101', 'RES17-DIRECT-GOOD', 'available',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000202', 'e2800000-0000-4000-8000-000000000101', 'RES17-DIRECT-BAD', 'damaged',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('e2800000-0000-4000-8000-000000000301', 'RES17 Direct scheduled', 1, 'rental', '2035-06-01 15:00:00+00', 60, 'scheduled',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000302', 'RES17 Direct dispatched', 1, 'rental', '2035-06-01 15:00:00+00', 60, 'dispatched',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001'),
  ('e2800000-0000-4000-8000-000000000303', 'RES17 Direct closed', 1, 'rental', '2035-06-01 15:00:00+00', 60, 'closed',
   'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');
insert into extras (id, name, created_by, updated_by)
values ('e2800000-0000-4000-8000-000000000501', 'RES17 Equipment-free extra',
        'e2800000-0000-4000-8000-000000000001', 'e2800000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2800000-0000-4000-8000-000000000001","role":"authenticated"}';
select throws_ok(
  $$ insert into reservation_items (reservation_id, unit_id) values
    ('e2800000-0000-4000-8000-000000000301', 'e2800000-0000-4000-8000-000000000202') $$,
  'P0001', 'Equipment category is not available for reservation',
  'direct writes cannot select a damaged unit from an otherwise usable category'
);
select lives_ok(
  $$ insert into reservation_items (id, reservation_id, category_id, quantity) values
    ('e2800000-0000-4000-8000-000000000401', 'e2800000-0000-4000-8000-000000000301',
     'e2800000-0000-4000-8000-000000000101', 2) $$,
  'direct category commitments retain positive quantity semantics'
);
select throws_ok(
  $$ update reservation_items set unit_id = 'e2800000-0000-4000-8000-000000000202', category_id = null, quantity = null
    where id = 'e2800000-0000-4000-8000-000000000401' $$,
  'P0001', 'Equipment category is not available for reservation',
  'changing a scheduled commitment cannot bypass physical eligibility'
);
reset role;
update equipment_units set status = 'in_maintenance' where id = 'e2800000-0000-4000-8000-000000000201';
set local role authenticated;
select throws_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity) values
    ('e2800000-0000-4000-8000-000000000301', 'e2800000-0000-4000-8000-000000000101', 1) $$,
  'P0001', 'Equipment category is not available for reservation',
  'direct inserts reject a category after its last available unit enters maintenance'
);
select lives_ok(
  $$ update reservation_items set quantity = quantity, usage_out = 4
    where id = 'e2800000-0000-4000-8000-000000000401' $$,
  'unchanged historical commitments remain editable after equipment becomes unavailable'
);
select throws_ok(
  $$ update reservation_items set quantity = 3 where id = 'e2800000-0000-4000-8000-000000000401' $$,
  'P0001', 'Equipment category is not available for reservation',
  'increasing a scheduled commitment rechecks eligibility'
);
select lives_ok(
  $$ insert into reservation_items (reservation_id, unit_id) values
    ('e2800000-0000-4000-8000-000000000302', 'e2800000-0000-4000-8000-000000000202') $$,
  'dispatched records preserve their equipment history without revalidating its current condition'
);
select lives_ok(
  $$ insert into reservation_items (reservation_id, unit_id) values
    ('e2800000-0000-4000-8000-000000000303', 'e2800000-0000-4000-8000-000000000202') $$,
  'closed records preserve unavailable equipment in their history'
);
select lives_ok(
  $$ insert into reservation_items (reservation_id, extra_id) values
    ('e2800000-0000-4000-8000-000000000301', 'e2800000-0000-4000-8000-000000000501') $$,
  'extra-only items do not require unrelated physical inventory'
);
select throws_ok(
  $$ update reservation_items set reservation_id = 'e2800000-0000-4000-8000-000000000301'
    where reservation_id = 'e2800000-0000-4000-8000-000000000302' $$,
  'P0001', 'Equipment category is not available for reservation',
  'moving a historical commitment into a scheduled reservation revalidates its equipment'
);
set local request.jwt.claims to '{"sub":"e2800000-0000-4000-8000-000000000001","role":"postgres"}';
select throws_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity) values
    ('e2800000-0000-4000-8000-000000000301', 'e2800000-0000-4000-8000-000000000101', 1) $$,
  'P0001', 'Equipment category is not available for reservation',
  'JWT role text cannot impersonate a trusted database role'
);
reset role;
update equipment_units set status = 'available' where id = 'e2800000-0000-4000-8000-000000000201';
set local request.jwt.claims to '{"sub":"e2800000-0000-4000-8000-000000000002","role":"authenticated"}';
set local role authenticated;
select lives_ok(
  $$ insert into reservation_items (reservation_id, unit_id) values
    ('e2800000-0000-4000-8000-000000000301', 'e2800000-0000-4000-8000-000000000201') $$,
  'Operations keeps its existing right to assign an available interchangeable unit'
);
select is((select quantity from reservation_items where id = 'e2800000-0000-4000-8000-000000000401'), 2,
  'rejected changes preserve the original commitment');
reset role;
select * from finish();
rollback;
