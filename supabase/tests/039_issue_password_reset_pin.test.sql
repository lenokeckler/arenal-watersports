begin;
select plan(73);

insert into auth.users (id, email) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'celso@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'blocka@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'blockb@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'retired@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'noemail@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'expired@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000007', 'guide@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000008', 'elena@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000009', 'lena@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000010', 'mara@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000011', 'gina@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000012', 'hugo@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000013', 'ines@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000014', 'jorge@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000015', 'kira@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000016', 'luis@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000017', 'omar@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000018', 'quin@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000019', 'rosa@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000020', 'nora@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000021', 'tina@arenal.local'),
  ('aaaaaaaa-0000-0000-0000-000000000022', 'vera@arenal.local');
insert into auth.users (id, email)
select format('bbbbbbbb-0000-0000-0000-%s', lpad(n::text, 12, '0'))::uuid,
       format('network%s@arenal.local', n)
  from generate_series(1, 10) as n;

insert into workers (id, username, full_name, personal_email, base_role) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'celso', 'Celso', 'celso@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'blocka', 'Bloqueo intentos', 'blocka@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'blockb', 'Bloqueo administracion', 'blockb@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'retired', 'Retirado', 'retired@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'noemail', 'Sin correo', null, 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000008', 'elena', 'Elena', 'elena@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000009', 'lena', 'Lena', 'lena@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000010', 'mara', 'Mara', 'mara@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000011', 'gina', 'Gina', 'gina@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000012', 'hugo', 'Hugo', 'hugo@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000013', 'ines', 'Ines', 'ines@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000014', 'jorge', 'Jorge', 'jorge@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000015', 'kira', 'Kira', 'kira@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000016', 'luis', 'Luis', 'luis@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000017', 'omar', 'Omar', 'omar@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000018', 'quin', 'Quin', 'quin@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000019', 'rosa', 'Rosa', 'rosa@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000020', 'nora', 'Nora', 'nora@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000021', 'tina', 'Tina', 'tina@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000022', 'vera', 'Vera', 'vera@example.com', 'reservas');
insert into workers (id, username, full_name, personal_email, base_role, is_external_guide, national_id, expires_at) values
  ('aaaaaaaa-0000-0000-0000-000000000006', 'expired', 'Guia vencido', 'expired@example.com', 'operaciones', true, '1-1111-1111', now() - interval '1 day'),
  ('aaaaaaaa-0000-0000-0000-000000000007', 'guide', 'Guia vigente', 'guide@example.com', 'operaciones', true, '2-2222-2222', now() + interval '1 day');
insert into workers (id, username, full_name, personal_email, base_role)
select format('bbbbbbbb-0000-0000-0000-%s', lpad(n::text, 12, '0'))::uuid,
       format('network%s', n),
       format('Red %s', n),
       format('network%s@example.com', n),
       'reservas'
  from generate_series(1, 10) as n;

update workers set status = 'blocked', blocked_reason = 'failed_attempts' where username = 'blocka';
update workers set status = 'blocked', blocked_reason = 'administration' where username in ('blockb', 'vera');
update workers set deleted_at = now() where username = 'retired';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, 'hash', now() + interval '5 minutes', now() - make_interval(mins => 10 * n)
  from workers, generate_series(1, 5) as n
 where username = 'elena';
update password_reset_pins set delivery_failed_at = now()
 where worker_id = 'aaaaaaaa-0000-0000-0000-000000000008'
   and created_at = now() - interval '10 minutes';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, 'hash', now() + interval '5 minutes', now() - make_interval(mins => 10 * n)
  from workers, generate_series(1, 4) as n
 where username = 'lena';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, 'hash', now() - interval '1 hour', now() - make_interval(mins => 60 + n)
  from workers, generate_series(1, 5) as n
 where username = 'mara';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at, requested_ip_hash)
