begin;
select plan(14);
\ir fixtures/split_reservation.sql.fixture
\ir fixtures/split_payload.sql.fixture

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000321', 'RES19 Time A', 9, 'rental', '2035-05-01 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000322', 'RES19 Time B', 9, 'rental', '2035-05-02 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000323', 'RES19 Time C', 9, 'rental', '2035-05-03 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'),
       ('e2900000-0000-4000-8000-000000000324', 'RES19 Time D', 9, 'rental', '2035-05-04 15:00:00+00', 60, 'scheduled',
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into reservation_items (id, reservation_id, category_id, quantity, created_by, updated_by)
select ('e2900000-0000-4000-8000-000000000' || n)::uuid, ('e2900000-0000-4000-8000-000000000' || (n - 100))::uuid,
       'e2900000-0000-4000-8000-000000000102', 5,
       'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001'
from (values (421), (422), (423), (424)) as seed(n);

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2900000-0000-4000-8000-000000000001","role":"authenticated"}';

select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "abc", "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', 'a non-time string is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "", "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', 'an empty time is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "25:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', 'an hour above 24 is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "-1:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', 'a negative hour is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "infinity", "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', 'infinity is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": 10, "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', 'a numeric time is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "24:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', '24:00 is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": null, "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', 'a null time is refused'
);
select throws_ok(
  $$ select split_reservation(pg_temp.split_payload('[{"people_count": 1, "items": [{"item_id": "e2900000-0000-4000-8000-000000000421", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000321')) $$,
  'P0001', 'A valid reservation date and time are required', 'a missing time is refused'
);

insert into reservations (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
select 'e2900000-0000-4000-8000-000000000325', 'RES19 Time Ok', 9, 'rental', '2035-05-05 15:00:00+00', 60, 'scheduled',
       'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001';

do $$ begin
  perform split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "now", "items": [{"item_id": "e2900000-0000-4000-8000-000000000422", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000322'));
exception when others then null; end $$;
select is((select count(*)::integer from reservations where parent_reservation_id = 'e2900000-0000-4000-8000-000000000322'), 0,
  'the keyword now does not become a departure time');

do $$ begin
  perform split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "10:00+05", "items": [{"item_id": "e2900000-0000-4000-8000-000000000423", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000323'));
exception when others then null; end $$;
select is((select count(*)::integer from reservations where parent_reservation_id = 'e2900000-0000-4000-8000-000000000323'), 0,
  'a time carrying a UTC offset does not silently drop the offset');

do $$ begin
  perform split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "2035-05-09 10:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000424", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000324'));
exception when others then null; end $$;
select is((select count(*)::integer from reservations where parent_reservation_id = 'e2900000-0000-4000-8000-000000000324'), 0,
  'a full timestamp does not silently drop its date');

create temp table result (departure_id uuid);
grant all on result to authenticated;
insert into reservation_items (id, reservation_id, category_id, quantity, created_by, updated_by)
values ('e2900000-0000-4000-8000-000000000425', 'e2900000-0000-4000-8000-000000000325', 'e2900000-0000-4000-8000-000000000102', 5,
        'e2900000-0000-4000-8000-000000000001', 'e2900000-0000-4000-8000-000000000001');
insert into result select departure_id from split_reservation(pg_temp.split_payload('[{"people_count": 1, "time": "9:00", "items": [{"item_id": "e2900000-0000-4000-8000-000000000425", "quantity": 1}]}]'::jsonb, 'e2900000-0000-4000-8000-000000000325'));
select is((select starts_at from reservations where id = (select departure_id from result)), '2035-05-05 15:00:00+00'::timestamptz,
  'an unpadded hour is read as that hour on the original Costa Rica date');

reset role;
select is((select count(*)::integer from reservations where parent_reservation_id in
  ('e2900000-0000-4000-8000-000000000321', 'e2900000-0000-4000-8000-000000000325')), 1, 'only the valid time produced a departure');

select * from finish();
rollback;
