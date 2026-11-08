begin;
select plan(8);

insert into auth.users (id, email) values
  ('d7260000-0000-4000-8000-000000000001', 'ope25-history-ops@arenal.local'),
  ('d7260000-0000-4000-8000-000000000002', 'ope25-history-reservations@arenal.local');
insert into workers (id, username, full_name, base_role, must_change_password) values
  ('d7260000-0000-4000-8000-000000000001', 'ope25_history_ops', 'History Operations Actor', 'operaciones', false),
  ('d7260000-0000-4000-8000-000000000002', 'ope25_history_reservations', 'History Reservations Actor', 'operaciones', false);
insert into worker_areas (worker_id, area, granted_by) values
  ('d7260000-0000-4000-8000-000000000002', 'reservas', 'd7260000-0000-4000-8000-000000000001');
update workers set last_work_area = 'reservas'
where id = 'd7260000-0000-4000-8000-000000000002';
insert into equipment_categories (id, name, tracking_mode, created_by, updated_by)
values ('d7260001-0000-4000-8000-000000000001', 'OPE25 history test', 'by_quantity',
        'd7260000-0000-4000-8000-000000000001', 'd7260000-0000-4000-8000-000000000001'),
       ('d7260001-0000-4000-8000-000000000002', 'OPE25 unit history test', 'by_unit',
        'd7260000-0000-4000-8000-000000000001', 'd7260000-0000-4000-8000-000000000001');
insert into equipment_stock_movements
  (id, category_id, from_available, to_available, from_damaged, to_damaged,
   from_in_repair, to_in_repair, reason, created_by, created_at)
values
  ('d7260002-0000-4000-8000-000000000001', 'd7260001-0000-4000-8000-000000000001', 0, 10, 0, 0, 0, 0, 'initial_count', 'd7260000-0000-4000-8000-000000000001', '2026-01-01 00:00:00+00'),
  ('d7260002-0000-4000-8000-000000000002', 'd7260001-0000-4000-8000-000000000001', 10, 9, 0, 1, 0, 0, 'discarded', 'd7260000-0000-4000-8000-000000000001', '2026-01-02 00:00:00+00'),
  ('d7260002-0000-4000-8000-000000000003', 'd7260001-0000-4000-8000-000000000001', 9, 8, 1, 1, 0, 0, 'lost', 'd7260000-0000-4000-8000-000000000001', '2026-01-03 00:00:00+00');

select ok(
  not has_function_privilege('anon', 'public.list_operations_stock_movements(uuid,integer,integer)', 'execute'),
  'anonymous users cannot execute the history RPC');
set local role authenticated;
set local request.jwt.claims to '{"sub":"d7260000-0000-4000-8000-000000000001","role":"authenticated"}';
select results_eq(
  $$select movement_id, moved_at, reason, actor_name, from_available, to_available,
           from_damaged, to_damaged, from_in_repair, to_in_repair, total_count, page_index
    from public.list_operations_stock_movements('d7260001-0000-4000-8000-000000000001', 0, 1)$$,
  $$select movement.id, movement.created_at, movement.reason, worker.full_name,
           movement.from_available, movement.to_available, movement.from_damaged,
           movement.to_damaged, movement.from_in_repair, movement.to_in_repair, 3::bigint, 0
    from equipment_stock_movements as movement
    join workers as worker on worker.id = movement.created_by
    where movement.id = 'd7260002-0000-4000-8000-000000000003'$$,
  'first page contains latest movement, actor name and quantity deltas');
select is(
  (select movement_id from public.list_operations_stock_movements('d7260001-0000-4000-8000-000000000001', 1, 1)),
  'd7260002-0000-4000-8000-000000000002'::uuid, 'next page contains previous movement');
select is(
  (select page_index from public.list_operations_stock_movements('d7260001-0000-4000-8000-000000000001', 99, 1)),
  2, 'an out-of-range page is clamped to the last page');
select throws_ok(
  $$select * from public.list_operations_stock_movements('d7260001-0000-4000-8000-000000000099', 0, 10)$$,
  'P0002', null, 'history is limited to an existing quantity category');
select throws_ok(
  $$select * from public.list_operations_stock_movements('d7260001-0000-4000-8000-000000000002', 0, 10)$$,
  'P0002', null, 'unit categories do not expose quantity movement history');
select throws_ok(
  $$select * from public.list_operations_stock_movements('d7260001-0000-4000-8000-000000000001', -1, 10)$$,
  '22023', null, 'invalid pagination is rejected');
set local request.jwt.claims to '{"sub":"d7260000-0000-4000-8000-000000000002","role":"authenticated"}';
select throws_ok(
  $$select * from public.list_operations_stock_movements('d7260001-0000-4000-8000-000000000001', 0, 10)$$,
  '42501', null, 'operations in reservations mode cannot read inventory history');

select * from finish();
rollback;
