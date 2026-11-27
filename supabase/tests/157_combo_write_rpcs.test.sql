begin;
select plan(32);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'combo-admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'combo-ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'combo_admin', 'Admin', 'combo-admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'combo_ops', 'Ops', 'operaciones');

insert into equipment_categories (id, name, tracking_mode, status, is_reservable, default_duration_minutes, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Combo lancha', 'by_unit', 'active', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Combo jet ski', 'by_unit', 'active', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'Combo paddleboard', 'by_quantity', 'active', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'Combo retired gear', 'by_quantity', 'inactive', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into combos (id, name, audience, package_price_usd, created_by, updated_by) values
  ('cccccccc-0000-0000-0000-000000000001', 'Sold combo', 'foreign', 150,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into combo_items (combo_id, category_id, quantity) values
  ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 1),
  ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000002', 2);
insert into reservations
  (customer_name, people_count, type, combo_id, starts_at, duration_minutes, created_by, updated_by)
values ('Buyer', 4, 'combo', 'cccccccc-0000-0000-0000-000000000001', '2026-09-09 09:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ select save_combo('{"name":"Nope","audience":"national","package_price":1000,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  '42501', null, 'a non-admin cannot save a combo'
);
select throws_ok(
  $$ select delete_or_deactivate_combo('cccccccc-0000-0000-0000-000000000001') $$,
  '42501', null, 'a non-admin cannot delete or deactivate a combo'
);
select throws_ok(
  $$ select set_combo_active('cccccccc-0000-0000-0000-000000000001', false) $$,
  '42501', null, 'a non-admin cannot change the status of a combo'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select lives_ok(
  $$ select save_combo('{"name":"  Nacional trio  ","audience":"national","package_price":90000,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1},
                {"category_id":"aaaaaaaa-0000-0000-0000-000000000003","quantity":2}]}'::jsonb) $$,
  'an admin creates a national combo'
);
select results_eq(
  $$ select audience::text, package_price_crc, package_price_usd, status::text
       from combos where name = 'Nacional trio' $$,
  $$ values ('national', 90000.00::numeric, null::numeric, 'active') $$,
  'a national combo is priced in colones only, trimmed and active'
);
select is(
  (select count(*) from combo_items
    where combo_id = (select id from combos where name = 'Nacional trio')),
  2::bigint, 'the new combo keeps its two items'
);
select lives_ok(
  $$ select save_combo('{"name":"Nacional trio","audience":"foreign","package_price":150,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  'the same name is allowed for the other audience'
);
select results_eq(
  $$ select package_price_usd, package_price_crc from combos
      where name = 'Nacional trio' and audience = 'foreign' $$,
  $$ values (150.00::numeric, null::numeric) $$,
  'a foreign combo is priced in dollars only'
);
select throws_ok(
  $$ select save_combo('{"name":"Nacional trio","audience":"national","package_price":5,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  '23505', null, 'a name is not repeated inside the same audience'
);

select throws_ok(
  $$ select save_combo('{"name":"   ","audience":"national","package_price":1000,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  '22023', 'El combo necesita un nombre', 'a blank name is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"No price","audience":"national",
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  '22023', 'El combo necesita un precio mayor que cero', 'a combo without price is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"Zero","audience":"foreign","package_price":0,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  '22023', 'El combo necesita un precio mayor que cero', 'a zero price is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"Negative","audience":"national","package_price":-5,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  '22023', 'El combo necesita un precio mayor que cero', 'a negative price is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"No items","audience":"national","package_price":1000,"items":[]}'::jsonb) $$,
  '22023', 'El combo necesita al menos un equipo', 'a combo without items is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"Missing items","audience":"national","package_price":1000}'::jsonb) $$,
  '22023', 'El combo necesita al menos un equipo', 'a payload without items is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"Zero qty","audience":"national","package_price":1000,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":0}]}'::jsonb) $$,
  '22023', 'La cantidad de cada equipo debe ser mayor que cero', 'a zero quantity is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"Repeated","audience":"national","package_price":1000,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1},
                {"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":2}]}'::jsonb) $$,
  '22023', 'Un equipo no se repite dentro del combo', 'a repeated category is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"Inactive cat","audience":"national","package_price":1000,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000004","quantity":1}]}'::jsonb) $$,
  '22023', null, 'an inactive category is rejected'
);
select throws_ok(
  $$ select save_combo('{"name":"Ghost cat","audience":"national","package_price":1000,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-0000000000ff","quantity":1}]}'::jsonb) $$,
  '22023', null, 'an unknown category is rejected'
);
select is(
  (select count(*) from combos where name in ('Zero', 'Negative', 'No items', 'Repeated', 'Inactive cat')),
  0::bigint, 'a rejected save leaves no combo behind'
);

