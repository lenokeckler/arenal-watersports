begin;
select plan(54);

insert into auth.users (id, email) values
  ('22222222-2222-2222-2222-222222222222', 'celso@arenal.local');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'celso', 'Celso', 'reservas');

select col_type_is('public', 'password_reset_pins', 'attempts', 'smallint', 'attempts es smallint');
select col_not_null('public', 'password_reset_pins', 'attempts', 'attempts no admite nulos');
select col_default_is('public', 'password_reset_pins', 'attempts', '0', 'attempts empieza en cero');
select col_type_is('public', 'password_reset_pins', 'delivery_failed_at', 'timestamp with time zone', 'delivery_failed_at es timestamptz');
select col_is_null('public', 'password_reset_pins', 'delivery_failed_at', 'delivery_failed_at admite nulos');
select hasnt_column('public', 'password_reset_pins', 'requested_ip_hash', 'el PIN ya no guarda la direccion de red');
select has_index('public', 'password_reset_pins', 'password_reset_pins_worker_requests', array['worker_id', 'created_at'], 'existe el indice por cuenta');
select hasnt_index('public', 'password_reset_pins', 'password_reset_pins_network_requests', 'el PIN ya no tiene indice por red');

select throws_ok(
  $$ insert into password_reset_pins (worker_id, pin_hash, expires_at, attempts)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), -1) $$,
  '23514', null,
  'attempts negativo se rechaza'
);
select lives_ok(
  $$ insert into password_reset_pins (worker_id, pin_hash, expires_at, attempts)
     values ('22222222-2222-2222-2222-222222222222', 'hash', now(), 0) $$,
  'attempts en cero se acepta'
);
select is(
  (select attempts from password_reset_pins where pin_hash = 'hash' limit 1),
  0::smallint,
  'una fila insertada con attempts en cero queda en cero'
);
select is(
  (select convalidated from pg_constraint where conname = 'password_reset_pins_attempts_not_negative'),
  true,
  'la restriccion de attempts esta validada'
);

select has_table('public', 'password_reset_requests', 'existe el registro de solicitudes por red');
select col_type_is('public', 'password_reset_requests', 'id', 'uuid', 'id es uuid');
select col_is_pk('public', 'password_reset_requests', 'id', 'id es la llave primaria');
select col_type_is('public', 'password_reset_requests', 'network_key', 'text', 'network_key es text');
select col_not_null('public', 'password_reset_requests', 'network_key', 'network_key no admite nulos');
select col_type_is('public', 'password_reset_requests', 'created_at', 'timestamp with time zone', 'created_at es timestamptz');
select col_not_null('public', 'password_reset_requests', 'created_at', 'created_at no admite nulos');
select col_default_is('public', 'password_reset_requests', 'created_at', 'now()', 'created_at empieza en el momento actual');
select has_index('public', 'password_reset_requests', 'password_reset_requests_network_requests', array['network_key', 'created_at'], 'existe el indice por red');

select throws_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, 'not-a-hash'),
  '23514', null,
  'un valor que no es hexadecimal se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, repeat('a', 63)),
  '23514', null,
  'una clave de 63 caracteres se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, repeat('a', 65)),
  '23514', null,
  'una clave de 65 caracteres se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, repeat('A', 64)),
  '23514', null,
  'una clave en mayusculas se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, ''),
  '23514', null,
  'una clave vacia se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, repeat('a', 63) || 'g'),
  '23514', null,
  'una clave con una letra fuera de a-f se rechaza'
);
select throws_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, repeat('a', 64) || chr(10)),
  '23514', null,
  'una clave con salto de linea final se rechaza'
);
select lives_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, repeat('a', 64)),
  'una clave hexadecimal en minusculas de 64 caracteres se acepta'
);
select lives_ok(
  format($$ insert into password_reset_requests (network_key) values (%L) $$, '0123456789' || repeat('abcdef', 9)),
  'una clave con todos los digitos y letras de a a f se acepta'
);
select is(
  (select convalidated from pg_constraint where conname = 'password_reset_requests_network_key_format'),
  true,
  'la restriccion de la clave de red esta validada'
);
select is(
  (select relrowsecurity from pg_class where oid = 'public.password_reset_requests'::regclass),
  true,
  'password_reset_requests tiene seguridad por filas'
);
select is(
  (select count(*) from pg_policies where schemaname = 'public' and tablename = 'password_reset_requests'),
  0::bigint,
  'password_reset_requests no tiene politicas'
);
select ok(not has_table_privilege('anon', 'public.password_reset_requests', 'select'), 'anon no lee las solicitudes');
select ok(not has_table_privilege('anon', 'public.password_reset_requests', 'insert'), 'anon no registra solicitudes');
select ok(not has_table_privilege('authenticated', 'public.password_reset_requests', 'select'), 'authenticated no lee las solicitudes');
select ok(not has_table_privilege('authenticated', 'public.password_reset_requests', 'insert'), 'authenticated no registra solicitudes');

