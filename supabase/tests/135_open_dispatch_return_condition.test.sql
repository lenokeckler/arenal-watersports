begin;
select plan(4);
\ir fixtures/cancel_dispatched_reservation.sql.fixture

insert into equipment_units (id, category_id, code, status, created_by, updated_by)
values ('e2b10000-0000-4000-8000-000000000203', 'e2b10000-0000-4000-8000-000000000101', 'RES22-LANCHA-3', 'available',
        'e2b10000-0000-4000-8000-000000000001', 'e2b10000-0000-4000-8000-000000000001');

insert into reservation_items (id, reservation_id, unit_id, created_by, updated_by)
values ('e2b10000-0000-4000-8000-000000000403', 'e2b10000-0000-4000-8000-000000000305',
        'e2b10000-0000-4000-8000-000000000203',
        'e2b10000-0000-4000-8000-000000000001', 'e2b10000-0000-4000-8000-000000000001');

update reservation_items set dispatch_id = 'e2b10000-0000-4000-8000-000000000701'
where id = 'e2b10000-0000-4000-8000-000000000403';

update reservation_dispatches set dispatched_at = now() - interval '2 hours'
where id = 'e2b10000-0000-4000-8000-000000000701';

set local role authenticated;
set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000001","role":"authenticated"}';

select cancel_reservation(jsonb_build_object(
  'reservation_id', 'e2b10000-0000-4000-8000-000000000305', 'reason', 'Tormenta', 'cause', 'weather',
  'expected_updated_at', (select updated_at from reservations where id = 'e2b10000-0000-4000-8000-000000000305')));

set local request.jwt.claims to '{"sub":"e2b10000-0000-4000-8000-000000000002","role":"authenticated"}';

select close_dispatch_group('e2b10000-0000-4000-8000-000000000701', now(),
  '[{"unit_id":"e2b10000-0000-4000-8000-000000000202","damage":{"cause":"collision","description":"Casco roto","impact_delta":0}},
    {"unit_id":"e2b10000-0000-4000-8000-000000000203","maintenance":true}]'::jsonb);

select is(
  (select status::text from equipment_units where id = 'e2b10000-0000-4000-8000-000000000202'),
  'damaged',
  'a unit returned with a damage report from a cancelled reservation is damaged'
);

select is(
  (select status::text from equipment_units where id = 'e2b10000-0000-4000-8000-000000000203'),
  'in_maintenance',
  'a unit returned with a maintenance mark from a cancelled reservation is in maintenance'
);

select is(
  (select count(*) from equipment_units
   where id in ('e2b10000-0000-4000-8000-000000000202', 'e2b10000-0000-4000-8000-000000000203')
     and status = 'available'),
  0::bigint,
  'neither returned unit is counted as available'
);

select is(
  (select usable from category_availability('e2b10000-0000-4000-8000-000000000101',
    now() - interval '1 hour', now())),
  1,
  'the category usable stock excludes the damaged and maintenance units'
);

select * from finish();
rollback;