select id, 'hash', now() + interval '5 minutes', now() - interval '5 minutes', repeat('b', 64)
  from workers
 where username like 'network%';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
values ('aaaaaaaa-0000-0000-0000-000000000014', 'old-hash', now() + interval '5 minutes', now() - interval '2 minutes');

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
values
  ('aaaaaaaa-0000-0000-0000-000000000016', 'hash', now() + interval '5 minutes', now() - interval '60 seconds'),
  ('aaaaaaaa-0000-0000-0000-000000000019', 'hash', now() + interval '5 minutes', now() - interval '30 seconds'),
  ('aaaaaaaa-0000-0000-0000-000000000019', 'hash', now() + interval '5 minutes', now() - interval '5 minutes'),
  ('aaaaaaaa-0000-0000-0000-000000000020', 'hash', now() + interval '5 minutes', now() - interval '5 minutes'),
  ('aaaaaaaa-0000-0000-0000-000000000021', 'hash', now() + interval '5 minutes', now() - interval '5 minutes'),
  ('aaaaaaaa-0000-0000-0000-000000000022', 'hash', now() + interval '5 minutes', now() - interval '5 minutes');
insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select 'aaaaaaaa-0000-0000-0000-000000000017', 'hash', now() + interval '5 minutes', now() - make_interval(mins => 60 - 10 * n)
  from generate_series(0, 4) as n;
insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select 'aaaaaaaa-0000-0000-0000-000000000018', 'hash', now() + interval '5 minutes',
       now() - case n when 0 then interval '59 minutes 59 seconds' else make_interval(mins => 60 - 10 * n) end
  from generate_series(0, 4) as n;
update workers set personal_email = null where username = 'tina';

create temp table issued as
select * from public.issue_password_reset_pin('celso', '482913', repeat('a', 64));

select is((select count(*) from issued), 1::bigint, 'una cuenta elegible recibe una fila');
select is((select personal_email from issued), 'celso@example.com', 'devuelve el correo personal');
select is((select lifetime_minutes from issued), 10, 'devuelve la vigencia en minutos');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 1::bigint, 'se inserta un PIN');
select is((select pin_id from issued), (select id from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 'devuelve el id del PIN insertado');
select isnt((select pin_hash from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), '482913', 'el PIN no se guarda en claro');
select ok((select extensions.crypt('482913', pin_hash) = pin_hash from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 'el hash corresponde al PIN');
select is((select expires_at - created_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), interval '10 minutes', 'el PIN vence a los 10 minutos');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 0::smallint, 'el PIN empieza con cero intentos');
select is((select requested_ip_hash from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), repeat('a', 64), 'guarda el hash de la red');
select is((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), null::timestamptz, 'el PIN nuevo no esta gastado');

select isnt_empty($$ select * from public.issue_password_reset_pin('  KIRA ', '123456', null) $$, 'el usuario se normaliza');
select isnt_empty($$ select * from public.issue_password_reset_pin('guide', '123456', null) $$, 'un guia externo vigente recibe PIN');

select is_empty($$ select * from public.issue_password_reset_pin('nobody', '123456', null) $$, 'un usuario desconocido no recibe fila');
select is_empty($$ select * from public.issue_password_reset_pin('blocka', '123456', null) $$, 'una cuenta bloqueada por intentos no recibe fila');
select is_empty($$ select * from public.issue_password_reset_pin('blockb', '123456', null) $$, 'una cuenta bloqueada por administracion no recibe fila');
select is_empty($$ select * from public.issue_password_reset_pin('retired', '123456', null) $$, 'una cuenta retirada no recibe fila');
select is_empty($$ select * from public.issue_password_reset_pin('noemail', '123456', null) $$, 'una cuenta sin correo no recibe fila');
select is_empty($$ select * from public.issue_password_reset_pin('expired', '123456', null) $$, 'un guia externo vencido no recibe fila');
select is(
  (select count(*) from password_reset_pins where worker_id in (
    'aaaaaaaa-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000003',
    'aaaaaaaa-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000005',
    'aaaaaaaa-0000-0000-0000-000000000006')),
  0::bigint,
  'las cuentas no elegibles no reciben ningun PIN'
);

select is_empty($$ select * from public.issue_password_reset_pin('celso', '123456', null) $$, 'la segunda solicitud inmediata no recibe fila');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 1::bigint, 'la espera no inserta otro PIN');

