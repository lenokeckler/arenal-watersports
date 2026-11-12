begin;
select plan(7);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Evening', 2, 'rental',
   (date_trunc('day', now() at time zone 'America/Costa_Rica') - interval '5 days' + interval '21 hours')
     at time zone 'America/Costa_Rica',
   60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Cancelled', 1, 'rental',
   now() - interval '3 days', 60, 'cancelled', 'no llego',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000003', 'Old', 1, 'rental',
   '2024-03-12 15:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'Month edge', 1, 'rental',
   '2024-06-01 03:00:00+00', 60, 'scheduled', null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select departures_count from public.weekday_departures
    where weekday = extract(isodow from date_trunc('day', now() at time zone 'America/Costa_Rica') - interval '5 days')::integer),
  1,
  'una salida de las 9 de la noche cuenta en el dia de Costa Rica y no en el siguiente'
);
select is(
  (select coalesce(sum(departures_count), 0)::integer from public.weekday_departures),
  1,
  'los dias de la semana cubren solo el ultimo anio y dejan fuera lo cancelado'
);
select is(
  (select departures_count from public.monthly_departures where month = '2024-03-01'),
  1,
  'el mes cuenta las salidas de ese mes'
);
select is(
  (select departures_count from public.monthly_departures where month = '2024-05-01'),
  1,
  'una salida del ultimo dia del mes por la noche cuenta en ese mes de Costa Rica'
);
select ok(
  not exists (select 1 from public.monthly_departures where month = '2024-06-01'),
  'esa salida no pasa al mes siguiente por la hora UTC'
);
select is(
  (select coalesce(sum(departures_count), 0)::integer from public.monthly_departures),
  3,
  'los meses dejan fuera las reservas canceladas'
);
select ok(
  not has_table_privilege('anon', 'public.monthly_departures', 'select'),
  'anon no consulta los meses'
);

select * from finish();
rollback;
