begin;
select plan(8);

insert into auth.users (id, email) values
  ('b0a2d100-0000-0000-0000-000000000001', 'board-ops@arenal.local'),
  ('b0a2d100-0000-0000-0000-000000000002', 'board-reservations@arenal.local'),
  ('b0a2d100-0000-0000-0000-000000000003', 'board-no-area@arenal.local'),
  ('b0a2d100-0000-0000-0000-000000000004', 'board-admin-access@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('b0a2d100-0000-0000-0000-000000000001', 'board_ops', 'Operations', 'board-ops@arenal.local', 'operaciones'),
  ('b0a2d100-0000-0000-0000-000000000002', 'board_reservations', 'Reservations', 'board-reservations@arenal.local', 'reservas'),
  ('b0a2d100-0000-0000-0000-000000000003', 'board_no_area', 'No area', 'board-no-area@arenal.local', 'reservas'),
  ('b0a2d100-0000-0000-0000-000000000004', 'board_admin_access', 'Administrator', 'board-admin-access@arenal.local', 'administracion');

delete from worker_areas
where worker_id = 'b0a2d100-0000-0000-0000-000000000003';

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values
  ('b0a2d101-0000-0000-0000-000000000001', 'Board access jet ski', 'by_unit', true, 60,
   'b0a2d100-0000-0000-0000-000000000001', 'b0a2d100-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, created_by, updated_by)
values
  ('b0a2d102-0000-0000-0000-000000000001', 'b0a2d101-0000-0000-0000-000000000001',
   'BRD-ACC-01', 'b0a2d100-0000-0000-0000-000000000001',
   'b0a2d100-0000-0000-0000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"b0a2d100-0000-0000-0000-000000000001","role":"authenticated"}';
select is(
  (select count(*)::integer from board_category_summary where category_id = 'b0a2d101-0000-0000-0000-000000000001'),
  1,
  'operaciones lee el tablero'
);
select is(
  (select total_count from board_category_summary where category_id = 'b0a2d101-0000-0000-0000-000000000001'),
  1,
  'operaciones ve el total de la categoria'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"b0a2d100-0000-0000-0000-000000000002","role":"authenticated"}';
select is(
  (select count(*)::integer from board_category_summary where category_id = 'b0a2d101-0000-0000-0000-000000000001'),
  1,
  'reservas lee el tablero'
);
select is(
  (select free_count from board_category_summary where category_id = 'b0a2d101-0000-0000-0000-000000000001'),
  1,
  'reservas ve las unidades libres'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"b0a2d100-0000-0000-0000-000000000004","role":"authenticated"}';
select is(
  (select count(*)::integer from board_category_summary where category_id = 'b0a2d101-0000-0000-0000-000000000001'),
  1,
  'administracion lee el tablero'
);
select is(
  (select in_use_count from board_category_summary where category_id = 'b0a2d101-0000-0000-0000-000000000001'),
  0,
  'administracion ve las unidades en uso'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"b0a2d100-0000-0000-0000-000000000003","role":"authenticated"}';
select is(
  (select count(*)::integer from board_category_summary where category_id = 'b0a2d101-0000-0000-0000-000000000001'),
  0,
  'un trabajador sin area no lee el tablero'
);
select is(
  (select count(*)::integer from board_category_summary),
  0,
  'un trabajador sin area no ve ninguna fila'
);

reset role;
select * from finish();
rollback;
