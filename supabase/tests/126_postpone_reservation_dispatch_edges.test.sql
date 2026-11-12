begin;
select plan(13);

\ir fixtures/postponement_release.sql.fixture
\ir fixtures/postpone_call.sql.fixture

insert into equipment_units
  (id, category_id, code, status, fuel_max, fuel_level, usage_total, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000205', 'e3300000-0000-4000-8000-000000000101', 'RES20-R-LANCHA-5', 'available', 4, 4, 0, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, parent_reservation_id, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000705', 'RES20 Holder', 2, 'rental', '2035-06-01 15:00:00+00', 60, 'scheduled', null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000706', 'RES20 Mover', 2, 'rental', '2035-06-03 15:00:00+00', 60, 'scheduled', null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000707', 'RES20 Roles', 2, 'rental', '2035-08-01 15:00:00+00', 60, 'scheduled', null, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes,
   consumes_fuel, has_motor, usage_metric, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000105', 'RES20 Casco', 'active', 'by_quantity', true, true, 60, false, false, null,
        'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');
insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e3300000-0000-4000-8000-000000000105', 2, 'e3300000-0000-4000-8000-000000000001');
insert into reservation_items (id, reservation_id, category_id, quantity, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000815', 'e3300000-0000-4000-8000-000000000707', 'e3300000-0000-4000-8000-000000000105', 2, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000709', 'RES20 Taker', 2, 'rental', '2035-06-20 15:00:00+00', 60, 'scheduled', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

insert into reservation_items (id, reservation_id, unit_id, created_by, updated_by)
values
  ('e3300000-0000-4000-8000-000000000813', 'e3300000-0000-4000-8000-000000000705', 'e3300000-0000-4000-8000-000000000205', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000814', 'e3300000-0000-4000-8000-000000000706', 'e3300000-0000-4000-8000-000000000205', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001'),
  ('e3300000-0000-4000-8000-000000000816', 'e3300000-0000-4000-8000-000000000709', 'e3300000-0000-4000-8000-000000000201', 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');

update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000601' where id in ('e3300000-0000-4000-8000-000000000501', 'e3300000-0000-4000-8000-000000000504');
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000603', fuel_in = 1, usage_in = 8 where id = 'e3300000-0000-4000-8000-000000000503';
update reservation_dispatches set dispatched_at = '2026-01-10 15:00:00+00' where reservation_id = 'e3300000-0000-4000-8000-000000000301';
update reservation_dispatches set closed_at = '2026-01-10 16:00:00+00' where id = 'e3300000-0000-4000-8000-000000000603';

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values ('e3300000-0000-4000-8000-000000000621', 'e3300000-0000-4000-8000-000000000705', 'e3300000-0000-4000-8000-000000000101',
        '2026-01-10 15:00:00+00', 60, 'e3300000-0000-4000-8000-000000000001', 'e3300000-0000-4000-8000-000000000001');
update reservation_items set dispatch_id = 'e3300000-0000-4000-8000-000000000621' where id = 'e3300000-0000-4000-8000-000000000813';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000002","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000301', '2035-06-20', '09:30', 'storm', null,
       jsonb_build_array(
         jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000501', 'fuel_in', 2, 'usage_in', 12),
         jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000504', 'fuel_in', 4, 'usage_in', 20))) $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a dispatched reservation whose new window is taken is refused'
);
select is(
  (select concat_ws(' ',
      (select status::text from reservations where id = 'e3300000-0000-4000-8000-000000000301'),
      pg_temp.cr_start('e3300000-0000-4000-8000-000000000301'),
      (select count(*) from reservation_dispatches where reservation_id = 'e3300000-0000-4000-8000-000000000301' and closed_at is null),
      (select count(*) from reservation_dispatches where reservation_id = 'e3300000-0000-4000-8000-000000000301' and closed_at is not null),
      (select count(*) from reservation_items where reservation_id = 'e3300000-0000-4000-8000-000000000301' and dispatch_id is not null),
      (select count(*) from reservation_postponement_readings),
      (select count(*) from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000301'),
      (select string_agg(concat_ws('/', fuel_level, usage_total), ',' order by id) from equipment_units where id in ('e3300000-0000-4000-8000-000000000201', 'e3300000-0000-4000-8000-000000000204')))),
  'dispatched 2035-04-12 09:00:00 2 1 3 0 1 4/10.00,4/20.00',
  'a failed fits check rolls back the release: readings, groups, items, unit values, status and date'
);

select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000706', '2035-06-10', '10:00', 'storm') $$,
  'P0001', 'Equipment unit conflicts with another reservation', 'a unit on another reservation open dispatch refuses the new window'
);

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000301', '2035-04-13', '10:00', 'storm', null,
       jsonb_build_array(
         jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000501', 'fuel_in', 2, 'usage_in', 12),
         jsonb_build_object('item_id', 'e3300000-0000-4000-8000-000000000504', 'fuel_in', 4, 'usage_in', 20))) $$,
  'a dispatched reservation with one group already closed is postponed with readings for the open group only'
);
select is(
  (select count(*) from reservation_items where reservation_id = 'e3300000-0000-4000-8000-000000000301' and dispatch_id is not null),
  0::bigint,
  'no item keeps a dispatch group'
);
select is(
  (select string_agg(concat_ws('/', fuel_in, usage_in), ' ' order by unit_id) from reservation_postponement_readings r
     join reservation_postponements p on p.id = r.postponement_id
    where p.reservation_id = 'e3300000-0000-4000-8000-000000000301' and p.id <> 'e3300000-0000-4000-8000-000000000401'),
  '2/12.00 1/8.00 4/20.00',
  'the closed group keeps its stored return values in the trace'
);

select is(
  (select effective_status from unit_current_state where id = 'e3300000-0000-4000-8000-000000000201'),
  'available',
  'unit_current_state shows the released unit available'
);
select is(
  (select committed from category_availability('e3300000-0000-4000-8000-000000000101', '2035-04-12 15:00:00+00', '2035-04-12 16:00:00+00')),
  0,
  'the old window no longer counts the released units'
);
select is(
  (select committed from category_availability('e3300000-0000-4000-8000-000000000101', '2035-04-13 16:00:00+00', '2035-04-13 17:00:00+00')),
  2,
  'the new window counts the released units'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000003","role":"authenticated"}';

select throws_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000707', '2035-08-02', '10:00', 'storm') $$,
  'P0001', 'Reservations access is required', 'Operaciones is refused'
);

reset role;
insert into worker_areas (worker_id, area, granted_by)
values ('e3300000-0000-4000-8000-000000000001', 'reservas', 'e3300000-0000-4000-8000-000000000001');
update workers set last_work_area = 'reservas' where id = 'e3300000-0000-4000-8000-000000000001';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e3300000-0000-4000-8000-000000000001","role":"authenticated"}';

select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000707', '2035-08-01', '09:30', 'storm') $$,
  'Administracion is allowed, and a by-quantity item with just enough stock overlapping its own old window fits'
);
select lives_ok(
  $$ select pg_temp.postpone('e3300000-0000-4000-8000-000000000707', '2035-08-03', '10:00', 'storm') $$,
  'a by-quantity item with exactly the stock left fits in an empty window'
);
select is(
  (select string_agg(distinct created_by::text, ',') from reservation_postponements where reservation_id = 'e3300000-0000-4000-8000-000000000707'),
  'e3300000-0000-4000-8000-000000000001',
  'the trace records the admin as author'
);

reset role;
select * from finish();
rollback;
