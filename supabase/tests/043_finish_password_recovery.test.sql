begin;
select plan(60);

insert into auth.users (id, email)
select ('aaaaaaaa-0000-0000-0000-' || lpad(n::text, 12, '0'))::uuid, 'user' || n || '@arenal.local'
  from generate_series(1, 9) as n;

insert into workers (id, username, full_name, personal_email, base_role) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'ana', 'Ana', 'ana@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'bea', 'Bea', 'bea@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'blocka', 'Bloqueo intentos', 'blocka@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'blockb', 'Bloqueo administracion', 'blockb@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'retired', 'Retirado', 'retired@example.com', 'reservas');

update workers set failed_attempts = 3 where username in ('ana', 'bea');
update workers set status = 'blocked', blocked_reason = 'failed_attempts', failed_attempts = 10 where username = 'blocka';
update workers set status = 'blocked', blocked_reason = 'administration', failed_attempts = 4 where username = 'blockb';
update workers set deleted_at = now(), failed_attempts = 2 where username = 'retired';

insert into auth.sessions (id, user_id)
select ('dddddddd-0000-0000-0000-' || lpad(n::text, 12, '0'))::uuid,
       ('aaaaaaaa-0000-0000-0000-' || lpad((case when n = 6 then 1 else n end)::text, 12, '0'))::uuid
  from generate_series(1, 6) as n;

insert into auth.refresh_tokens (session_id, user_id, token)
select s.id, s.user_id::text, 'token-' || s.id
  from auth.sessions s;

insert into password_reset_pins (worker_id, pin_hash, expires_at)
select id, 'hash', now() + interval '10 minutes'
  from workers;

insert into password_reset_pins (worker_id, pin_hash, expires_at)
select id, 'hash', now() + interval '10 minutes'
  from workers where username = 'ana';

insert into password_reset_pins (worker_id, pin_hash, expires_at, used_at)
select id, 'hash', now() + interval '10 minutes', now() - interval '1 hour'
  from workers where username = 'ana';

insert into workers (id, username, full_name, personal_email, base_role) values
  ('aaaaaaaa-0000-0000-0000-000000000006', 'nosess', 'Sin sesiones', 'nosess@example.com', 'reservas'),
  ('aaaaaaaa-0000-0000-0000-000000000007', 'chain', 'Cadena', 'chain@example.com', 'reservas');

update workers set failed_attempts = 2 where username in ('nosess', 'chain');

insert into password_reset_pins (worker_id, pin_hash, expires_at)
select id, 'hash', now() + interval '10 minutes'
  from workers where username = 'nosess';

insert into auth.sessions (id, user_id) values
  ('dddddddd-0000-0000-0000-000000000007', 'aaaaaaaa-0000-0000-0000-000000000007');

insert into auth.refresh_tokens (session_id, user_id, token) values
  ('dddddddd-0000-0000-0000-000000000007', 'aaaaaaaa-0000-0000-0000-000000000007', 'token-chain');

insert into auth.sessions (id, user_id) values
  ('dddddddd-0000-0000-0000-000000000009', 'aaaaaaaa-0000-0000-0000-000000000009');

insert into auth.refresh_tokens (session_id, user_id, token) values
  ('dddddddd-0000-0000-0000-000000000009', 'aaaaaaaa-0000-0000-0000-000000000009', 'token-orphan');

select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 2::bigint, 'ana empieza con dos sesiones');
select is((select count(*) from auth.refresh_tokens where user_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 2::bigint, 'ana empieza con dos tokens de refresco');

update auth.sessions set created_at = now() where created_at is null;

set local role anon;
select throws_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000001') $$, '42501', null, 'anon no puede terminar la recuperacion');
reset role;

set local role authenticated;
select throws_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000001') $$, '42501', null, 'authenticated no puede terminar la recuperacion');
reset role;

select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 2::bigint, 'los intentos rechazados no tocan las sesiones');

set local role service_role;
select lives_ok($$ select public.finish_password_recovery(null) $$, 'un id nulo no falla');
reset role;

