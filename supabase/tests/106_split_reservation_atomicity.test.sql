begin;
select plan(13);
\ir fixtures/split_reservation.sql.fixture

insert into auth.users (id, email) values ('e2900000-0000-4000-8000-000000000013', 'res19-creator@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('e2900000-0000-4000-8000-000000000013', 'res19-creator', 'RES19 Creator', 'res19-creator@correo.com', 'reservas');
insert into combos (id, name, audience, package_price_crc, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000701', 'RES19 Combo', 'national', 10000,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, combo_id, starts_at, duration_minutes, status, parent_reservation_id, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000310', 'RES19 Combo reservation', 3, 'combo', 'e2900000-0000-4000-8000-000000000701',
        '2035-04-22 15:00:00+00', 60, 'scheduled', null,
        'e2900000-0000-4000-8000-000000000013', 'e2900000-0000-4000-8000-000000000013'),
       ('e2900000-0000-4000-8000-000000000312', 'RES19 Child', 3, 'rental', null,
        '2035-04-12 18:00:00+00', 60, 'scheduled', 'e2900000-0000-4000-8000-000000000301',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservation_items (id, reservation_id, category_id, quantity, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000431', 'e2900000-0000-4000-8000-000000000310', 'e2900000-0000-4000-8000-000000000102', 2,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000432', 'e2900000-0000-4000-8000-000000000312', 'e2900000-0000-4000-8000-000000000102', 3,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
\ir fixtures/split_payload.sql.fixture
create temp table result (step text, departure_id uuid);
grant all on result to authenticated;

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select split_reservation(pg_temp.split_payload($j$[
    {"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]},
    {"people_count": 1, "time": "24:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}
  ]$j$::jsonb)) $$,
  'P0001', 'A valid reservation date and time are required', 'a refusal in the second departure is raised'
);
select is((select count(*)::integer from reservations where parent_reservation_id = 'e2900000-0000-4000-8000-000000000301'), 2,
  'the first departure was rolled back');
select is((select quantity from reservation_items where id = 'e2900000-0000-4000-8000-000000000402'), 3, 'the divided item is untouched');
select is((select people_count from reservations where id = 'e2900000-0000-4000-8000-000000000301'), 4, 'the original people are untouched');

select throws_ok(
  $$ select split_reservation(jsonb_set(pg_temp.split_payload('[{"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}]'::jsonb),
       '{expected_updated_at}', '"2034-01-01T00:00:00Z"')) $$,
  'P0001', 'Reservation changed since the form was loaded', 'a stale token is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "10:00", "items": [{"item_id": "not-a-uuid", "quantity": "x"}]}]'::jsonb)) $$,
  'P0001', 'Split equipment does not belong to the reservation', 'malformed equipment is refused by a guard before any cast'
);

insert into result select 'first', departure_id from split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}]'::jsonb));
insert into result select 'second', departure_id from split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "11:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000402", "quantity": 1}]}]'::jsonb));
select is((select count(distinct parent_reservation_id)::integer from reservations r join result on result.departure_id = r.id), 1, 'splitting the original again creates siblings under the same root');

insert into result select 'child', departure_id from split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "12:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000432", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000312'));
select is((select parent_reservation_id from reservations where id = (select departure_id from result where step = 'child')),
  'e2900000-0000-4000-8000-000000000301'::uuid, 'splitting a child points the new departure at the root');

insert into result select 'combo', departure_id from split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000431", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000310'));
select is((select combo_id from reservations where id = (select departure_id from result where step = 'combo')),
  'e2900000-0000-4000-8000-000000000701'::uuid, 'a combo departure copies the combo');
select is((select type::text from reservations where id = (select departure_id from result where step = 'combo')), 'combo', 'a combo departure keeps the type');

reset role;
select is((select updated_by from reservations where id = 'e2900000-0000-4000-8000-000000000310'),
  'e2900000-0000-4000-8000-000000000001'::uuid, 'the original shows the splitting worker as last editor');
select is((select created_by from reservations where id = 'e2900000-0000-4000-8000-000000000310'),
  'e2900000-0000-4000-8000-000000000013'::uuid, 'the original keeps its creator');
select cmp_ok((select updated_at from reservations where id = 'e2900000-0000-4000-8000-000000000310'), '>',
  '2020-01-01 00:00:00+00'::timestamptz, 'the original updated_at moves');

select * from finish();
rollback;