update password_reset_pins set delivery_failed_at = now() where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001';
select isnt_empty($$ select * from public.issue_password_reset_pin('celso', '123456', null) $$, 'tras una entrega fallida la espera no aplica');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 2::bigint, 'la solicitud tras la entrega fallida inserta un PIN');

select is_empty($$ select * from public.issue_password_reset_pin('elena', '123456', null) $$, 'cinco PIN en la hora, con una entrega fallida, bloquean el sexto');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000008'), 5::bigint, 'el tope por cuenta no inserta otro PIN');
select isnt_empty($$ select * from public.issue_password_reset_pin('lena', '123456', null) $$, 'cuatro PIN en la hora dejan pasar el quinto');
select isnt_empty($$ select * from public.issue_password_reset_pin('mara', '123456', null) $$, 'los PIN de hace mas de una hora no cuentan');

select is_empty($$ select * from public.issue_password_reset_pin('gina', '123456', repeat('b', 64)) $$, 'diez PIN de una red en la hora bloquean el undecimo');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000011'), 0::bigint, 'el tope por red no inserta un PIN');
select isnt_empty($$ select * from public.issue_password_reset_pin('hugo', '123456', repeat('c', 64)) $$, 'otra red sigue pasando');
select isnt_empty($$ select * from public.issue_password_reset_pin('ines', '123456', null) $$, 'sin hash de red no hay tope por red');

select isnt_empty($$ select * from public.issue_password_reset_pin('jorge', '123456', null) $$, 'jorge recibe un PIN nuevo');
select is((select used_at is not null from password_reset_pins where pin_hash = 'old-hash'), true, 'el PIN nuevo gasta el PIN anterior sin usar');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000014' and used_at is null), 1::bigint, 'queda un solo PIN vigente');

