begin;
select plan(7);

insert into auth.users (id, email)
values ('e2600000-0000-4000-8000-000000000001', 'res17-query@arenal.local');
insert into workers (id, username, full_name, base_role)
values ('e2600000-0000-4000-8000-000000000001', 'res17-query', 'RES17 Query', 'reservas');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
select fixture.id::uuid, fixture.name, fixture.mode::tracking_mode, fixture.reservable, true, 60,
  'e2600000-0000-4000-8000-000000000001', 'e2600000-0000-4000-8000-000000000001'
from (values
  ('e2600000-0000-4000-8000-000000000101', 'RES17 Mixed', 'by_unit', true),
  ('e2600000-0000-4000-8000-000000000102', 'RES17 Unusable', 'by_unit', true),
  ('e2600000-0000-4000-8000-000000000103', 'RES17 Empty', 'by_unit', true),
  ('e2600000-0000-4000-8000-000000000104', 'RES17 Available stock', 'by_quantity', true),
  ('e2600000-0000-4000-8000-000000000105', 'RES17 Unusable stock', 'by_quantity', true),
  ('e2600000-0000-4000-8000-000000000106', 'RES17 Not reservable', 'by_unit', false),
  ('e2600000-0000-4000-8000-000000000107', 'RES17 Inactive', 'by_unit', true)
) as fixture(id, name, mode, reservable);
update equipment_categories set status = 'inactive'
where id = 'e2600000-0000-4000-8000-000000000107';
insert into equipment_units (category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by)
select fixture.category_id::uuid, fixture.code, fixture.status::unit_status,
  case when fixture.status = 'decommissioned' then timestamptz '2035-01-01 00:00:00+00' end,
  case when fixture.status = 'decommissioned' then 'Fixture retirement' end,
  'e2600000-0000-4000-8000-000000000001', 'e2600000-0000-4000-8000-000000000001'
from (values
  ('e2600000-0000-4000-8000-000000000101', 'RES17-MIXED-AVAILABLE', 'available'),
  ('e2600000-0000-4000-8000-000000000101', 'RES17-MIXED-DAMAGED', 'damaged'),
  ('e2600000-0000-4000-8000-000000000102', 'RES17-MAINTENANCE', 'in_maintenance'),
  ('e2600000-0000-4000-8000-000000000102', 'RES17-DAMAGED', 'damaged'),
  ('e2600000-0000-4000-8000-000000000102', 'RES17-REPAIR', 'in_repair'),
  ('e2600000-0000-4000-8000-000000000102', 'RES17-RETIRED', 'decommissioned'),
  ('e2600000-0000-4000-8000-000000000106', 'RES17-NOT-RESERVABLE', 'available'),
  ('e2600000-0000-4000-8000-000000000107', 'RES17-INACTIVE', 'available')
) as fixture(category_id, code, status);
insert into equipment_stock (category_id, quantity_available, quantity_damaged, quantity_in_repair, updated_by)
values
  ('e2600000-0000-4000-8000-000000000104', 1, 2, 3, 'e2600000-0000-4000-8000-000000000001'),
  ('e2600000-0000-4000-8000-000000000105', 0, 2, 3, 'e2600000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2600000-0000-4000-8000-000000000001","role":"authenticated"}';
select results_eq(
  $$ select name from reservable_equipment_categories() where name like 'RES17 %' order by name $$,
  $$ values ('RES17 Available stock'::text), ('RES17 Mixed'::text) $$,
  'only categories with available physical inventory are offered'
);
select is((select count(*)::integer from reservable_equipment_categories()
  where id = 'e2600000-0000-4000-8000-000000000102'), 0,
  'maintenance, damage, repair and retirement do not make a category eligible');
select lives_ok($$ select lock_reservable_category('e2600000-0000-4000-8000-000000000101') $$,
  'a mixed category remains reservable while one unit is available');
select throws_ok($$ select lock_reservable_category('e2600000-0000-4000-8000-000000000103') $$,
  'P0001', 'Equipment category is not available for reservation', 'an empty category cannot be committed');

reset role;
update equipment_units set status = 'damaged' where code = 'RES17-MIXED-AVAILABLE';
update equipment_stock set quantity_available = 0 where category_id = 'e2600000-0000-4000-8000-000000000104';
set local role authenticated;
select is((select count(*)::integer from reservable_equipment_categories() where name like 'RES17 %'), 0,
  'the next query immediately observes lost usable inventory');
reset role;
update equipment_units set status = 'available' where code = 'RES17-MAINTENANCE';
set local role authenticated;
select results_eq(
  $$ select name from reservable_equipment_categories() where name like 'RES17 %' $$,
  $$ values ('RES17 Unusable'::text) $$,
  'returning a unit to service offers its category again'
);
select throws_ok($$ select lock_reservable_category('e2600000-0000-4000-8000-000000000107') $$,
  'P0001', 'Equipment category is not available for reservation', 'inactive metadata prevents commitment even with usable units');
reset role;
select * from finish();
rollback;
