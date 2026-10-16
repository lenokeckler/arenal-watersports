begin;
select plan(47);

insert into auth.users (id, email) values
  ('22222222-2222-2222-2222-222222222222', 'celso@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'celso', 'Celso', 'reservas');

select col_type_is('public', 'password_reset_pins', 'attempts', 'smallint', 'attempts es smallint');
select col_not_null('public', 'password_reset_pins', 'attempts', 'attempts no admite nulos');
select col_default_is('public', 'password_reset_pins', 'attempts', '0', 'attempts empieza en cero');
select col_type_is('public', 'password_reset_pins', 'requested_ip_hash', 'text', 'requested_ip_hash es text');
select col_is_null('public', 'password_reset_pins', 'requested_ip_hash', 'requested_ip_hash admite nulos');
select col_type_is('public', 'password_reset_pins', 'delivery_failed_at', 'timestamp with time zone', 'delivery_failed_at es timestamptz');
select col_is_null('public', 'password_reset_pins', 'delivery_failed_at', 'delivery_failed_at admite nulos');

select has_index('public', 'password_reset_pins', 'password_reset_pins_worker_requests', array['worker_id', 'created_at'], 'existe el indice por cuenta');
select has_index('public', 'password_reset_pins', 'password_reset_pins_network_requests', array['requested_ip_hash', 'created_at'], 'existe el indice por direccion de red');

select throws_ok(
  $$ insert into password_reset_pins (worker_id, pin_hash, expires_at, attempts)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), -1) $$,
  '23514', null,
  'attempts negativo se rechaza'
);
select throws_ok(
  $$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), 'not-a-hash') $$,
  '23514', null,
  'un valor que no es hexadecimal se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), %L) $$, repeat('a', 63)),
  '23514', null,
  'un hash de longitud incorrecta se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), %L) $$, repeat('A', 64)),
  '23514', null,
  'un hash en mayusculas se rechaza'
);
select lives_ok(
  format($$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), %L) $$, repeat('a', 64)),
  'un hash hexadecimal en minusculas de 64 caracteres se acepta'
);
select lives_ok(
  $$ insert into password_reset_pins (worker_id, pin_hash, expires_at)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now()) $$,
  'una solicitud sin direccion de red se acepta'
);

select is(password_reset_pin_lifetime_minutes(), 10::smallint, 'el PIN vive 10 minutos');
select is(password_reset_pin_attempt_limit(), 5::smallint, 'cada PIN admite 5 intentos');
select is(password_reset_request_cooldown_seconds(), 60::smallint, 'la espera entre solicitudes es de 60 segundos');
select is(password_reset_request_hourly_limit(), 5::smallint, 'cada cuenta admite 5 PIN por hora');
select is(password_reset_network_hourly_limit(), 10::smallint, 'cada direccion de red admite 10 PIN por hora');

select ok(not has_function_privilege('anon', 'password_reset_pin_lifetime_minutes()', 'execute'), 'anon no ejecuta la vigencia');
select ok(not has_function_privilege('authenticated', 'password_reset_pin_lifetime_minutes()', 'execute'), 'authenticated no ejecuta la vigencia');
select ok(not has_function_privilege('anon', 'password_reset_pin_attempt_limit()', 'execute'), 'anon no ejecuta el limite de intentos');
select ok(not has_function_privilege('authenticated', 'password_reset_pin_attempt_limit()', 'execute'), 'authenticated no ejecuta el limite de intentos');
select ok(not has_function_privilege('anon', 'password_reset_request_cooldown_seconds()', 'execute'), 'anon no ejecuta la espera');
select ok(not has_function_privilege('authenticated', 'password_reset_request_cooldown_seconds()', 'execute'), 'authenticated no ejecuta la espera');
select ok(not has_function_privilege('anon', 'password_reset_request_hourly_limit()', 'execute'), 'anon no ejecuta el limite por cuenta');
select ok(not has_function_privilege('authenticated', 'password_reset_request_hourly_limit()', 'execute'), 'authenticated no ejecuta el limite por cuenta');
select ok(not has_function_privilege('anon', 'password_reset_network_hourly_limit()', 'execute'), 'anon no ejecuta el limite por red');
select ok(not has_function_privilege('authenticated', 'password_reset_network_hourly_limit()', 'execute'), 'authenticated no ejecuta el limite por red');
select ok(not has_function_privilege('service_role', 'password_reset_pin_lifetime_minutes()', 'execute'), 'service_role no ejecuta la vigencia');
select ok(not has_function_privilege('service_role', 'password_reset_pin_attempt_limit()', 'execute'), 'service_role no ejecuta el limite de intentos');
select ok(not has_function_privilege('service_role', 'password_reset_request_cooldown_seconds()', 'execute'), 'service_role no ejecuta la espera');
select ok(not has_function_privilege('service_role', 'password_reset_request_hourly_limit()', 'execute'), 'service_role no ejecuta el limite por cuenta');
select ok(not has_function_privilege('service_role', 'password_reset_network_hourly_limit()', 'execute'), 'service_role no ejecuta el limite por red');

select throws_ok(
  format($$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), %L) $$, repeat('a', 65)),
  '23514', null,
  'un hash de 65 caracteres se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), %L) $$, ''),
  '23514', null,
  'un hash vacio se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), %L) $$, repeat('a', 63) || 'g'),
  '23514', null,
  'un hash con una letra fuera de a-f se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), %L) $$, repeat('a', 64) || chr(10)),
  '23514', null,
  'un hash con salto de linea final se rechaza'
);
select lives_ok(
  format($$ insert into password_reset_pins (worker_id, pin_hash, expires_at, requested_ip_hash)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), %L) $$, '0123456789' || repeat('abcdef', 9)),
  'un hash con todos los digitos y letras de a a f se acepta'
);
select lives_ok(
  $$ insert into password_reset_pins (worker_id, pin_hash, expires_at, attempts)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), 0) $$,
  'attempts en cero se acepta'
);
select is(
  (select attempts from password_reset_pins where pin_hash = 'hash' and requested_ip_hash is null limit 1),
  0::smallint,
  'una fila insertada sin attempts queda en cero'
);
select is(
  (select convalidated from pg_constraint where conname = 'password_reset_pins_attempts_not_negative'),
  true,
  'la restriccion de attempts esta validada'
);
select is(
  (select convalidated from pg_constraint where conname = 'password_reset_pins_requested_ip_hash_format'),
  true,
  'la restriccion del hash de red esta validada'
);
select is(
  (select count(*) from pg_proc where proname like 'password\_reset\_%' and prokind = 'f' and provolatile = 'i' and proconfig = array['search_path=""']),
  5::bigint,
  'las cinco funciones de limites son inmutables y fijan search_path'
);
select is(
  (select count(*) from pg_proc, aclexplode(proacl) as privilege where proname like 'password\_reset\_%' and privilege.grantee = 0),
  0::bigint,
  'ninguna funcion de limites se concede a public'
);

select is(
  (select relrowsecurity from pg_class where oid = 'public.password_reset_pins'::regclass),
  true,
  'password_reset_pins conserva la seguridad por filas'
);

select * from finish();
rollback;