select is((select count(*) from auth.sessions where user_id::text like 'aaaaaaaa-%'), 8::bigint, 'un id nulo no borra ninguna sesion');
select is((select count(*) from auth.refresh_tokens where user_id::text like 'aaaaaaaa-%'), 8::bigint, 'un id nulo no borra ningun token de refresco');
select is((select count(*) from password_reset_pins where used_at is null and worker_id::text like 'aaaaaaaa-%'), 7::bigint, 'un id nulo no gasta ningun PIN');
select is((select count(*) from workers where id::text like 'aaaaaaaa-%' and (failed_attempts = 0 or not must_change_password)), 0::bigint, 'un id nulo no limpia el contador ni la marca de nadie');

set local role service_role;
select lives_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000001') $$, 'service_role termina la recuperacion de una cuenta activa');
reset role;

select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 0::bigint, 'la funcion borra las sesiones de auth desde security definer');
select is((select count(*) from auth.refresh_tokens where user_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 0::bigint, 'los tokens de refresco se van con sus sesiones');
select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000002'), 1::bigint, 'las sesiones de otra cuenta se conservan');
select is((select count(*) from auth.refresh_tokens where user_id = 'aaaaaaaa-0000-0000-0000-000000000002'), 1::bigint, 'los tokens de refresco de otra cuenta se conservan');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001' and used_at is null), 0::bigint, 'ningun PIN de ana queda vivo');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 3::bigint, 'los PIN de ana se gastan sin borrarse');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001' and used_at < now() - interval '30 minutes'), 1::bigint, 'el PIN ya gastado no se vuelve a marcar');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000002' and used_at is null), 1::bigint, 'el PIN de otra cuenta sigue vivo');
select is((select failed_attempts from workers where username = 'ana'), 0::smallint, 'el contador de ana vuelve a cero');
select is((select must_change_password from workers where username = 'ana'), false, 'la marca de cambio obligatorio de ana se limpia');
select is((select failed_attempts from workers where username = 'bea'), 3::smallint, 'el contador de otra cuenta no cambia');
select is((select must_change_password from workers where username = 'bea'), true, 'la marca de otra cuenta no cambia');

select lives_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000003') $$, 'terminar la recuperacion de una cuenta bloqueada por intentos no falla');
select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000003'), 0::bigint, 'la cuenta bloqueada por intentos pierde sus sesiones');
select is((select count(*) from auth.refresh_tokens where user_id = 'aaaaaaaa-0000-0000-0000-000000000003'), 0::bigint, 'la cuenta bloqueada por intentos pierde sus tokens de refresco');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000003' and used_at is null), 0::bigint, 'la cuenta bloqueada por intentos pierde sus PIN');
select is(
  (select row(status::text, blocked_reason::text, failed_attempts, must_change_password) from workers where username = 'blocka'),
  row('blocked'::text, 'failed_attempts'::text, 10::smallint, true),
  'la cuenta bloqueada por intentos conserva estado, motivo, contador y marca'
);

select lives_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000004') $$, 'terminar la recuperacion de una cuenta bloqueada por administracion no falla');
select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000004'), 0::bigint, 'la cuenta bloqueada por administracion pierde sus sesiones');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000004' and used_at is null), 0::bigint, 'la cuenta bloqueada por administracion pierde sus PIN');
select is(
  (select row(status::text, blocked_reason::text, failed_attempts, must_change_password) from workers where username = 'blockb'),
  row('blocked'::text, 'administration'::text, 4::smallint, true),
  'la cuenta bloqueada por administracion conserva estado, motivo, contador y marca'
);

select lives_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000005') $$, 'terminar la recuperacion de una cuenta retirada no falla');
select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000005'), 0::bigint, 'la cuenta retirada pierde sus sesiones');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000005' and used_at is null), 0::bigint, 'la cuenta retirada pierde sus PIN');
select is(
  (select row(failed_attempts, must_change_password, deleted_at is not null) from workers where username = 'retired'),
  row(2::smallint, true, true),
  'la cuenta retirada conserva contador, marca y retiro'
);

