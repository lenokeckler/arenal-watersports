begin;
select plan(14);

insert into auth.users (id, email) values
  ('e1300000-0000-4000-8000-000000000001', 'res13-registrar@arenal.local'),
  ('e1300000-0000-4000-8000-000000000002', 'res13-unmarked@arenal.local'),
  ('e1300000-0000-4000-8000-000000000003', 'res13-new-guide@arenal.local'),
  ('e1300000-0000-4000-8000-000000000004', 'res13-duplicate@arenal.local'),
  ('e1300000-0000-4000-8000-000000000005', 'res13-invalid@arenal.local'),
  ('e1300000-0000-4000-8000-000000000006', 'res13-existing-id@arenal.local');

insert into workers (id, username, full_name, base_role) values
  ('e1300000-0000-4000-8000-000000000001', 'res13-registrar', 'Registrar', 'reservas'),
  ('e1300000-0000-4000-8000-000000000002', 'res13-unmarked', 'Unmarked', 'reservas'),
  ('e1300000-0000-4000-8000-000000000006', 'res13-existing-id', 'Existing ID', 'operaciones');

update workers set national_id = '130000006'
where id = 'e1300000-0000-4000-8000-000000000006';

insert into worker_marks (worker_id, mark, granted_by)
values ('e1300000-0000-4000-8000-000000000001',
        'registro_guias_externos', 'e1300000-0000-4000-8000-000000000001');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e1300000-0000-4000-8000-000000000002","role":"authenticated"}';

select is(can_register_external_guide(), false, 'unmarked reservations cannot register guides');
select is(
  register_external_guide('e1300000-0000-4000-8000-000000000003', 'Guide', '130000003', current_date + 1),
  'not_allowed', 'unmarked reservations cannot call registration directly');

set local request.jwt.claims to '{"sub":"e1300000-0000-4000-8000-000000000001","role":"authenticated"}';

select is(can_register_external_guide(), true, 'marked reservations can register guides');
select is(
  register_external_guide('e1300000-0000-4000-8000-000000000003', 'External Guide', '130000003',
    (now() at time zone 'America/Costa_Rica')::date, null),
  'created', 'registrar creates the external guide without a personal email');

reset role;

select is(
  (select username from workers where id = 'e1300000-0000-4000-8000-000000000003'),
  '130000003', 'national ID is the username');
select is(
  (select base_role::text from workers where id = 'e1300000-0000-4000-8000-000000000003'),
  'operaciones', 'external guide has operations role');
select is(
  (select is_external_guide from workers where id = 'e1300000-0000-4000-8000-000000000003'),
  true, 'created worker is identified as an external guide');
select is(
  (select created_by from workers where id = 'e1300000-0000-4000-8000-000000000003'),
  'e1300000-0000-4000-8000-000000000001'::uuid, 'creator is recorded');
select is(
  (select count(*)::integer from worker_marks
    where worker_id = 'e1300000-0000-4000-8000-000000000003' and mark = 'guia'),
  1, 'guide mark is created atomically');
select is(
  (select must_change_password from workers where id = 'e1300000-0000-4000-8000-000000000003'),
  true, 'temporary password must change on first sign in');
select is(
  (select expires_at from workers where id = 'e1300000-0000-4000-8000-000000000003'),
  (((now() at time zone 'America/Costa_Rica')::date + 1)::timestamp
    at time zone 'America/Costa_Rica'),
  'guide remains active through the specified Costa Rica date');

set local role authenticated;
set local request.jwt.claims to '{"sub":"e1300000-0000-4000-8000-000000000001","role":"authenticated"}';

select is(
  register_external_guide('e1300000-0000-4000-8000-000000000004', 'Duplicate Guide', '130000003', current_date + 1),
  'national_id_taken', 'duplicate national ID cannot create another worker');
select is(
  register_external_guide('e1300000-0000-4000-8000-000000000005', 'Invalid Guide', '130000005', null),
  'invalid_input', 'expiry date is required');
select is(
  register_external_guide('e1300000-0000-4000-8000-000000000004', 'Existing ID', '130000006', current_date + 1),
  'national_id_taken', 'a different username cannot reuse an existing national ID');

reset role;
select * from finish();
rollback;
