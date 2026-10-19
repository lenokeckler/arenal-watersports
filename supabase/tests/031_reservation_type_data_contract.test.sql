begin;
select plan(14);

insert into auth.users (id, email)
values ('e3100000-0000-4000-8000-000000000001', 'res08-data@arenal.local');
insert into workers (id, username, full_name, base_role)
values ('e3100000-0000-4000-8000-000000000001', 'res08-data', 'RES08 Reservas', 'reservas');
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, units_are_interchangeable,
   guide_only, default_duration_minutes, created_by, updated_by)
values
  ('e3100000-0000-4000-8000-000000000101', 'RES08 Lancha', 'by_unit', true, false, true, 60,
   'e3100000-0000-4000-8000-000000000001', 'e3100000-0000-4000-8000-000000000001'),
  ('e3100000-0000-4000-8000-000000000102', 'RES08 Cuadraciclo', 'by_quantity', true, true, true, 60,
   'e3100000-0000-4000-8000-000000000001', 'e3100000-0000-4000-8000-000000000001'),
  ('e3100000-0000-4000-8000-000000000103', 'RES08 Kayak', 'by_quantity', true, true, false, 60,
   'e3100000-0000-4000-8000-000000000001', 'e3100000-0000-4000-8000-000000000001');
insert into equipment_units
  (id, category_id, code, status, created_by, updated_by)
values ('e3100000-0000-4000-8000-000000000201', 'e3100000-0000-4000-8000-000000000101',
  'RES08-LANCHA-1', 'available', 'e3100000-0000-4000-8000-000000000001',
  'e3100000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values
  ('e3100000-0000-4000-8000-000000000102', 1, 'e3100000-0000-4000-8000-000000000001'),
  ('e3100000-0000-4000-8000-000000000103', 1, 'e3100000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3100000-0000-4000-8000-000000000001","role":"authenticated"}';

select results_eq(
  $$ select name, guide_only from reservable_equipment_categories() where name like 'RES08 %' order by name $$,
  $$ values ('RES08 Cuadraciclo'::text, true), ('RES08 Kayak'::text, false), ('RES08 Lancha'::text, true) $$,
  'category choices expose whether equipment is guide-only'
);
select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES08 Rental ATV', 'people_count', 1, 'date', '2035-08-01', 'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3100000-0000-4000-8000-000000000102', 'quantity', 1, 'reservation_type', 'rental')) $$,
  'P0001', 'Guide-only equipment requires a tour reservation',
  'rental reservations cannot commit a guide-only category'
);
select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES08 Rental boat', 'people_count', 1, 'date', '2035-08-01', 'time', '10:00', 'duration_minutes', 60, 'unit_id', 'e3100000-0000-4000-8000-000000000201', 'reservation_type', 'rental')) $$,
  'P0001', 'Guide-only equipment requires a tour reservation',
  'rental reservations cannot commit a guide-only unit'
);
select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES08 Tour ATV', 'people_count', 1, 'date', '2035-08-01', 'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3100000-0000-4000-8000-000000000102', 'quantity', 1, 'reservation_type', 'tour')) $$,
  'tour reservations can commit guide-only categories'
);
select is((select type::text from reservations where customer_name = 'RES08 Tour ATV'), 'tour',
  'the selected tour type persists on the reservation');
select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES08 Tour boat', 'people_count', 1, 'date', '2035-08-01', 'time', '11:00', 'duration_minutes', 60, 'unit_id', 'e3100000-0000-4000-8000-000000000201', 'reservation_type', 'tour')) $$,
  'tour reservations can commit a guide-only unit'
);
select is((select type::text from reservations where customer_name = 'RES08 Tour boat'), 'tour',
  'the type persists for a concrete-unit commitment');
select throws_ok(
  $$ update reservations set type = 'rental' where customer_name = 'RES08 Tour boat' $$,
  'P0001', 'Guide-only equipment requires a tour reservation',
  'a guide-only unit reservation cannot be changed from tour to rental'
);
select throws_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES08 Combo ATV', 'people_count', 1, 'date', '2035-08-01', 'time', '12:00', 'duration_minutes', 60, 'category_id', 'e3100000-0000-4000-8000-000000000102', 'quantity', 1, 'reservation_type', 'combo')) $$,
  'P0001', 'Guide-only equipment requires a tour reservation',
  'combo reservations cannot commit guide-only equipment'
);
select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES08 Combo kayak', 'people_count', 1, 'date', '2035-08-01', 'time', '09:00', 'duration_minutes', 60, 'category_id', 'e3100000-0000-4000-8000-000000000103', 'quantity', 1, 'reservation_type', 'combo')) $$,
  'combo reservations persist for non-guide-only equipment'
);
select is((select type::text from reservations where customer_name = 'RES08 Combo kayak'), 'combo',
  'the selected combo type persists on the reservation');
select lives_ok(
  $$ select create_rental_reservation(jsonb_build_object('customer_name', 'RES08 Legacy rental', 'people_count', 1, 'date', '2035-08-01', 'time', '10:00', 'duration_minutes', 60, 'category_id', 'e3100000-0000-4000-8000-000000000103', 'quantity', 1)) $$,
  'older payloads without a type keep rental behavior'
);
select is((select type::text from reservations where customer_name = 'RES08 Legacy rental'), 'rental',
  'the default type remains rental for existing callers');

reset role;
insert into reservations
  (customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('RES08 Direct item', 1, 'rental', '2035-08-02 15:00:00+00', 60, 'scheduled',
  'e3100000-0000-4000-8000-000000000001', 'e3100000-0000-4000-8000-000000000001');
set local role authenticated;
select throws_ok(
  $$ insert into reservation_items (reservation_id, category_id, quantity, created_by, updated_by)
     select id, 'e3100000-0000-4000-8000-000000000102', 1,
       'e3100000-0000-4000-8000-000000000001', 'e3100000-0000-4000-8000-000000000001'
     from reservations where customer_name = 'RES08 Direct item' $$,
  'P0001', 'Guide-only equipment requires a tour reservation',
  'direct scheduled item inserts enforce the same guide-only restriction'
);
reset role;
select * from finish();
rollback;