select is(
  (select count(*) from unnest(array['select', 'insert', 'update', 'delete', 'truncate', 'references', 'trigger']) as privilege where has_table_privilege('anon', 'public.password_reset_requests', privilege)),
  0::bigint,
  'anon no tiene ningun privilegio sobre las solicitudes'
);
select ok(not has_any_column_privilege('anon', 'public.password_reset_requests', 'select, insert, update, references'), 'anon no tiene privilegios por columna sobre las solicitudes');
select is(
  (select count(*) from unnest(array['select', 'insert', 'update', 'delete', 'truncate', 'references', 'trigger']) as privilege where has_table_privilege('authenticated', 'public.password_reset_requests', privilege)),
  0::bigint,
  'authenticated no tiene ningun privilegio sobre las solicitudes'
);
select ok(not has_any_column_privilege('authenticated', 'public.password_reset_requests', 'select, insert, update, references'), 'authenticated no tiene privilegios por columna sobre las solicitudes');
select is(
  (select count(*) from password_reset_requests where network_key = repeat('a', 64) and id is not null and created_at = now()),
  1::bigint,
  'una solicitud recibe id y la hora actual por defecto'
);

select is(password_reset_pin_lifetime_minutes(), 10::smallint, 'el PIN vive 10 minutos');
select is(password_reset_pin_attempt_limit(), 5::smallint, 'cada PIN admite 5 intentos');
select is(password_reset_request_cooldown_seconds(), 60::smallint, 'la espera entre solicitudes es de 60 segundos');
select is(password_reset_request_hourly_limit(), 5::smallint, 'cada cuenta admite 5 PIN por hora');
select is(password_reset_network_hourly_limit(), 10::smallint, 'cada direccion de red admite 10 solicitudes por hora');
select is(password_reset_limit_window_minutes(), 60::smallint, 'la ventana de los limites es de 60 minutos');

select is(
  (select count(*) from pg_proc where pronamespace = 'public'::regnamespace and proname = any(array['password_reset_pin_lifetime_minutes', 'password_reset_pin_attempt_limit', 'password_reset_request_cooldown_seconds', 'password_reset_request_hourly_limit', 'password_reset_network_hourly_limit', 'password_reset_limit_window_minutes']) and prokind = 'f' and provolatile = 'i' and proconfig = array['search_path=""']),
  6::bigint,
  'las seis funciones de limites son inmutables y fijan search_path'
);
select is(
  (select count(*) from pg_proc, aclexplode(proacl) as privilege where pronamespace = 'public'::regnamespace and proname = any(array['password_reset_pin_lifetime_minutes', 'password_reset_pin_attempt_limit', 'password_reset_request_cooldown_seconds', 'password_reset_request_hourly_limit', 'password_reset_network_hourly_limit', 'password_reset_limit_window_minutes']) and privilege.grantee = 0),
  0::bigint,
  'ninguna funcion de limites se concede a public'
);
select is(
  (select count(*) from pg_proc where pronamespace = 'public'::regnamespace and proname = any(array['password_reset_pin_lifetime_minutes', 'password_reset_pin_attempt_limit', 'password_reset_request_cooldown_seconds', 'password_reset_request_hourly_limit', 'password_reset_network_hourly_limit', 'password_reset_limit_window_minutes']) and has_function_privilege('anon', oid, 'execute')),
  0::bigint,
  'anon no ejecuta ninguna funcion de limites'
);
select is(
  (select count(*) from pg_proc where pronamespace = 'public'::regnamespace and proname = any(array['password_reset_pin_lifetime_minutes', 'password_reset_pin_attempt_limit', 'password_reset_request_cooldown_seconds', 'password_reset_request_hourly_limit', 'password_reset_network_hourly_limit', 'password_reset_limit_window_minutes']) and has_function_privilege('authenticated', oid, 'execute')),
  0::bigint,
  'authenticated no ejecuta ninguna funcion de limites'
);
select is(
  (select count(*) from pg_proc where pronamespace = 'public'::regnamespace and proname = any(array['password_reset_pin_lifetime_minutes', 'password_reset_pin_attempt_limit', 'password_reset_request_cooldown_seconds', 'password_reset_request_hourly_limit', 'password_reset_network_hourly_limit', 'password_reset_limit_window_minutes']) and has_function_privilege('service_role', oid, 'execute')),
  0::bigint,
  'service_role no ejecuta ninguna funcion de limites'
);

select is(
  (select relrowsecurity from pg_class where oid = 'public.password_reset_pins'::regclass),
  true,
  'password_reset_pins conserva la seguridad por filas'
);

select * from finish();
rollback;
