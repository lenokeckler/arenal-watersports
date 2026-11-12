begin;
select plan(10);

insert into auth.users (id, email) values
  ('55555555-5555-5555-5555-555555555555', 'ops-reservations@arenal.local');

insert into public.workers (id, username, full_name, base_role, must_change_password)
values (
  '55555555-5555-5555-5555-555555555555',
  'ops-reservations',
  'Operations and Reservations',
  'operaciones',
  false
);

insert into public.worker_areas (worker_id, area, granted_by)
values (
  '55555555-5555-5555-5555-555555555555',
  'reservas',
  '55555555-5555-5555-5555-555555555555'
);

insert into public.reservations (
  id, customer_name, people_count, type, starts_at, duration_minutes,
  status, created_by, updated_by
)
values (
  '66666666-6666-6666-6666-666666666666',
  'Test customer',
  2,
  'rental',
  '2026-09-05 10:00:00+00',
  60,
  'closed',
  '55555555-5555-5555-5555-555555555555',
  '55555555-5555-5555-5555-555555555555'
);

insert into public.reservation_pricing (
  reservation_id, list_amount_usd, list_amount_crc,
  agreed_amount_usd, agreed_amount_crc, created_by, updated_by
)
values (
  '66666666-6666-6666-6666-666666666666',
  350,
  180000,
  300,
  155000,
  '55555555-5555-5555-5555-555555555555',
  '55555555-5555-5555-5555-555555555555'
);

insert into public.reservation_charges (
  reservation_id, kind, amount, currency, payment_method, created_by
)
values (
  '66666666-6666-6666-6666-666666666666',
  'tariff',
  100,
  'USD',
  'Cash',
  '55555555-5555-5555-5555-555555555555'
);

insert into public.refunds (reservation_id, amount, currency, reason, created_by)
values (
  '66666666-6666-6666-6666-666666666666',
  30,
  'USD',
  'Test refund',
  '55555555-5555-5555-5555-555555555555'
);

insert into public.deposits (reservation_id, amount, currency, created_by)
values (
  '66666666-6666-6666-6666-666666666666',
  50,
  'USD',
  '55555555-5555-5555-5555-555555555555'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}';

select is(public.choose_work_area('operaciones'), 'chosen', 'worker can choose an enabled operations mode');
select ok(public.has_area('operaciones') and not public.has_area('reservas'), 'active operations mode restricts the enabled reservations area');
select is(
  (select count(*)::int from public.reservations where id = '66666666-6666-6666-6666-666666666666'),
  1,
  'operations can read the reservation row'
);
select is((select count(*)::int from public.reservation_pricing), 0, 'operations cannot read reservation pricing directly');
select is((select count(*)::int from public.reservation_charges), 0, 'operations cannot read reservation charges directly');
select is((select count(*)::int from public.refunds), 0, 'operations cannot read refunds directly');
select is((select count(*)::int from public.deposits), 0, 'operations cannot read deposits directly');
select ok(
  not (
    (select to_jsonb(history_record)
     from public.get_reservation_history_record('66666666-6666-6666-6666-666666666666') as history_record)
    ?| array[
      'amount',
      'agreed_amount_usd',
      'agreed_amount_crc',
      'list_amount_usd',
      'list_amount_crc'
    ]
  ),
  'security definer history RPC does not return reservation money'
);
select is(public.choose_work_area('administracion'), 'not_enabled', 'mode selection cannot grant an unassigned area');

set local request.jwt.claims to '';
select ok(not public.has_area('operaciones') and not public.has_area('reservas'), 'cleared claims do not retain authenticated areas');
reset role;

select * from finish();
rollback;
