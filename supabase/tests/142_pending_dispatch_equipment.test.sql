begin;
select plan(9);

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
  (id, name, tracking_mode, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Boards', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Vests', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'B-1', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'B-2', 'available',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Mixed', 1, 'rental', '2026-09-05 14:00:00+00', 90, 'scheduled',
   null, '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Holder', 1, 'rental', '2026-09-05 15:00:00+00', 60, 'dispatched',
   null, '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Cancelled', 1, 'rental', '2026-09-05 16:00:00+00', 60, 'cancelled',
   'Cancelled for test', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Package', 1, 'combo', '2026-09-05 17:00:00+00', 60, 'scheduled',
   null, '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 2,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', 4,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_items (reservation_id, unit_id, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000002',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values
  ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000002',
   'aaaaaaaa-0000-0000-0000-000000000001', '2026-09-05 15:00:00+00', 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update reservation_items
   set dispatch_id = 'cccccccc-0000-0000-0000-000000000001'
 where reservation_id = 'dddddddd-0000-0000-0000-000000000002';

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';

select is(
  (select count(*)::int from pending_dispatch_equipment(array[
     'dddddddd-0000-0000-0000-000000000001'::uuid
   ])),
  0,
  'a worker without the operations area sees no pending equipment'
);

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select string_agg(category_name, ',' order by category_name)
     from pending_dispatch_equipment(array[
       'dddddddd-0000-0000-0000-000000000001'::uuid
     ])),
  'Boards,Vests',
  'each category with committed equipment is listed once per reservation'
);

select is(
  (select quantity::text
     from pending_dispatch_equipment(array[
       'dddddddd-0000-0000-0000-000000000001'::uuid
     ])
    where category_name = 'Boards'),
  '3',
  'a unit category adds the quantity to pick and the units already assigned'
);

select is(
  (select quantity::text
     from pending_dispatch_equipment(array[
       'dddddddd-0000-0000-0000-000000000001'::uuid
     ])
    where category_name = 'Vests'),
  '4',
  'a quantity category reports the committed quantity'
);

select is(
  (select count(*)::int from pending_dispatch_equipment(array[
     'dddddddd-0000-0000-0000-000000000002'::uuid
   ])),
  0,
  'a category already dispatched is no longer pending'
);

select is(
  (select count(*)::int from pending_dispatch_equipment(array[
     'dddddddd-0000-0000-0000-000000000003'::uuid
   ])),
  0,
  'a cancelled reservation has no pending equipment'
);

select is(
  (select count(distinct reservation_id)::int
     from pending_dispatch_equipment(array[
       'dddddddd-0000-0000-0000-000000000001'::uuid,
       'dddddddd-0000-0000-0000-000000000002'::uuid,
       'dddddddd-0000-0000-0000-000000000003'::uuid
     ])),
  1,
  'several reservations are answered in a single call'
);

select is(
  (select reservation_type::text
     from pending_dispatch_equipment(array[
       'dddddddd-0000-0000-0000-000000000004'::uuid
     ])),
  'combo',
  'the reservation type tells a combo apart'
);

select is(
  (select distinct reservation_type::text
     from pending_dispatch_equipment(array[
       'dddddddd-0000-0000-0000-000000000001'::uuid
     ])),
  'rental',
  'a plain rental is reported as such'
);

select * from finish();
rollback;
