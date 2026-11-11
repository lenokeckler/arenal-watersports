begin;
select plan(22);

insert into auth.users (id, email) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'user1@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'ana', 'Ana', 'ana@example.com', 'reservas');

insert into password_reset_pins (id, worker_id, pin_hash, expires_at, created_at, used_at) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'hash', now() - interval '25 hours', now() - interval '25 hours' - interval '10 minutes', now() - interval '25 hours'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'hash', now() + interval '10 minutes', now() - interval '24 hours' - interval '1 second', null),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'hash', now() - interval '23 hours', now() - interval '24 hours', null),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'hash', now() + interval '10 minutes', now() - interval '1 hour', null),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'hash', now() + interval '10 minutes', now(), null);

insert into password_reset_requests (id, network_key, created_at) values
  ('cccccccc-0000-0000-0000-000000000001', repeat('a', 64), now() - interval '48 hours'),
  ('cccccccc-0000-0000-0000-000000000002', repeat('a', 64), now() - interval '24 hours'),
  ('cccccccc-0000-0000-0000-000000000003', repeat('a', 64), now() - interval '1 hour');

select is(public.password_reset_retention_hours(), 24::smallint, 'los registros de recuperacion se conservan 24 horas');

set local role anon;
select throws_ok($$ select public.purge_password_reset_records() $$, '42501', null, 'anon no puede purgar');
reset role;

set local role authenticated;
select throws_ok($$ select public.purge_password_reset_records() $$, '42501', null, 'authenticated no puede purgar');
reset role;

set local role service_role;
select throws_ok($$ select public.purge_password_reset_records() $$, '42501', null, 'service_role no puede purgar');
reset role;

select lives_ok($$ select public.purge_password_reset_records() $$, 'la purga corre sin error');

select is((select count(*) from password_reset_pins where id = 'bbbbbbbb-0000-0000-0000-000000000001'), 0::bigint, 'un PIN gastado de mas de 24 horas se borra');
select is((select count(*) from password_reset_pins where id = 'bbbbbbbb-0000-0000-0000-000000000002'), 0::bigint, 'un PIN vivo sin gastar de mas de 24 horas tambien se borra');
select is((select count(*) from password_reset_pins where id = 'bbbbbbbb-0000-0000-0000-000000000003'), 1::bigint, 'un PIN de exactamente 24 horas se conserva');
select is((select count(*) from password_reset_pins where id = 'bbbbbbbb-0000-0000-0000-000000000004'), 1::bigint, 'un PIN de una hora se conserva');
select is((select count(*) from password_reset_pins where id = 'bbbbbbbb-0000-0000-0000-000000000005'), 1::bigint, 'un PIN recien emitido se conserva');
select is((select count(*) from password_reset_requests where id = 'cccccccc-0000-0000-0000-000000000001'), 0::bigint, 'una solicitud de mas de 24 horas se borra');
select is((select count(*) from password_reset_requests where id = 'cccccccc-0000-0000-0000-000000000002'), 1::bigint, 'una solicitud de exactamente 24 horas se conserva');
select is((select count(*) from password_reset_requests where id = 'cccccccc-0000-0000-0000-000000000003'), 1::bigint, 'una solicitud reciente se conserva');
select is((select count(*) from password_reset_pins), 3::bigint, 'solo sobreviven los tres PIN dentro de la retencion');
select is((select count(*) from password_reset_requests), 2::bigint, 'solo sobreviven las dos solicitudes dentro de la retencion');
select is((select count(*) from workers where id = 'aaaaaaaa-0000-0000-0000-000000000001'), 1::bigint, 'la purga no toca la cuenta del trabajador');

select is(
  (select schedule from cron.job where jobname = 'purge-password-reset-records'),
  '0 * * * *',
  'la purga esta programada cada hora'
);
select is(
  (select trim(command) from cron.job where jobname = 'purge-password-reset-records'),
  'select public.purge_password_reset_records();',
  'la purga programada llama a su funcion'
);
select is((select count(*) from cron.job where jobname = 'purge-password-reset-records'), 1::bigint, 'la purga esta programada una sola vez');

select is_definer('public', 'purge_password_reset_records', array[]::text[], 'la purga es security definer');
select is(
  (select proconfig from pg_proc where pronamespace = 'public'::regnamespace and proname = 'purge_password_reset_records'),
  array['search_path=""'],
  'la purga fija un search_path vacio'
);
select ok(
  not has_function_privilege('anon', 'password_reset_retention_hours()', 'execute')
  and not has_function_privilege('authenticated', 'password_reset_retention_hours()', 'execute')
  and not has_function_privilege('service_role', 'password_reset_retention_hours()', 'execute'),
  'nadie sin privilegios ejecuta la funcion de retencion'
);

select * from finish();
rollback;
