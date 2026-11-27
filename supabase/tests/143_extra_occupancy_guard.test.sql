begin;
select plan(8);

insert into auth.users (id, email)
select 'e4300000-0000-4000-8000-000000000001', 'occupancy-admin@arenal.local'
where not exists (select 1 from workers where base_role = 'administracion');
insert into workers (id, username, full_name, personal_email, base_role)
select 'e4300000-0000-4000-8000-000000000001', 'occupancy_admin', 'Occupancy admin', 'occupancy-admin@arenal.local', 'administracion'
where not exists (select 1 from workers where base_role = 'administracion');

select set_config('occupancy.admin_id',
  (select id::text from workers where base_role = 'administracion' and status = 'active'), true);

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('e4300001-0000-4000-8000-000000000001', 'Occupancy boards', 'by_quantity', current_setting('occupancy.admin_id')::uuid, current_setting('occupancy.admin_id')::uuid),
  ('e4300001-0000-4000-8000-000000000002', 'Occupancy vests', 'by_quantity', current_setting('occupancy.admin_id')::uuid, current_setting('occupancy.admin_id')::uuid);

insert into extras (id, name, occupies_category_id, occupies_quantity, created_by, updated_by) values
  ('e4300003-0000-4000-8000-000000000001', 'Occupancy unused', 'e4300001-0000-4000-8000-000000000001', 1, current_setting('occupancy.admin_id')::uuid, current_setting('occupancy.admin_id')::uuid),
  ('e4300003-0000-4000-8000-000000000002', 'Occupancy used', 'e4300001-0000-4000-8000-000000000001', 1, current_setting('occupancy.admin_id')::uuid, current_setting('occupancy.admin_id')::uuid);

insert into reservations (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by) values
  ('e4300004-0000-4000-8000-000000000001', 'Occupancy reservation', 1, 'rental', '2035-01-05 15:00:00+00', 60, current_setting('occupancy.admin_id')::uuid, current_setting('occupancy.admin_id')::uuid);

insert into reservation_items (id, reservation_id, extra_id, created_by, updated_by) values
  ('e4300005-0000-4000-8000-000000000001', 'e4300004-0000-4000-8000-000000000001', 'e4300003-0000-4000-8000-000000000002', current_setting('occupancy.admin_id')::uuid, current_setting('occupancy.admin_id')::uuid);

select lives_ok(
  $$update extras set occupies_quantity = 3 where id = 'e4300003-0000-4000-8000-000000000001'$$,
  'the quantity of an unused extra can change'
);

select lives_ok(
  $$update extras set occupies_category_id = 'e4300001-0000-4000-8000-000000000002' where id = 'e4300003-0000-4000-8000-000000000001'$$,
  'the category of an unused extra can change'
);

select lives_ok(
  $$update extras set occupies_category_id = null, occupies_quantity = null where id = 'e4300003-0000-4000-8000-000000000001'$$,
  'an unused extra can stop occupying equipment'
);

select throws_ok(
  $$update extras set occupies_quantity = 2 where id = 'e4300003-0000-4000-8000-000000000002'$$,
  '55006', null, 'the quantity of a used extra cannot change'
);

select throws_ok(
  $$update extras set occupies_category_id = 'e4300001-0000-4000-8000-000000000002' where id = 'e4300003-0000-4000-8000-000000000002'$$,
  '55006', null, 'the category of a used extra cannot change'
);

select throws_ok(
  $$update extras set occupies_category_id = null, occupies_quantity = null where id = 'e4300003-0000-4000-8000-000000000002'$$,
  '55006', null, 'a used extra cannot stop occupying equipment'
);

select lives_ok(
  $$update extras set name = 'Occupancy used renamed', price_usd = 9, price_crc = 4500 where id = 'e4300003-0000-4000-8000-000000000002'$$,
  'the name and prices of a used extra can change'
);

select lives_ok(
  $$update extras set occupies_category_id = 'e4300001-0000-4000-8000-000000000001', occupies_quantity = 1 where id = 'e4300003-0000-4000-8000-000000000002'$$,
  'setting the same occupancy on a used extra works'
);

select * from finish();
rollback;