select lives_ok(
  $$ select save_combo(jsonb_build_object(
       'combo_id', (select id from combos where name = 'Nacional trio' and audience = 'national'),
       'name', 'Nacional duo', 'audience', 'national', 'package_price', 70000,
       'items', jsonb_build_array(
         jsonb_build_object('category_id', 'aaaaaaaa-0000-0000-0000-000000000002', 'quantity', 3)))) $$,
  'a never-sold combo changes its name, price and items'
);
select results_eq(
  $$ select name, package_price_crc from combos where audience = 'national' and name like 'Nacional%' $$,
  $$ values ('Nacional duo', 70000.00::numeric) $$,
  'the edited combo keeps one row with the new name and price'
);
select results_eq(
  $$ select category_id, quantity from combo_items
      where combo_id = (select id from combos where name = 'Nacional duo') $$,
  $$ values ('aaaaaaaa-0000-0000-0000-000000000002'::uuid, 3) $$,
  'the items of a never-sold combo are replaced'
);

select lives_ok(
  $$ select save_combo('{"combo_id":"cccccccc-0000-0000-0000-000000000001","name":"Sold renamed",
       "audience":"foreign","package_price":175,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000002","quantity":2},
                {"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  'a sold combo accepts a new name and price with the same items'
);
select results_eq(
  $$ select name, package_price_usd from combos where id = 'cccccccc-0000-0000-0000-000000000001' $$,
  $$ values ('Sold renamed', 175.00::numeric) $$,
  'the sold combo has its new name and price'
);
select throws_ok(
  $$ select save_combo('{"combo_id":"cccccccc-0000-0000-0000-000000000001","name":"Sold renamed",
       "audience":"foreign","package_price":175,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  '55006', 'Un combo vendido solo cambia de nombre y precio', 'a sold combo cannot change its items'
);
select throws_ok(
  $$ select save_combo('{"combo_id":"cccccccc-0000-0000-0000-000000000001","name":"Sold renamed",
       "audience":"national","package_price":90000,
       "items":[{"category_id":"aaaaaaaa-0000-0000-0000-000000000002","quantity":2},
                {"category_id":"aaaaaaaa-0000-0000-0000-000000000001","quantity":1}]}'::jsonb) $$,
  '55006', 'Un combo vendido solo cambia de nombre y precio', 'a sold combo cannot change its audience'
);
select is(
  (select count(*) from combo_items where combo_id = 'cccccccc-0000-0000-0000-000000000001'),
  2::bigint, 'the sold combo keeps its items after a rejected edit'
);

select is(
  delete_or_deactivate_combo((select id from combos where name = 'Nacional duo')),
  'deleted', 'a never-sold combo is deleted'
);
select is(
  (select count(*) from combos where name = 'Nacional duo'),
  0::bigint, 'the deleted combo is gone'
);
select is(
  delete_or_deactivate_combo('cccccccc-0000-0000-0000-000000000001'),
  'deactivated', 'a sold combo is deactivated instead of deleted'
);
select is(
  set_combo_active('cccccccc-0000-0000-0000-000000000001', true),
  'active', 'a deactivated combo is reactivated'
);

select * from finish();
rollback;
