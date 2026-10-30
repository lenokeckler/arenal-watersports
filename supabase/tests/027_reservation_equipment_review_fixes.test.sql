begin;
select plan(4);

insert into auth.users (id, email) values
  ('e3000000-0000-4000-8000-000000000001', 'res17-review@arenal.local'),
  ('e3000000-0000-4000-8000-000000000002', 'res17-review-admin@arenal.local');
insert into workers (id, username, full_name, base_role, personal_email) values
  ('e3000000-0000-4000-8000-000000000001', 'res17-review', 'RES17 Review', 'reservas', null),
  ('e3000000-0000-4000-8000-000000000002', 'res17-review-admin', 'RES17 Review Admin',
   'administracion', 'res17-review-admin@arenal.local');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values
  ('e3000000-0000-4000-8000-000000000101', 'RES17 Review stock', 'by_quantity', true, true, 60,
   'e3000000-0000-4000-8000-000000000001', 'e3000000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e3000000-0000-4000-8000-000000000101', 2,
        'e3000000-0000-4000-8000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values
  ('e3000000-0000-4000-8000-000000000201', 'RES17 Review scheduled', 1, 'rental',
   '2035-06-01 15:00:00+00', 60, 'scheduled',
   'e3000000-0000-4000-8000-000000000001', 'e3000000-0000-4000-8000-000000000001');
insert into reservation_items
  (id, reservation_id, category_id, quantity, created_by, updated_by)
values ('e3000000-0000-4000-8000-000000000301', 'e3000000-0000-4000-8000-000000000201',
        'e3000000-0000-4000-8000-000000000101', 2,
        'e3000000-0000-4000-8000-000000000001', 'e3000000-0000-4000-8000-000000000001');

set local request.jwt.claims to '{"sub":"e3000000-0000-4000-8000-000000000001","role":"authenticated"}';
set local role authenticated;
select lives_ok(
  $$ select lock_reservable_category('e3000000-0000-4000-8000-000000000101') $$,
  'reservations area can validate an eligible category'
);
reset role;
update equipment_stock set quantity_available = 0
where category_id = 'e3000000-0000-4000-8000-000000000101';
set local role authenticated;
select lives_ok(
  $$ update reservation_items set quantity = 1
     where id = 'e3000000-0000-4000-8000-000000000301' $$,
  'an authorized reservation can lower an existing commitment after stock is exhausted'
);
select throws_ok(
  $$ update reservation_items set quantity = 2
     where id = 'e3000000-0000-4000-8000-000000000301' $$,
  'P0001', 'Equipment category is not available for reservation',
  'raising a commitment still requires current stock eligibility'
);
reset role;
set local request.jwt.claims to '{"sub":"e3000000-0000-4000-8000-000000000002","role":"authenticated"}';
set local role authenticated;
select throws_ok(
  $$ select lock_reservable_category('e3000000-0000-4000-8000-000000000101') $$,
  'P0001', 'Equipment reservation access is required',
  'an administrator without Reservations or Operations area cannot bypass entitlement'
);
reset role;
select * from finish();
rollback;
