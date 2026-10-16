begin;
select plan(32);

insert into auth.users (id, email)
select ('aaaaaaaa-0000-0000-0000-' || lpad(n::text, 12, '0'))::uuid, 'user' || n || '@arenal.local'
  from generate_series(1, 6) as n;

insert into workers (id, username, full_name, personal_email, base_role) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'ana', 'Ana', 'ana@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'beto', 'Beto', 'beto@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'cora', 'Cora', 'cora@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'dani', 'Dani', 'dani@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'eva', 'Eva', 'eva@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'fran', 'Fran', 'fran@example.com', 'reservas');

insert into password_reset_pins (worker_id, pin_hash, expires_at)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now() + interval '10 minutes'
  from workers where username in ('eva', 'dani');

select lives_ok(
  $$ select public.mark_password_reset_pin_undelivered('00000000-0000-0000-0000-000000000000') $$,
  'marcar un id desconocido no falla'
);
select is(
  (select count(*) from password_reset_pins where delivery_failed_at is not null or used_at is not null),
  0::bigint,
  'marcar un id desconocido no cambia ningun PIN'
);

select isnt_empty($$ select * from public.issue_password_reset_pin('ana', '482913', null) $$, 'ana recibe un PIN emitido');
select public.mark_password_reset_pin_undelivered((select id from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'));
select isnt((select delivery_failed_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), null::timestamptz, 'marcar un PIN registra la falla de entrega');
select isnt((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), null::timestamptz, 'marcar un PIN lo gasta');
select is(public.consume_password_reset_pin('ana', '482913'), null::uuid, 'un PIN no entregado no se puede consumir con los digitos correctos');
select isnt_empty($$ select * from public.issue_password_reset_pin('ana', '654321', null) $$, 'el enfriamiento no bloquea un PIN nuevo tras una falla de entrega');
select is(
  (select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  2::bigint,
  'el PIN no entregado sigue contando para el limite por hora'
);

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at, used_at)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now() + interval '5 minutes', now() - interval '5 minutes', now() - interval '4 minutes'
  from workers w, generate_series(1, 4) where w.username = 'beto';
select isnt_empty($$ select * from public.issue_password_reset_pin('beto', '482913', null) $$, 'beto recibe su quinto PIN de la hora');
select public.mark_password_reset_pin_undelivered((select id from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000002' and delivery_failed_at is null and used_at is null));
select is_empty(
  $$ select * from public.issue_password_reset_pin('beto', '654321', null) $$,
  'un PIN no entregado cuenta para el limite por hora aunque el enfriamiento no aplique'
);

select isnt_empty($$ select * from public.issue_password_reset_pin('cora', '482913', null) $$, 'cora recibe un PIN emitido');
select public.mark_password_reset_pin_undelivered((select id from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000003'));
update password_reset_pins
   set delivery_failed_at = now() - interval '1 hour',
       used_at = now() - interval '1 hour'
 where worker_id = 'aaaaaaaa-0000-0000-0000-000000000003';
select public.mark_password_reset_pin_undelivered((select id from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000003'));
select is((select delivery_failed_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000003'), now() - interval '1 hour', 'marcar dos veces conserva la primera marca de entrega');
select is((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000003'), now() - interval '1 hour', 'marcar dos veces conserva la primera fecha de uso');

select is(public.consume_password_reset_pin('dani', '482913'), 'aaaaaaaa-0000-0000-0000-000000000004'::uuid, 'dani gasta su PIN');
update password_reset_pins set used_at = now() - interval '30 minutes' where worker_id = 'aaaaaaaa-0000-0000-0000-000000000004';
select public.mark_password_reset_pin_undelivered((select id from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000004'));
select is((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000004'), now() - interval '30 minutes', 'marcar un PIN ya gastado conserva su fecha de uso');
select isnt((select delivery_failed_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000004'), null::timestamptz, 'marcar un PIN ya gastado registra la falla de entrega');

select isnt_empty($$ select * from public.issue_password_reset_pin('fran', '482913', null) $$, 'fran recibe un primer PIN');
update password_reset_pins set created_at = now() - interval '5 minutes' where worker_id = 'aaaaaaaa-0000-0000-0000-000000000006';
select isnt_empty($$ select * from public.issue_password_reset_pin('fran', '654321', null) $$, 'fran recibe un segundo PIN');
select public.mark_password_reset_pin_undelivered((select id from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000006' and used_at is null));
select is(
  (select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000006' and delivery_failed_at is not null),
  1::bigint,
  'marcar un PIN no toca los otros PIN de la misma cuenta'
);

select is(
  (select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000005' and used_at is null and delivery_failed_at is null),
  1::bigint,
  'marcar un PIN no toca los PIN de otras cuentas'
);
select is(
  (select count(*) from workers where username = 'ana' and status = 'active' and failed_attempts = 0 and blocked_reason is null),
  1::bigint,
  'marcar un PIN no toca la cuenta'
);
select is((select count(*) from password_reset_requests), 0::bigint, 'marcar un PIN no toca las solicitudes de red');

select ok(not has_function_privilege('anon', 'mark_password_reset_pin_undelivered(uuid)', 'execute'), 'anon no marca PIN');
select ok(not has_function_privilege('authenticated', 'mark_password_reset_pin_undelivered(uuid)', 'execute'), 'authenticated no marca PIN');
select ok(has_function_privilege('service_role', 'mark_password_reset_pin_undelivered(uuid)', 'execute'), 'service_role marca PIN');
select is_definer('public', 'mark_password_reset_pin_undelivered', array['uuid'], 'mark_password_reset_pin_undelivered es security definer');
select is(
  (select count(*) from pg_proc, aclexplode(proacl) as privilege where proname = 'mark_password_reset_pin_undelivered' and privilege.grantee = 0),
  0::bigint,
  'mark_password_reset_pin_undelivered no se concede a public'
);
select is(
  (select proconfig from pg_proc where proname = 'mark_password_reset_pin_undelivered'),
  array['search_path=""'],
  'mark_password_reset_pin_undelivered fija search_path vacio'
);

select lives_ok(
  $$ select public.mark_password_reset_pin_undelivered(null) $$,
  'marcar un id nulo no falla'
);
select is(
  (select count(*) from password_reset_pins where delivery_failed_at is not null and worker_id = 'aaaaaaaa-0000-0000-0000-000000000005'),
  0::bigint,
  'marcar un id nulo no cambia ningun PIN'
);

set local role anon;
select throws_ok(
  $$ select public.mark_password_reset_pin_undelivered('00000000-0000-0000-0000-000000000000') $$,
  '42501',
  null,
  'anon recibe permiso denegado al marcar un PIN'
);
reset role;
set local role authenticated;
select throws_ok(
  $$ select public.mark_password_reset_pin_undelivered('00000000-0000-0000-0000-000000000000') $$,
  '42501',
  null,
  'authenticated recibe permiso denegado al marcar un PIN'
);
reset role;

select * from finish();
rollback;
