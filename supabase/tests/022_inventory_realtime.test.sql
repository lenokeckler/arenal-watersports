begin;
select plan(11);

select ok(
  exists (select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = inventory_table),
  format('%s publishes inventory changes', inventory_table)
)
from unnest(array[
  'equipment_categories',
  'equipment_stock',
  'equipment_units',
  'reservation_dispatches',
  'reservation_items'
]) as inventory_table;

select ok(
  (select relrowsecurity from pg_class where oid = 'public.reservation_dispatches'::regclass),
  'Dispatch realtime reads retain row-level security'
);

select ok(
  has_table_privilege('authenticated', 'public.reservation_dispatches', 'SELECT'),
  'Authenticated clients can read dispatch rows through row-level security'
);

insert into auth.users (id, email)
values ('11111111-0000-0000-0000-000000000001', 'realtime-inventory@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-0000-0000-0000-000000000001', 'realtime_inventory',
  'Inventory operations', 'realtime-inventory@arenal.local', 'operaciones');
insert into equipment_categories (id, name, tracking_mode, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Realtime jet ski', 'by_unit',
  '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');
insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
  'REALTIME-JET-01', '11111111-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000001');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   dispatched_at, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Realtime customer', 1, 'rental',
  '2026-10-04 10:00:00+00', 60, 'dispatched', '2026-10-04 10:00:00+00',
  '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');
insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values ('cccccccc-0000-0000-0000-000000000001', 'dddddddd-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000001', '2026-10-04 10:00:00+00', 60,
  '11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001');
insert into reservation_items (reservation_id, unit_id, dispatch_id, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
  'cccccccc-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-0000-0000-0000-000000000001","role":"authenticated"}';
select is(
  (select effective_status from unit_current_state
    where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'occupied', 'Operations sees the dispatched unit as occupied'
);
select is(
  (select quantity_available from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  0, 'A dispatched unit is excluded from available inventory'
);

update reservation_dispatches set closed_at = '2026-10-04 11:00:00+00'
where id = 'cccccccc-0000-0000-0000-000000000001';

select is(
  (select effective_status from unit_current_state
    where id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'available', 'Closing the dispatch releases the unit without editing equipment'
);
select is(
  (select quantity_available from inventory_category_summary
    where category_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  1, 'Closing the dispatch restores available inventory'
);

reset role;
select * from finish();
rollback;
