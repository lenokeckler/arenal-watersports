begin;
select plan(15);

insert into auth.users (id, email) values
  ('e3800000-0000-4000-8000-000000000001', 'res11-pricing@arenal.local'),
  ('e3800000-0000-4000-8000-000000000002', 'res11-operations@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('e3800000-0000-4000-8000-000000000001', 'res11-pricing', 'RES11 Pricing', 'reservas'),
  ('e3800000-0000-4000-8000-000000000002', 'res11-operations', 'RES11 Operations', 'operaciones');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes,
   created_by, updated_by)
values
  ('e3800000-0000-4000-8000-000000000101', 'RES11 priced boat', 'by_unit', true, 60,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000102', 'RES11 boat without tariff', 'by_unit', true, 60,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001');
insert into equipment_units
  (id, category_id, code, created_by, updated_by)
values
  ('e3800000-0000-4000-8000-000000000201', 'e3800000-0000-4000-8000-000000000101', 'RES11-BOAT-01',
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000202', 'e3800000-0000-4000-8000-000000000102', 'RES11-BOAT-02',
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001');
insert into tariffs
  (category_id, type, amount_usd, amount_crc, created_by, updated_by)
values
  ('e3800000-0000-4000-8000-000000000101', 'rental', 20, 10000,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000101', 'tour', 12, 7000,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001');
insert into extras
  (id, name, price_usd, price_crc, created_by, updated_by)
values
  ('e3800000-0000-4000-8000-000000000301', 'RES11 Extra One', 8, 6000,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000302', 'RES11 Extra Two', 5, 2000,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000303', 'RES11 Partial Currency', 2, null,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000304', 'RES11 Incompatible', 3, 1000,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001'),
  ('e3800000-0000-4000-8000-000000000305', 'RES11 Inactive', 3, 1000,
   'e3800000-0000-4000-8000-000000000001', 'e3800000-0000-4000-8000-000000000001');
update extras set status = 'inactive'
where id = 'e3800000-0000-4000-8000-000000000305';
insert into extra_compatibility (extra_id, unit_id) values
  ('e3800000-0000-4000-8000-000000000301', 'e3800000-0000-4000-8000-000000000201'),
  ('e3800000-0000-4000-8000-000000000302', 'e3800000-0000-4000-8000-000000000201'),
  ('e3800000-0000-4000-8000-000000000303', 'e3800000-0000-4000-8000-000000000201'),
  ('e3800000-0000-4000-8000-000000000305', 'e3800000-0000-4000-8000-000000000201');

set local role authenticated;
set local request.jwt.claims to '{}';
select throws_ok($$ select * from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201', '{}'::uuid[], 60, 'rental') $$,
  'P0001', 'Reservation access is required',
  'a request without an authenticated identity cannot quote extras');
set local request.jwt.claims to '{"sub":"e3800000-0000-4000-8000-000000000002","role":"authenticated"}';
select throws_ok($$ select * from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201', '{}'::uuid[], 60, 'rental') $$,
  'P0001', 'Reservation access is required',
  'an operations-only worker cannot quote reservation pricing');
set local request.jwt.claims to '{"sub":"e3800000-0000-4000-8000-000000000001","role":"authenticated"}';
select is((select list_amount_usd from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201',
  array['e3800000-0000-4000-8000-000000000301'::uuid,
        'e3800000-0000-4000-8000-000000000302'::uuid], 90, 'rental')),
  43::numeric,
  'the USD quote multiplies the hourly boat tariff by duration and adds extras once');
select is((select list_amount_crc from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201',
  array['e3800000-0000-4000-8000-000000000301'::uuid,
        'e3800000-0000-4000-8000-000000000302'::uuid], 90, 'rental')),
  23000::numeric,
  'the CRC quote uses its own tariff and extra prices without conversion');
select is((select list_amount_usd from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201',
  array['e3800000-0000-4000-8000-000000000301'::uuid], 60, 'tour')),
  20::numeric,
  'a tour quote uses the tour tariff and adds each extra once');
select is((select list_amount_usd from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201',
  array['e3800000-0000-4000-8000-000000000303'::uuid], 60, 'rental')),
  22::numeric,
  'a missing CRC extra price does not prevent an independent USD total');
select is((select list_amount_crc from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201',
  array['e3800000-0000-4000-8000-000000000303'::uuid], 60, 'rental')),
  null::numeric,
  'a currency total is null when one selected component has no price');
select is((select has_boat_tariff from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000202', '{}'::uuid[], 60, 'rental')),
  false,
  'a missing boat tariff is reported explicitly');
select is((select list_amount_usd from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000202', '{}'::uuid[], 60, 'rental')),
  null::numeric,
  'a missing boat tariff never becomes a zero total');
select throws_ok($$ select * from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201',
  array['e3800000-0000-4000-8000-000000000301'::uuid,
        'e3800000-0000-4000-8000-000000000301'::uuid], 60, 'rental') $$,
  'P0001', 'Reservation extras cannot repeat',
  'duplicate extra identifiers are rejected');
select throws_ok($$ select * from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201', '{}'::uuid[], 0, 'rental') $$,
  'P0001', 'Reservation pricing input is invalid',
  'a non-positive duration is rejected');
select throws_ok($$ select * from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201',
  array['e3800000-0000-4000-8000-000000000304'::uuid], 60, 'rental') $$,
  'P0001', 'Every selected extra must be active and compatible',
  'an incompatible extra is rejected');
select throws_ok($$ select * from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201',
  array['e3800000-0000-4000-8000-000000000305'::uuid], 60, 'rental') $$,
  'P0001', 'Every selected extra must be active and compatible',
  'an inactive extra is rejected');
select throws_ok($$ select * from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201', '{}'::uuid[], 60, 'combo') $$,
  'P0001', 'Reservation pricing input is invalid',
  'combo reservations cannot use the rental or tour quote');
select throws_ok($$ select * from reservation_extras_price_quote(
  'e3800000-0000-4000-8000-000000000201', '{}'::uuid[], 60,
  null::reservation_type) $$,
  'P0001', 'Reservation pricing input is invalid',
  'a null reservation type is rejected at the database boundary');

select * from finish();
rollback;
