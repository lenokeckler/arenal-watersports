begin;
select plan(25);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'tariff-admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'tariff-ops@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'tariff_admin', 'Admin', 'tariff-admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'tariff_ops', 'Ops', 'operaciones');

insert into equipment_categories (id, name, tracking_mode, status, is_reservable, default_duration_minutes, created_by, updated_by) values
  ('ffffffff-0000-0000-0000-000000000001', 'Tariff jet ski', 'by_unit', 'active', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('ffffffff-0000-0000-0000-000000000002', 'Tariff kayak', 'by_quantity', 'active', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('ffffffff-0000-0000-0000-000000000003', 'Tariff retired', 'by_quantity', 'inactive', true, 60,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('ffffffff-0000-0000-0000-000000000101', 'Tariff buyer', 2, 'rental', '2035-09-09 09:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');
insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by) values
  ('ffffffff-0000-0000-0000-000000000101', 'tariff', 120, 'USD', 'Efectivo', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":120,"crc":null},"tour":null}'::jsonb) $$,
  '42501', 'Solo administracion guarda tarifas', 'a non-admin cannot save tariffs'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
    "rental":{"usd":120,"crc":60000},"tour":{"usd":80,"crc":null}}'::jsonb),
  2, 'an admin creates both tariffs of a category in one call'
);
select results_eq(
  $$ select type::text, amount_usd, amount_crc from tariffs
      where category_id = 'ffffffff-0000-0000-0000-000000000001' order by type $$,
  $$ values ('rental', 120.00::numeric, 60000.00::numeric), ('tour', 80.00::numeric, null::numeric) $$,
  'each type has one row with the amounts as sent'
);
select is(
  (select created_by from tariffs
    where category_id = 'ffffffff-0000-0000-0000-000000000001' and type = 'rental'),
  '11111111-1111-1111-1111-111111111111'::uuid, 'the new tariff is stamped with the admin'
);

select is(
  save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
    "rental":{"usd":130,"crc":60000},"tour":{"usd":80,"crc":null}}'::jsonb),
  2, 'an admin edits only the dollar amount of a tariff'
);
select results_eq(
  $$ select type::text, amount_usd, amount_crc from tariffs
      where category_id = 'ffffffff-0000-0000-0000-000000000001' order by type $$,
  $$ values ('rental', 130.00::numeric, 60000.00::numeric), ('tour', 80.00::numeric, null::numeric) $$,
  'the edit changes the dollars and keeps the colones and the other type'
);
select is(
  (select count(*) from tariffs where category_id = 'ffffffff-0000-0000-0000-000000000001'),
  2::bigint, 'an edit never adds a second row for a category and type'
);

select lives_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":130,"crc":null},"tour":{"usd":80,"crc":25000}}'::jsonb) $$,
  'a currency sent as null is accepted'
);
select results_eq(
  $$ select type::text, amount_usd, amount_crc from tariffs
      where category_id = 'ffffffff-0000-0000-0000-000000000001' order by type $$,
  $$ values ('rental', 130.00::numeric, null::numeric), ('tour', 80.00::numeric, 25000.00::numeric) $$,
  'a currency sent as null is cleared and another is filled in'
);

select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":0,"crc":60000},"tour":{"usd":80,"crc":null}}'::jsonb) $$,
  '22023', 'Cada monto de la tarifa debe ser un numero mayor que cero', 'a zero amount is rejected'
);
select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":-5,"crc":null},"tour":{"usd":80,"crc":null}}'::jsonb) $$,
  '22023', 'Cada monto de la tarifa debe ser un numero mayor que cero', 'a negative amount is rejected'
);
select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":"abc","crc":null},"tour":{"usd":80,"crc":null}}'::jsonb) $$,
  '22023', 'Cada monto de la tarifa debe ser un numero mayor que cero', 'a non-numeric amount is rejected'
);
select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":"50","crc":null},"tour":{"usd":80,"crc":null}}'::jsonb) $$,
  '22023', 'Cada monto de la tarifa debe ser un numero mayor que cero', 'an amount written as text is rejected'
);
select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":null,"crc":null},"tour":{"usd":80,"crc":null}}'::jsonb) $$,
  '22023', 'La tarifa necesita un precio en dolares o en colones', 'a tariff without any currency is rejected'
);
select results_eq(
  $$ select amount_usd, amount_crc from tariffs
      where category_id = 'ffffffff-0000-0000-0000-000000000001' and type = 'rental' $$,
  $$ values (130.00::numeric, null::numeric) $$,
  'rejected saves leave the stored tariff untouched'
);

select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":null,"tour":{"usd":80,"crc":null}}'::jsonb) $$,
  '55006', 'No se puede quitar una tarifa; cambie su precio', 'an existing tariff cannot be removed with null'
);
select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":130,"crc":null}}'::jsonb) $$,
  '55006', 'No se puede quitar una tarifa; cambie su precio', 'an existing tariff cannot be removed by omitting it'
);

select is(
  save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000002",
    "rental":{"usd":15,"crc":null},"tour":null}'::jsonb),
  1, 'a type without a stored tariff is skipped when sent as null'
);
select is(
  (select count(*) from tariffs where category_id = 'ffffffff-0000-0000-0000-000000000002'),
  1::bigint, 'only the provided type was written'
);

select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000002",
       "rental":{"usd":999,"crc":null},"tour":{"usd":0,"crc":null}}'::jsonb) $$,
  '22023', null, 'a bad second type fails the whole call'
);
select is(
  (select amount_usd from tariffs
    where category_id = 'ffffffff-0000-0000-0000-000000000002' and type = 'rental'),
  15.00::numeric, 'the first type stays untouched after a failed call'
);

select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000003",
       "rental":{"usd":10,"crc":null},"tour":null}'::jsonb) $$,
  '22023', 'La categoria no existe o esta inactiva', 'an inactive category is rejected'
);
select throws_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-0000000000ff",
       "rental":{"usd":10,"crc":null},"tour":null}'::jsonb) $$,
  '22023', 'La categoria no existe o esta inactiva', 'an unknown category is rejected'
);

select lives_ok(
  $$ select save_category_tariffs('{"category_id":"ffffffff-0000-0000-0000-000000000001",
       "rental":{"usd":500,"crc":300000},"tour":{"usd":80,"crc":25000}}'::jsonb) $$,
  'the tariff changes after a reservation was charged'
);
select results_eq(
  $$ select amount, currency::text from reservation_charges
      where reservation_id = 'ffffffff-0000-0000-0000-000000000101' $$,
  $$ values (120.00::numeric, 'USD') $$,
  'a charged reservation keeps the amount it was charged'
);

select * from finish();
rollback;
