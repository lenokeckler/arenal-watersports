begin;
select plan(7);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values ('e2b10000-0000-4000-8000-000000000203', 'e2b10000-0000-4000-8000-000000000101', 'RES22-LANCHA-3', 'available',
        'e2b10000-0000-4000-8000-000000000001', 'e2b10000-0000-4000-8000-000000000001');

insert into reservation_items (id, reservation_id, unit_id, created_by, updated_by)
values ('e2b10000-0000-4000-8000-000000000403', 'e2b10000-0000-4000-8000-000000000305',
        'e2b10000-0000-4000-8000-000000000203',
        'e2b10000-0000-4000-8000-000000000001', 'e2b10000-0000-4000-8000-000000000001');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values ('e2b10000-0000-4000-8000-000000000102', 'RES22 Kayak', 'active', 'by_quantity', true, true, 60,
        'e2b10000-0000-4000-8000-000000000001', 'e2b10000-0000-4000-8000-000000000001');

insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e2b10000-0000-4000-8000-000000000102', 6, 'e2b10000-0000-4000-8000-000000000001');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('e2b10000-0000-4000-8000-000000000306', 'RES22 Kayaks out', 4, 'rental', '2035-05-17 15:00:00+00', 60, 'scheduled',
        'e2b10000-0000-4000-8000-000000000001', 'e2b10000-0000-4000-8000-000000000001');

insert into reservation_items (id, reservation_id, category_id, quantity, created_by, updated_by)
values ('e2b10000-0000-4000-8000-000000000404', 'e2b10000-0000-4000-8000-000000000306',
        'e2b10000-0000-4000-8000-000000000102', 2,
        'e2b10000-0000-4000-8000-000000000001', 'e2b10000-0000-4000-8000-000000000001');

insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values ('e2b10000-0000-4000-8000-000000000702', 'e2b10000-0000-4000-8000-000000000306',
        'e2b10000-0000-4000-8000-000000000102', '2035-05-17 15:00:00+00', 60,
        'e2b10000-0000-4000-8000-000000000001', 'e2b10000-0000-4000-8000-000000000001');

update reservation_items set dispatch_id = 'e2b10000-0000-4000-8000-000000000702'
where id = 'e2b10000-0000-4000-8000-000000000404';

update reservation_dispatches set dispatched_at = now() - interval '2 hours'
where id = 'e2b10000-0000-4000-8000-000000000702';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select cancel_reservation(jsonb_build_object(
  'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta', 'cause', 'weather',
  'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305')));
select cancel_reservation(jsonb_build_object(
  'reservation_id', 'e2b10000-0000-4000-8000-000000000306', 'reason', 'Tormenta', 'cause', 'weather',
  'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000306')));

select is(
  (select count(*) from unit_conflicts('e2b10000-0000-4000-8000-000000000203',
    '2035-05-16 15:10:00+00', '2035-05-16 15:50:00+00')),
  0::bigint,
  'an undispatched unit of a cancelled partially dispatched reservation is free'
);

select is(
  (select count(*) from unit_conflicts('e2b10000-0000-4000-8000-000000000202',
    '2035-05-16 15:10:00+00', '2035-05-16 15:50:00+00')),
  1::bigint,
  'the dispatched unit of the same cancelled reservation stays committed'
);

select is(
  (select committed from category_availability('e2b10000-0000-4000-8000-000000000101',
    '2035-05-16 15:10:00+00', '2035-05-16 15:50:00+00')),
  1,
  'the category counts only the dispatched unit of the cancelled reservation'
);

select is(
  (select committed from category_availability('e2b10000-0000-4000-8000-000000000102',
    '2035-05-17 15:10:00+00', '2035-05-17 15:50:00+00')),
  2,
  'a by_quantity item with an open dispatch of a cancelled reservation counts its quantity'
);

select is(
  (select committed from category_availability('e2b10000-0000-4000-8000-000000000102',
    '2035-05-17 15:10:00+00', '2035-05-17 15:50:00+00', 'e2b10000-0000-4000-8000-000000000306')),
  0,
  'the excluded reservation is not counted for the by_quantity category'
);

set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000002","role":"authenticated"}';

select close_dispatch_group('e2b10000-0000-4000-8000-000000000702', now(), '[]'::jsonb);

select is(
  (select committed from category_availability('e2b10000-0000-4000-8000-000000000102',
    '2035-05-17 15:10:00+00', '2035-05-17 15:50:00+00')),
  0,
  'the by_quantity quantity is released once the group comes back'
);

select is(
  (select count(*) from reservation_category_conflicts('e2b10000-0000-4000-8000-000000000102',
    '2035-05-17 15:10:00+00', '2035-05-17 15:50:00+00')),
  0::bigint,
  'the returned by_quantity reservation is no longer a category conflict'
);

select * from finish();
rollback;