select isnt_empty($$ select * from public.issue_password_reset_pin(' LUIS ', '123456', null) $$, 'una solicitud justo a los 60 segundos de la anterior pasa');
select isnt_empty($$ select * from public.issue_password_reset_pin('omar', '123456', null) $$, 'un PIN justo de hace una hora no cuenta para el tope');
select is_empty($$ select * from public.issue_password_reset_pin('quin', '123456', null) $$, 'cinco PIN dentro de la hora, el mas viejo a un segundo de salir, bloquean la solicitud');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000018'), 5::bigint, 'el tope por cuenta en el limite no inserta otro PIN');
select is_empty($$ select * from public.issue_password_reset_pin('rosa', '123456', null) $$, 'una solicitud dentro de la espera no recibe fila');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000019' and used_at is null), 2::bigint, 'la espera no gasta los PIN anteriores');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000008' and used_at is null), 5::bigint, 'el tope por cuenta no gasta los PIN anteriores');
select is_empty($$ select * from public.issue_password_reset_pin('nora', '123456', repeat('b', 64)) $$, 'el tope por red bloquea aunque la cuenta no tenga solicitudes recientes');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000020' and used_at is null), 1::bigint, 'el tope por red no gasta el PIN anterior');
select is_empty($$ select * from public.issue_password_reset_pin('vera', '123456', null) $$, 'una cuenta bloqueada con un PIN vigente no recibe fila');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000022' and used_at is null), 1::bigint, 'una cuenta bloqueada conserva su PIN sin gastar ni sumar otro');
select is_empty($$ select * from public.issue_password_reset_pin('tina', '123456', null) $$, 'una cuenta a la que se le quito el correo no recibe fila');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000021' and used_at is null), 1::bigint, 'quitar el correo no gasta el PIN anterior');
select is_empty($$ select * from public.issue_password_reset_pin(null, '123456', null) $$, 'un usuario nulo no recibe fila');
select is((select requested_ip_hash from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000013' and used_at is null), null::text, 'sin hash de red el PIN se guarda sin hash');
select is((select lifetime_minutes from issued), password_reset_pin_lifetime_minutes()::integer, 'la vigencia devuelta es la de la regla');

select throws_ok($$ select * from public.issue_password_reset_pin('celso', '12345', null) $$, '22023', null, 'un PIN de cinco digitos se rechaza');
select throws_ok($$ select * from public.issue_password_reset_pin('celso', '1234567', null) $$, '22023', null, 'un PIN de siete digitos se rechaza');
select throws_ok($$ select * from public.issue_password_reset_pin('celso', '12a456', null) $$, '22023', null, 'un PIN con letras se rechaza');
select throws_ok(
  format($$ select * from public.issue_password_reset_pin('celso', %L, null) $$, '١٢٣٤٥٦'),
  '22023', null,
  'un PIN con digitos arabes se rechaza'
);
select throws_ok(
  format($$ select * from public.issue_password_reset_pin('celso', %L, null) $$, E'123456\n'),
  '22023', null,
  'un PIN con salto de linea final se rechaza'
);
select throws_ok($$ select * from public.issue_password_reset_pin('celso', null, null) $$, '22023', null, 'un PIN nulo se rechaza');
select throws_ok($$ select * from public.issue_password_reset_pin('celso', '', null) $$, '22023', null, 'un PIN vacio se rechaza');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 2::bigint, 'un PIN mal formado no inserta nada');

select is(password_reset_pin_length(), 6::smallint, 'el PIN tiene 6 digitos');
select is(password_reset_pin_hash_cost(), 10::smallint, 'el costo de bcrypt es 10');

select ok(not has_function_privilege('anon', 'issue_password_reset_pin(text, text, text)', 'execute'), 'anon no emite PIN');
select ok(not has_function_privilege('authenticated', 'issue_password_reset_pin(text, text, text)', 'execute'), 'authenticated no emite PIN');
select ok(has_function_privilege('service_role', 'issue_password_reset_pin(text, text, text)', 'execute'), 'service_role emite PIN');
select ok(not has_function_privilege('anon', 'password_reset_pin_length()', 'execute'), 'anon no ejecuta el largo del PIN');
select ok(not has_function_privilege('authenticated', 'password_reset_pin_length()', 'execute'), 'authenticated no ejecuta el largo del PIN');
select ok(not has_function_privilege('service_role', 'password_reset_pin_length()', 'execute'), 'service_role no ejecuta el largo del PIN');
select ok(not has_function_privilege('anon', 'password_reset_pin_hash_cost()', 'execute'), 'anon no ejecuta el costo del hash');
select ok(not has_function_privilege('authenticated', 'password_reset_pin_hash_cost()', 'execute'), 'authenticated no ejecuta el costo del hash');
select ok(not has_function_privilege('service_role', 'password_reset_pin_hash_cost()', 'execute'), 'service_role no ejecuta el costo del hash');

select is_definer('public', 'issue_password_reset_pin', array['text', 'text', 'text'], 'issue_password_reset_pin es security definer');
select is(
  (select count(*) from pg_proc, aclexplode(proacl) as privilege where proname in ('issue_password_reset_pin', 'password_reset_pin_length', 'password_reset_pin_hash_cost') and privilege.grantee = 0),
  0::bigint,
  'ninguna funcion nueva se concede a public'
);
select is(
  (select proconfig from pg_proc where proname = 'issue_password_reset_pin'),
  array['search_path=""'],
  'issue_password_reset_pin fija search_path vacio'
);

select * from finish();
rollback;
