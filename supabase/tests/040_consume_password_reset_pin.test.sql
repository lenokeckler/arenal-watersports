begin;
select plan(75);

insert into auth.users (id, email)
select ('aaaaaaaa-0000-0000-0000-' || lpad(n::text, 12, '0'))::uuid, 'user' || n || '@arenal.local'
  from generate_series(1, 30) as n;

insert into workers (id, username, full_name, personal_email, base_role) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'celso', 'Celso', 'celso@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'blocka', 'Bloqueo intentos', 'blocka@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'blockb', 'Bloqueo administracion', 'blockb@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'retired', 'Retirado', 'retired@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'dora', 'Dora', 'dora@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000008', 'fede', 'Fede', 'fede@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000009', 'gina', 'Gina', 'gina@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000010', 'hugo', 'Hugo', 'hugo@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000011', 'ines', 'Ines', 'ines@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000012', 'jorge', 'Jorge', 'jorge@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000013', 'kira', 'Kira', 'kira@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000014', 'luis', 'Luis', 'luis@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000015', 'mara', 'Mara', 'mara@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000016', 'nina', 'Nina', 'nina@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000017', 'elena', 'Elena', 'elena@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000018', 'olga', 'Olga', 'olga@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000019', 'pablo', 'Pablo', null, 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000021', 'rosa', 'Rosa', 'rosa@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000023', 'tina', 'Tina', 'tina@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000024', 'quique', 'Quique', 'quique@example.com', 'reservas');
insert into workers (id, username, full_name, personal_email, base_role, is_external_guide, national_id, expires_at) values
  ('aaaaaaaa-0000-0000-0000-000000000006', 'expired', 'Guia vencido', 'expired@example.com', 'operaciones', true, '1-1111-1111', now() - interval '1 day'),
  ('aaaaaaaa-0000-0000-0000-000000000007', 'guide', 'Guia vigente', 'guide@example.com', 'operaciones', true, '2-2222-2222', now() + interval '1 day'),
  ('aaaaaaaa-0000-0000-0000-000000000022', 'saul', 'Guia en el limite', 'saul@example.com', 'operaciones', true, '3-3333-3333', now());

insert into password_reset_pins (worker_id, pin_hash, expires_at)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now() + interval '10 minutes'
  from workers
 where username in ('celso', 'blocka', 'blockb', 'retired', 'dora', 'expired', 'guide', 'fede', 'gina', 'kira', 'luis', 'elena', 'olga', 'pablo', 'saul', 'tina');

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now(), now() - interval '10 minutes'
  from workers where username = 'rosa';

update workers set status = 'blocked', blocked_reason = 'failed_attempts' where username = 'blocka';
update workers set status = 'blocked', blocked_reason = 'administration' where username = 'blockb';
update workers set deleted_at = now() where username = 'retired';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now() - interval '1 minute', now() - interval '11 minutes'
  from workers where username = 'ines';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at, used_at)
select id, extensions.crypt('222222', extensions.gen_salt('bf', 4)), now() + interval '5 minutes', now() - interval '5 minutes', now() - interval '4 minutes'
  from workers where username = 'hugo';
insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now() + interval '10 minutes', now()
  from workers where username = 'hugo';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, extensions.crypt('333333', extensions.gen_salt('bf', 4)), now() + interval '5 minutes', now() - interval '5 minutes'
  from workers where username = 'jorge';
insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now() + interval '10 minutes', now()
  from workers where username = 'jorge';

update password_reset_pins set attempts = 5
 where worker_id = 'aaaaaaaa-0000-0000-0000-000000000018';

insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at)
select id, extensions.crypt('333333', extensions.gen_salt('bf', 4)), now() + interval '5 minutes', now() - interval '5 minutes'
  from workers where username = 'quique';
insert into password_reset_pins (worker_id, pin_hash, expires_at, created_at, attempts)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now() + interval '10 minutes', now(), 5
  from workers where username = 'quique';

select is(public.consume_password_reset_pin('celso', '482913'), 'aaaaaaaa-0000-0000-0000-000000000001'::uuid, 'el PIN correcto devuelve el id de la cuenta');
select isnt((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), null::timestamptz, 'el PIN correcto queda gastado');
select is(public.consume_password_reset_pin('celso', '482913'), null::uuid, 'el mismo PIN no sirve dos veces');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 0::smallint, 'reusar un PIN gastado no suma intentos');

select is(public.consume_password_reset_pin('  KIRA ', '482913'), 'aaaaaaaa-0000-0000-0000-000000000013'::uuid, 'el usuario se normaliza');
select is(public.consume_password_reset_pin('guide', '482913'), 'aaaaaaaa-0000-0000-0000-000000000007'::uuid, 'un guia externo vigente puede usar su PIN');