select lives_ok($$ select public.finish_password_recovery('ffffffff-0000-0000-0000-000000000000') $$, 'un id desconocido no falla');

select lives_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000006') $$, 'terminar la recuperacion de una cuenta sin sesiones no falla');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000006' and used_at is null), 0::bigint, 'la cuenta sin sesiones pierde sus PIN');
select is(
  (select row(failed_attempts, must_change_password) from workers where username = 'nosess'),
  row(0::smallint, false),
  'la cuenta pendiente sin sesiones limpia contador y marca sin que el guardian lo impida'
);

select lives_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000009') $$, 'terminar la recuperacion de un usuario de auth sin fila en workers no falla');
select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000009'), 0::bigint, 'el usuario de auth sin fila en workers pierde sus sesiones');
select is((select count(*) from auth.refresh_tokens where user_id = 'aaaaaaaa-0000-0000-0000-000000000009'), 0::bigint, 'el usuario de auth sin fila en workers pierde sus tokens de refresco');

select lives_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000001') $$, 'terminar dos veces la recuperacion no falla');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000001' and used_at < now() - interval '30 minutes'), 1::bigint, 'repetir la recuperacion no vuelve a marcar el PIN ya gastado');
select is(
  (select row(w.failed_attempts, w.must_change_password, (select count(*) from auth.sessions x where x.user_id = w.id)) from workers w where w.username = 'ana'),
  row(0::smallint, false, 0::bigint),
  'repetir la recuperacion deja el estado de ana igual'
);

reset role;
delete from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000007';
set local role service_role;
select lives_ok($$ select count(*) from public.issue_password_reset_pin('chain', '123456', null) $$, 'la cadena emite un PIN');
select is(public.consume_password_reset_pin('chain', '123456'), 'aaaaaaaa-0000-0000-0000-000000000007'::uuid, 'la cadena consume el PIN y devuelve la cuenta');
reset role;

insert into password_reset_pins (worker_id, pin_hash, expires_at)
select id, extensions.crypt('654321', extensions.gen_salt('bf', 4)), now() + interval '10 minutes'
  from workers where username = 'chain';

set local role service_role;
select lives_ok($$ select public.finish_password_recovery('aaaaaaaa-0000-0000-0000-000000000007') $$, 'la cadena termina la recuperacion');
select is(public.consume_password_reset_pin('chain', '123456'), null::uuid, 'el PIN consumido no sirve de nuevo tras la cadena');
select is(public.consume_password_reset_pin('chain', '654321'), null::uuid, 'el PIN vivo restante no sirve tras terminar la recuperacion');
reset role;

select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000007' and used_at is null), 0::bigint, 'la cadena deja cero PIN vivos');
select is((select count(*) from password_reset_pins where worker_id = 'aaaaaaaa-0000-0000-0000-000000000007'), 2::bigint, 'la cadena conserva los PIN gastados');
select is((select count(*) from auth.sessions where user_id = 'aaaaaaaa-0000-0000-0000-000000000007'), 0::bigint, 'la cadena deja cero sesiones');
select is((select count(*) from auth.refresh_tokens where user_id = 'aaaaaaaa-0000-0000-0000-000000000007'), 0::bigint, 'la cadena deja cero tokens de refresco');
select is(
  (select row(failed_attempts, must_change_password) from workers where username = 'chain'),
  row(0::smallint, false),
  'la cadena limpia contador y marca'
);

select is((select count(*) from auth.sessions where user_id::text like 'aaaaaaaa-%'), 1::bigint, 'solo sobrevive la sesion de bea');
select is((select count(*) from password_reset_pins where used_at is null and worker_id::text like 'aaaaaaaa-%'), 1::bigint, 'solo sobrevive el PIN vivo de bea');

select is_definer('public', 'finish_password_recovery', array['uuid'], 'la funcion es security definer');
select is(
  (select proconfig from pg_proc where pronamespace = 'public'::regnamespace and proname = 'finish_password_recovery'),
  array['search_path=""'],
  'la funcion fija un search_path vacio'
);

select * from finish();
rollback;
