begin;
select plan(6);

insert into auth.users (id, email) values
  ('e4000000-0000-4000-8000-000000000001', 'res10-direct-reservas@arenal.local'),
  ('e4000000-0000-4000-8000-000000000002', 'res10-direct-guide@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e4000000-0000-4000-8000-000000000001', 'res10-direct-reservas', 'RES10 Direct Reservations', 'reservas'),
  ('e4000000-0000-4000-8000-000000000002', 'res10-direct-guide', 'RES10 Direct Guide', 'operaciones');
insert into worker_marks (worker_id, mark, granted_by)
values ('e4000000-0000-4000-8000-000000000002', 'guia', 'e4000000-0000-4000-8000-000000000001');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e4000000-0000-4000-8000-000000000101', 'RES10 Direct rental', 'by_quantity', true, true,
   false, 60, 'e4000000-0000-4000-8000-000000000001', 'e4000000-0000-4000-8000-000000000001'),
  ('e4000000-0000-4000-8000-000000000102', 'RES10 Direct tour', 'by_quantity', true, true,
   true, 60, 'e4000000-0000-4000-8000-000000000001', 'e4000000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e4000000-0000-4000-8000-000000000101', 2, 'e4000000-0000-4000-8000-000000000001'),
  ('e4000000-0000-4000-8000-000000000102', 2, 'e4000000-0000-4000-8000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('e4000000-0000-4000-8000-000000000201', 'RES10 direct no-tour combo', 1, 'combo', '2035-10-01 15:00:00+00', 60, 'scheduled', 'e4000000-0000-4000-8000-000000000001', 'e4000000-0000-4000-8000-000000000001'),
  ('e4000000-0000-4000-8000-000000000202', 'RES10 direct tour combo', 1, 'combo', '2035-10-02 15:00:00+00', 60, 'scheduled', 'e4000000-0000-4000-8000-000000000001', 'e4000000-0000-4000-8000-000000000001'),
  ('e4000000-0000-4000-8000-000000000203', 'RES10 direct rental', 1, 'rental', '2035-10-03 15:00:00+00', 60, 'scheduled', 'e4000000-0000-4000-8000-000000000001', 'e4000000-0000-4000-8000-000000000001');
insert into reservation_items
  (reservation_id, category_id, quantity, created_by, updated_by)
values
  ('e4000000-0000-4000-8000-000000000201', 'e4000000-0000-4000-8000-000000000101', 1, 'e4000000-0000-4000-8000-000000000001', 'e4000000-0000-4000-8000-000000000001'),
  ('e4000000-0000-4000-8000-000000000202', 'e4000000-0000-4000-8000-000000000102', 1, 'e4000000-0000-4000-8000-000000000001', 'e4000000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e4000000-0000-4000-8000-000000000001","role":"authenticated"}';
select throws_ok($$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
  values ('e4000000-0000-4000-8000-000000000201',
    'e4000000-0000-4000-8000-000000000002',
    'e4000000-0000-4000-8000-000000000001') $$,
  'P0001', 'Guides can only be assigned to tour reservations',
  'direct writes reject a guide on a custom combo without a tour component');
select lives_ok($$ insert into reservation_guides (reservation_id, worker_id, assigned_by)
  values ('e4000000-0000-4000-8000-000000000202',
    'e4000000-0000-4000-8000-000000000002',
    'e4000000-0000-4000-8000-000000000001') $$,
  'direct writes allow a marked guide when a combo contains a tour component');
select throws_ok($$ update reservation_items
  set category_id = 'e4000000-0000-4000-8000-000000000101'
  where reservation_id = 'e4000000-0000-4000-8000-000000000202'
    and category_id = 'e4000000-0000-4000-8000-000000000102' $$,
  'P0001', 'Guides can only be assigned to tour reservations',
  'direct writes cannot remove the last tour component while a guide remains assigned');
select throws_ok($$ update reservations set type = 'rental'
  where id = 'e4000000-0000-4000-8000-000000000202' $$,
  'P0001', 'Guides can only be assigned to tour reservations',
  'direct writes cannot remove the tour component while a guide remains assigned');
select throws_ok($$ insert into reservation_items
  (reservation_id, category_id, quantity, created_by, updated_by)
  values ('e4000000-0000-4000-8000-000000000203',
    'e4000000-0000-4000-8000-000000000102', 1,
    'e4000000-0000-4000-8000-000000000001',
    'e4000000-0000-4000-8000-000000000001') $$,
  'P0001', 'Guide-only equipment requires a tour reservation',
  'direct writes reject a guide-only component on a rental');
select is((select count(*)::integer from reservation_guides
  where reservation_id = 'e4000000-0000-4000-8000-000000000202'), 1,
  'a rejected reservation type update preserves its guide assignment');

select * from finish();
rollback;
