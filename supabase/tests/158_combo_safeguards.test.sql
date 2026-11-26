begin;
select plan(16);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'safeguard-admin@arenal.local');
insert into auth.users (id, email) values
  ('22222222-2222-2222-2222-222222222222', 'safeguard-ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'safeguard_admin', 'Admin', 'safeguard-admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'safeguard_ops', 'Ops', 'operaciones');

insert into equipment_categories (id, name, tracking_mode, status, is_reservable, guide_only, units_are_interchangeable, default_duration_minutes, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'Safeguard guided boat', 'by_quantity', 'active', true, true, true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'Safeguard jet ski', 'by_quantity', 'active', true, false, true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'Safeguard later retired', 'by_quantity', 'active', true, false, true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'Safeguard not reservable', 'by_quantity', 'active', false, false, true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'Safeguard inactive', 'by_quantity', 'inactive', true, false, true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into combos (id, name, audience, package_price_usd, created_by, updated_by) values
  ('dddddddd-0000-0000-0000-000000000001', 'Retired category combo', 'foreign', 100,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Scheduled guided combo', 'foreign', 200,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Closed guided combo', 'foreign', 300,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Never sold combo', 'foreign', 400,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into combo_items (combo_id, category_id, quantity) values
  ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002', 1),
  ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000003', 1),
  ('dddddddd-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000001', 1),
  ('dddddddd-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000001', 1),
  ('dddddddd-0000-0000-0000-000000000004', 'bbbbbbbb-0000-0000-0000-000000000002', 1);

insert into reservations
  (id, customer_name, people_count, type, combo_id, starts_at, duration_minutes, created_by, updated_by)
values
  ('eeeeeeee-0000-0000-0000-000000000001', 'Buyer one', 2, 'combo', 'dddddddd-0000-0000-0000-000000000001',
   '2035-09-09 09:00:00+00', 60, '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000002', 'Buyer two', 2, 'combo', 'dddddddd-0000-0000-0000-000000000002',
   '2035-09-09 09:00:00+00', 60, '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000003', 'Buyer three', 2, 'combo', 'dddddddd-0000-0000-0000-000000000003',
   '2035-09-09 09:00:00+00', 60, '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by) values
  ('eeeeeeee-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000001', 1,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
update reservations set status = 'cancelled', cancellation_reason = 'Customer cancelled' where id = 'eeeeeeee-0000-0000-0000-000000000003';

update equipment_categories set status = 'inactive' where id = 'bbbbbbbb-0000-0000-0000-000000000003';

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ select delete_or_deactivate_combo('dddddddd-0000-0000-0000-000000000001') $$,
  '42501', null, 'a non-admin cannot delete or deactivate a combo'
);
select throws_ok(
  $$ select set_combo_active('dddddddd-0000-0000-0000-000000000001', true) $$,
  '42501', null, 'a non-admin cannot reactivate a combo'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select throws_ok(
  $$ select save_combo('{"name":"Not reservable","audience":"national","package_price":1000,
       "items":[{"category_id":"bbbbbbbb-0000-0000-0000-000000000004","quantity":1}]}'::jsonb) $$,
  '22023', 'Una de las categorias no existe, esta inactiva o no es reservable',
  'a category that is not reservable is rejected on create'
);
select throws_ok(
  $$ select save_combo('{"name":"Inactive","audience":"national","package_price":1000,
       "items":[{"category_id":"bbbbbbbb-0000-0000-0000-000000000005","quantity":1}]}'::jsonb) $$,
  '22023', 'Una de las categorias no existe, esta inactiva o no es reservable',
  'an inactive category is rejected on create'
);
select throws_ok(
  $$ select save_combo('{"combo_id":"dddddddd-0000-0000-0000-000000000004","name":"Never sold combo",
       "audience":"foreign","package_price":400,
       "items":[{"category_id":"bbbbbbbb-0000-0000-0000-000000000002","quantity":1},
                {"category_id":"bbbbbbbb-0000-0000-0000-000000000004","quantity":1}]}'::jsonb) $$,
  '22023', null, 'a category new to the combo must be reservable on edit'
);
select lives_ok(
  $$ select save_combo('{"combo_id":"dddddddd-0000-0000-0000-000000000001","name":"Retired renamed",
       "audience":"foreign","package_price":125,
       "items":[{"category_id":"bbbbbbbb-0000-0000-0000-000000000002","quantity":1},
                {"category_id":"bbbbbbbb-0000-0000-0000-000000000003","quantity":1}]}'::jsonb) $$,
  'a sold combo whose category was retired later still changes name and price'
);
select results_eq(
  $$ select name, package_price_usd from combos where id = 'dddddddd-0000-0000-0000-000000000001' $$,
  $$ values ('Retired renamed', 125.00::numeric) $$,
  'the edited sold combo has its new name and price'
);

select throws_ok(
  $$ select delete_or_deactivate_combo('dddddddd-0000-0000-0000-000000000002') $$,
  '55006', 'No se puede desactivar el combo mientras tenga reservas programadas con equipo solo para guia',
  'a combo with a scheduled guide-only reservation is not deactivated'
);
select throws_ok(
  $$ select set_combo_active('dddddddd-0000-0000-0000-000000000002', false) $$,
  '55006', 'No se puede desactivar el combo mientras tenga reservas programadas con equipo solo para guia',
  'set_combo_active(false) is blocked by the same reservation'
);
select is(
  (select status::text from combos where id = 'dddddddd-0000-0000-0000-000000000002'),
  'active', 'the blocked combo stays active'
);

select is(
  delete_or_deactivate_combo('dddddddd-0000-0000-0000-000000000003'),
  'deactivated', 'a sold combo without open guide-only reservations is deactivated'
);
select is(
  set_combo_active('dddddddd-0000-0000-0000-000000000003', true),
  'active', 'a deactivated combo with available equipment is reactivated'
);
select is(
  delete_or_deactivate_combo('dddddddd-0000-0000-0000-000000000004'),
  'deleted', 'a never-sold combo is still deleted'
);

select is(
  delete_or_deactivate_combo('dddddddd-0000-0000-0000-000000000001'),
  'deactivated', 'a sold combo with no guide-only equipment is deactivated'
);
select throws_ok(
  $$ select set_combo_active('dddddddd-0000-0000-0000-000000000001', true) $$,
  '55006', 'El combo tiene equipos que ya no estan disponibles para reservas',
  'a combo with a retired category is not reactivated'
);
select is(
  (select status::text from combos where id = 'dddddddd-0000-0000-0000-000000000001'),
  'inactive', 'the rejected reactivation leaves the combo inactive'
);

select * from finish();
rollback;