select is(public.consume_password_reset_pin('dora', '111111'), null::uuid, 'un PIN incorrecto devuelve nulo');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000005'), 1::smallint, 'un PIN incorrecto suma un intento');
select is((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000005'), null::timestamptz, 'tras un intento fallido el PIN sigue vigente');
select is((select failed_attempts from workers where username = 'dora'), 0::smallint, 'un PIN incorrecto no toca los intentos de la contrasena');
select is(public.consume_password_reset_pin('dora', '482913'), 'aaaaaaaa-0000-0000-0000-000000000005'::uuid, 'el PIN correcto tras un fallo funciona');

do $$
begin
  for attempt in 1..4 loop
    perform public.consume_password_reset_pin('fede', '111111');
  end loop;
end $$;
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000008'), 4::smallint, 'cuatro fallos suman cuatro intentos');
select is((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000008'), null::timestamptz, 'cuatro fallos no gastan el PIN');
select is(public.consume_password_reset_pin('fede', '482913'), 'aaaaaaaa-0000-0000-0000-000000000008'::uuid, 'el quinto intento correcto funciona');

do $$
begin
  for attempt in 1..5 loop
    perform public.consume_password_reset_pin('gina', '111111');
  end loop;
end $$;
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000009'), 5::smallint, 'cinco fallos suman cinco intentos');
select isnt((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000009'), null::timestamptz, 'cinco fallos gastan el PIN');
select is(public.consume_password_reset_pin('gina', '482913'), null::uuid, 'el sexto intento falla aunque los digitos sean correctos');
select is(public.consume_password_reset_pin('gina', '111111'), null::uuid, 'un intento tras agotar el PIN devuelve nulo');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000009'), 5::smallint, 'los intentos nunca superan el limite');
select is((select failed_attempts from workers where username = 'gina'), 0::smallint, 'agotar el PIN no toca los intentos de la contrasena');

select is(public.consume_password_reset_pin('olga', '482913'), null::uuid, 'un PIN con los intentos agotados pero sin gastar no sirve');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000018'), 5::smallint, 'un PIN con los intentos agotados no cambia sus intentos');
select is((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000018'), null::timestamptz, 'un PIN con los intentos agotados no se toca');

select is(public.consume_password_reset_pin('quique', '333333'), null::uuid, 'un PIN anterior no se activa cuando el mas nuevo tiene los intentos agotados');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000024' and created_at < now() - interval '1 minute'), 0::smallint, 'el PIN anterior no suma intentos');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000024' and used_at is null), 2::bigint, 'ningun PIN se gasta ni se toca');

select is(public.consume_password_reset_pin('ines', '482913'), null::uuid, 'un PIN vencido no sirve');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000011'), 0::smallint, 'un PIN vencido no suma intentos');
select is(public.consume_password_reset_pin('ines', '111111'), null::uuid, 'un PIN incorrecto sobre uno vencido devuelve nulo');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000011'), 0::smallint, 'un PIN incorrecto sobre uno vencido no suma intentos');

select is(public.consume_password_reset_pin('hugo', '222222'), null::uuid, 'un PIN anterior gastado no coincide si hay uno nuevo');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000010' and used_at is null), 1::smallint, 'el fallo se cuenta en el PIN vigente');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000010' and used_at is not null), 0::smallint, 'el PIN gastado anterior no cambia');
select is(public.consume_password_reset_pin('hugo', '482913'), 'aaaaaaaa-0000-0000-0000-000000000010'::uuid, 'se usa el PIN vigente mas nuevo');

select is(public.consume_password_reset_pin('jorge', '333333'), null::uuid, 'un PIN vigente mas viejo no coincide si hay uno mas nuevo');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000012' and created_at < now() - interval '1 minute'), 0::smallint, 'el PIN vigente mas viejo no suma intentos');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000012' and created_at >= now() - interval '1 minute'), 1::smallint, 'el fallo se cuenta en el PIN vigente mas nuevo');
select is(public.consume_password_reset_pin('jorge', '482913'), 'aaaaaaaa-0000-0000-0000-000000000012'::uuid, 'el PIN vigente mas nuevo se consume');
select is((select used_at from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000012' and created_at < now() - interval '1 minute'), null::timestamptz, 'el PIN vigente mas viejo queda sin tocar');

select is(public.consume_password_reset_pin('blocka', '482913'), null::uuid, 'una cuenta bloqueada por intentos no consume su PIN');
select is(public.consume_password_reset_pin('blockb', '482913'), null::uuid, 'una cuenta bloqueada por administracion no consume su PIN');
select is(public.consume_password_reset_pin('retired', '482913'), null::uuid, 'una cuenta retirada no consume su PIN');
select is(public.consume_password_reset_pin('expired', '482913'), null::uuid, 'un guia externo vencido no consume su PIN');
select is(public.consume_password_reset_pin('blocka', '111111'), null::uuid, 'un PIN incorrecto en una cuenta bloqueada devuelve nulo');
select is(
  (select count(*) from password_reset_pins where worker_id in (
    'aaaaaaaa-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000003',
    'aaaaaaaa-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000006')
    and used_at is null and attempts = 0),
  4::bigint,
  'las cuentas no elegibles conservan su PIN sin tocar'
);

select is(public.consume_password_reset_pin('nobody', '482913'), null::uuid, 'un usuario desconocido devuelve nulo');
select is(public.consume_password_reset_pin(null, '482913'), null::uuid, 'un usuario nulo devuelve nulo');

select is(public.consume_password_reset_pin('pablo', '482913'), 'aaaaaaaa-0000-0000-0000-000000000019'::uuid, 'el correo personal no se exige al consumir');

select is(public.consume_password_reset_pin('luis', '12345'), null::uuid, 'un PIN de cinco digitos devuelve nulo');
select is(public.consume_password_reset_pin('luis', 'abcdef'), null::uuid, 'un PIN con letras devuelve nulo');
select is(public.consume_password_reset_pin('luis', null), null::uuid, 'un PIN nulo devuelve nulo');
select is(public.consume_password_reset_pin('luis', ''), null::uuid, 'un PIN vacio devuelve nulo');
select is(public.consume_password_reset_pin('luis', E'482913\n'), null::uuid, 'un PIN con salto de linea final devuelve nulo');
select is(public.consume_password_reset_pin('luis', '4829130'), null::uuid, 'un PIN de siete digitos devuelve nulo');
select is(
  (select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000014' and used_at is null and attempts = 0),
  1::bigint,
  'un PIN mal formado no cambia ninguna fila'
);

select is(public.consume_password_reset_pin('mara', '482913'), null::uuid, 'una cuenta sin PIN devuelve nulo');
select is(public.consume_password_reset_pin('mara', '555555'), null::uuid, 'el PIN de otra cuenta no sirve con este usuario');
select is(
  (select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000017' and used_at is null and attempts = 0),
  1::bigint,
  'el PIN de otra cuenta queda sin tocar'
);
select is(public.consume_password_reset_pin('elena', '482913'), 'aaaaaaaa-0000-0000-0000-000000000017'::uuid, 'cada cuenta consume solo su propio PIN');

select isnt_empty($$ select * from public.issue_password_reset_pin('nina', '654321', null) $$, 'nina recibe un PIN emitido');
select is(public.consume_password_reset_pin('nina', '654321'), 'aaaaaaaa-0000-0000-0000-000000000016'::uuid, 'un PIN emitido por la funcion de emision se consume');

select is(public.consume_password_reset_pin('rosa', '482913'), null::uuid, 'un PIN que vence en este instante no sirve');
select is(public.consume_password_reset_pin('rosa', '111111'), null::uuid, 'un PIN incorrecto sobre uno que vence en este instante devuelve nulo');
select is((select attempts from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000021'), 0::smallint, 'un PIN que vence en este instante no suma intentos');
select is(public.consume_password_reset_pin('saul', '482913'), null::uuid, 'un guia externo que vence en este instante no consume su PIN');

update workers set status = 'blocked', blocked_reason = 'administration' where username = 'tina';
select is(public.consume_password_reset_pin('tina', '482913'), null::uuid, 'una cuenta bloqueada no consume su PIN aunque siga vigente');
update workers set status = 'active', blocked_reason = null where username = 'tina';
select is(public.consume_password_reset_pin('tina', '482913'), 'aaaaaaaa-0000-0000-0000-000000000023'::uuid, 'una cuenta desbloqueada consume el PIN que sigue vigente');

select is(public.consume_password_reset_pin('', '482913'), null::uuid, 'un usuario vacio devuelve nulo');
select is(public.consume_password_reset_pin('   ', '482913'), null::uuid, 'un usuario de solo espacios devuelve nulo');

select ok(not has_function_privilege('anon', 'consume_password_reset_pin(text, text)', 'execute'), 'anon no consume PIN');
select ok(not has_function_privilege('authenticated', 'consume_password_reset_pin(text, text)', 'execute'), 'authenticated no consume PIN');
select ok(has_function_privilege('service_role', 'consume_password_reset_pin(text, text)', 'execute'), 'service_role consume PIN');
select is_definer('public', 'consume_password_reset_pin', array['text', 'text'], 'consume_password_reset_pin es security definer');
select is(
  (select count(*) from pg_proc, aclexplode(proacl) as privilege where proname = 'consume_password_reset_pin' and privilege.grantee = 0),
  0::bigint,
  'consume_password_reset_pin no se concede a public'
);
select is(
  (select proconfig from pg_proc where proname = 'consume_password_reset_pin'),
  array['search_path=""'],
  'consume_password_reset_pin fija search_path vacio'
);

select * from finish();
rollback;
