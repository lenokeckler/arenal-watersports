begin;
select plan(8);

insert into auth.users (id, email)
values ('e2900000-0000-4000-8000-000000000001', 'res17-identity@arenal.local');
insert into workers (id, username, full_name, base_role)
values ('e2900000-0000-4000-8000-000000000001', 'res17-identity', 'RES17 Identity', 'reservas');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
select fixture.id::uuid, fixture.name, fixture.mode::tracking_mode, true, fixture.interchangeable, 60,
  'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'
from (values
  ('e2900000-0000-4000-8000-000000000101', 'RES17 Identity boats', 'by_unit', false),
  ('e2900000-0000-4000-8000-000000000102', 'RES17 Identity kayaks', 'by_unit', true),
  ('e2900000-0000-4000-8000-000000000103', 'RES17 Identity stock', 'by_quantity', true)
) as fixture(id, name, mode, interchangeable);
insert into equipment_units
  (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by)
select fixture.id::uuid, fixture.category_id::uuid, fixture.code, fixture.status::unit_status,
  case when fixture.status = 'decommissioned' then timestamptz '2035-01-01 00:00:00+00' end,
  case when fixture.status = 'decommissioned' then 'Fixture retirement' end,
  'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'
from (values
  ('e2900000-0000-4000-8000-000000000201', 'e2900000-0000-4000-8000-000000000101', 'RES17-IDENTITY-AVAILABLE', 'available'),
  ('e2900000-0000-4000-8000-000000000202', 'e2900000-0000-4000-8000-000000000101', 'RES17-IDENTITY-RETIRED', 'decommissioned'),
  ('e2900000-0000-4000-8000-000000000203', 'e2900000-0000-4000-8000-000000000102', 'RES17-IDENTITY-KAYAK', 'available')
) as fixture(id, category_id, code, status);
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e2900000-0000-4000-8000-000000000103', 1, 'e2900000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select lock_reservable_category('e2900000-0000-4000-8000-000000000101', 'e2900000-0000-4000-8000-000000000203') $$,
  'P0001', 'Equipment category is not available for reservation',
  'an available unit from another category cannot satisfy the selected category'
);
select throws_ok(
  $$ select lock_reservable_category('e2900000-0000-4000-8000-000000000101', 'e2900000-0000-4000-8000-000000000299') $$,
  'P0001', 'Equipment category is not available for reservation',
  'a missing selected unit cannot fall back to an available sibling'
);
select throws_ok(
  $$ select lock_reservable_category('e2900000-0000-4000-8000-000000000103', 'e2900000-0000-4000-8000-000000000201') $$,
  'P0001', 'Equipment category is not available for reservation',
  'positive stock cannot satisfy a concrete unit selection'
);
select throws_ok(
  $$ select lock_reservable_category('e2900000-0000-4000-8000-000000000199') $$,
  'P0001', 'Equipment category is not available for reservation',
  'an unknown category fails with a controlled eligibility error'
);
select throws_ok(
  $$ select lock_reservable_category(null) $$,
  'P0001', 'Equipment category is not available for reservation',
  'a missing category fails with a controlled eligibility error'
);
select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES17 Retired selection', 'people_count', 1,
    'date', '2035-07-01', 'time', '09:00', 'duration_minutes', 60,
    'unit_id', 'e2900000-0000-4000-8000-000000000202')) $$,
  'P0001', 'Equipment unit is not available for reservation',
  'a retired concrete unit remains rejected when its category has another available unit'
);
select is((select count(*)::integer from reservations where customer_name = 'RES17 Retired selection'), 0,
  'rejecting a retired concrete unit leaves no reservation behind');
select is((select count(*)::integer from reservable_equipment_categories()
  where id = 'e2900000-0000-4000-8000-000000000101'), 1,
  'rejecting one retired unit keeps its available sibling category offered');

reset role;
select * from finish();
rollback;
