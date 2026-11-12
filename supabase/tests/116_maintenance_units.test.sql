begin;
select plan(8);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'res', 'Res', 'reservas');

insert into equipment_categories
  (id, name, tracking_mode, has_motor, usage_metric, consumes_fuel, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Motor gear', 'by_unit', true, 'engine_hours', true,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-OVER', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-EXACT', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-FINE', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-NOLIMIT', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-REPAIR', 'in_repair',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000006', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-DAMAGED', 'damaged',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_units set usage_total = 110, next_oil_change_at = 100
 where id = 'bbbbbbbb-0000-0000-0000-000000000001';
update equipment_units set usage_total = 100, next_oil_change_at = 100
 where id = 'bbbbbbbb-0000-0000-0000-000000000002';
update equipment_units set usage_total = 99.5, next_oil_change_at = 100
 where id = 'bbbbbbbb-0000-0000-0000-000000000003';
update equipment_units set usage_total = 500
 where id = 'bbbbbbbb-0000-0000-0000-000000000004';
update equipment_units set usage_total = 120, next_oil_change_at = 100
 where id = 'bbbbbbbb-0000-0000-0000-000000000005';

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by)
values
  ('bbbbbbbb-0000-0000-0000-000000000007', 'aaaaaaaa-0000-0000-0000-000000000001', 'M-RETIRED', 'decommissioned',
   now(), 'Sold', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select string_agg(code, ',' order by oil_overage desc nulls last, code)
     from maintenance_units() where oil_overage is not null),
  'M-REPAIR,M-OVER,M-EXACT',
  'the machines that reached their oil change are listed with the one that went furthest first'
);

select is(
  (select oil_overage from maintenance_units() where code = 'M-OVER'),
  10::numeric,
  'the overage is how far the hours went past the threshold'
);

select is(
  (select oil_overage from maintenance_units() where code = 'M-EXACT'),
  0::numeric,
  'a machine that exactly reached the threshold is listed with no overage yet'
);

select is(
  (select count(*)::int from maintenance_units() where code in ('M-FINE', 'M-NOLIMIT')),
  0,
  'a machine below its threshold, or without a threshold, is not listed'
);

select is(
  (select string_agg(code, ',' order by code)
     from maintenance_units() where status <> 'available'),
  'M-DAMAGED,M-REPAIR',
  'the machines out of service are listed'
);

select is(
  (select count(*)::int from maintenance_units() where code = 'M-RETIRED'),
  0,
  'a decommissioned machine is not listed'
);

select is(
  (select string_agg(code, ',')
     from (select code from maintenance_units() limit 3) as first_three),
  'M-REPAIR,M-OVER,M-EXACT',
  'the machines due for an oil change come before the ones out of service'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from maintenance_units()),
  0,
  'a worker without the operations area gets nothing'
);

select * from finish();
rollback;
