begin;
select plan(30);

insert into auth.users (id, email)
select ('bbbbbbbb-0000-0000-0000-' || lpad(n::text, 12, '0'))::uuid, 'grant' || n || '@arenal.local'
  from generate_series(1, 6) as n;

insert into workers (id, username, full_name, personal_email, base_role) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'ana', 'Ana', 'ana@example.com', 'reservas'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'beto', 'Beto', 'beto@example.com', 'reservas'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'caro', 'Caro', 'caro@example.com', 'reservas'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'dani', 'Dani', 'dani@example.com', 'reservas'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'eva', 'Eva', 'eva@example.com', 'reservas'),
  ('bbbbbbbb-0000-0000-0000-000000000006', 'fito', 'Fito', 'fito@example.com', 'reservas');

insert into password_reset_pins (worker_id, pin_hash, expires_at)
select id, extensions.crypt('482913', extensions.gen_salt('bf', 4)), now() + interval '10 minutes'
  from workers where username in ('ana', 'beto', 'caro', 'dani', 'eva', 'fito');

select ok(
  not has_function_privilege('anon', 'public.exchange_password_reset_pin(text, text)', 'execute')
  and not has_function_privilege('authenticated', 'public.exchange_password_reset_pin(text, text)', 'execute'),
  'ni anon ni authenticated cambian un PIN por un pase'
);
select ok(
  has_function_privilege('service_role', 'public.exchange_password_reset_pin(text, text)', 'execute'),
  'solo el servidor cambia un PIN por un pase'
);
select ok(
  not has_function_privilege('anon', 'public.redeem_password_reset_grant(text)', 'execute')
  and not has_function_privilege('authenticated', 'public.redeem_password_reset_grant(text)', 'execute')
  and has_function_privilege('service_role', 'public.redeem_password_reset_grant(text)', 'execute'),
  'solo el servidor usa un pase'
);
select ok(
  not has_function_privilege('anon', 'public.password_reset_grant_is_open(text)', 'execute')
  and not has_function_privilege('authenticated', 'public.password_reset_grant_is_open(text)', 'execute')
  and has_function_privilege('service_role', 'public.password_reset_grant_is_open(text)', 'execute'),
  'solo el servidor consulta si un pase sigue abierto'
);
select ok(
  not has_table_privilege('authenticated', 'public.password_reset_grants', 'select')
  and not has_table_privilege('anon', 'public.password_reset_grants', 'select'),
  'nadie desde la API lee los pases'
);
select is(
  (select p.proconfig from pg_proc p where p.oid = 'public.exchange_password_reset_pin(text, text)'::regprocedure),
  array['search_path=""'],
  'exchange_password_reset_pin fija el search_path vacio'
);

create temp table issued as
select public.exchange_password_reset_pin('ana', '482913') as token;

select ok(
  (select token ~ '^[0-9a-f]{64}$' from issued),
  'un PIN correcto se cambia por un pase de 64 caracteres hexadecimales'
);
select isnt(
  (select used_at from password_reset_pins where worker_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  null,
  'el PIN queda gastado al entregar el pase'
);
select is(
  (select count(*)::int from password_reset_grants g, issued where g.token_hash = issued.token),
  0,
  'el pase nunca se guarda tal cual'
);
select is(
  (select count(*)::int from password_reset_grants where worker_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  1,
  'se guarda solo la huella del pase'
);
select ok(
  (select expires_at between now() + interval '9 minutes' and now() + interval '10 minutes'
     from password_reset_grants where worker_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'el pase vence a los diez minutos'
);
select is(
  public.exchange_password_reset_pin('ana', '482913'),
  null,
  'un PIN ya gastado no entrega otro pase'
);
select is(
  public.exchange_password_reset_pin('beto', '000000'),
  null,
  'un PIN equivocado no entrega pase'
);
select is(
  (select attempts from password_reset_pins where worker_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  1::smallint,
  'un PIN equivocado cuenta un intento'
);
select is(
  public.exchange_password_reset_pin('nadie', '482913'),
  null,
  'un usuario que no existe no recibe pase'
);

select ok(
  public.password_reset_grant_is_open((select token from issued)),
  'un pase recien entregado esta abierto'
);
select ok(
  not public.password_reset_grant_is_open(repeat('a', 64)),
  'un pase inventado no esta abierto'
);
select ok(
  not public.password_reset_grant_is_open('no-es-un-pase'),
  'un pase malformado no esta abierto sin fallar'
);
select ok(
  not public.password_reset_grant_is_open(null),
  'sin pase no hay nada abierto'
);

select is(
  public.redeem_password_reset_grant((select token from issued)),
  'bbbbbbbb-0000-0000-0000-000000000001'::uuid,
  'usar el pase devuelve a quien pertenece'
);
select is(
  public.redeem_password_reset_grant((select token from issued)),
  null,
  'un pase sirve una sola vez'
);
select ok(
  not public.password_reset_grant_is_open((select token from issued)),
  'un pase usado ya no esta abierto'
);

create temp table caro_grant as
select public.exchange_password_reset_pin('caro', '482913') as token;
update password_reset_grants set expires_at = now() - interval '1 second'
 where worker_id = 'bbbbbbbb-0000-0000-0000-000000000003';
select is(
  public.redeem_password_reset_grant((select token from caro_grant)),
  null,
  'un pase vencido no sirve'
);

create temp table dani_grant as
select public.exchange_password_reset_pin('dani', '482913') as token;
update workers set status = 'blocked', blocked_reason = 'administration'
 where username = 'dani';
select ok(
  not public.password_reset_grant_is_open((select token from dani_grant)),
  'el pase de una cuenta bloqueada no esta abierto'
);
select is(
  public.redeem_password_reset_grant((select token from dani_grant)),
  null,
  'el pase de una cuenta bloqueada no sirve'
);

create temp table eva_first as
select public.exchange_password_reset_pin('eva', '482913') as token;
insert into password_reset_pins (worker_id, pin_hash, expires_at)
select id, extensions.crypt('551177', extensions.gen_salt('bf', 4)), now() + interval '10 minutes'
  from workers where username = 'eva';
create temp table eva_second as
select public.exchange_password_reset_pin('eva', '551177') as token;
select ok(
  not public.password_reset_grant_is_open((select token from eva_first)),
  'un pase nuevo cierra el anterior de la misma cuenta'
);
select ok(
  public.password_reset_grant_is_open((select token from eva_second)),
  'el pase nuevo queda abierto'
);

create temp table fito_grant as
select public.exchange_password_reset_pin('fito', '482913') as token;
select public.finish_password_recovery('bbbbbbbb-0000-0000-0000-000000000006');
select ok(
  not public.password_reset_grant_is_open((select token from fito_grant)),
  'terminar la recuperacion cierra los pases abiertos de la cuenta'
);

update password_reset_grants set created_at = now() - interval '25 hours'
 where worker_id = 'bbbbbbbb-0000-0000-0000-000000000005';
select public.purge_password_reset_records();
select is(
  (select count(*)::int from password_reset_grants where worker_id = 'bbbbbbbb-0000-0000-0000-000000000005'),
  0,
  'la limpieza diaria borra los pases viejos'
);

select throws_ok(
  $$ insert into password_reset_grants (worker_id, token_hash, expires_at)
     values ('bbbbbbbb-0000-0000-0000-000000000002', 'texto-plano', now()) $$,
  '23514',
  null,
  'la tabla solo acepta huellas sha256'
);

select * from finish();
rollback;
