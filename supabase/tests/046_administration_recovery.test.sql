begin;
select plan(32);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

insert into auth.sessions (id, user_id) values
  ('dddddddd-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111');

set local role service_role;
select lives_ok(
  $$ select public.record_failed_sign_in('admin') from generate_series(1, public.sign_in_attempt_limit() - 1) $$,
  'la administracion acumula intentos fallidos hasta un intento del limite'
);
reset role;

select is((select failed_attempts from workers where username = 'admin'), (public.sign_in_attempt_limit() - 1)::smallint, 'el contador queda a un intento del limite');
select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), false, 'a un intento del limite no se exige recuperacion');
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb) ? 'error',
  false,
  'a un intento del limite el gancho deja pasar el ingreso con clave'
);

set local role service_role;
select lives_ok($$ select public.record_failed_sign_in('admin') $$, 'el ultimo intento fallido se registra');
select lives_ok($$ select public.record_failed_sign_in('admin') $$, 'un intento fallido mas sobre el limite no falla');
reset role;

select is(
  (select row(status::text, blocked_reason::text, failed_attempts) from workers where username = 'admin'),
  row('active'::text, null::text, public.sign_in_attempt_limit()),
  'la administracion en el limite sigue activa, sin motivo de bloqueo y con el contador topado'
);
select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), true, 'en el limite se exige recuperacion');
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'en el limite el gancho rechaza el ingreso con clave pidiendo recuperacion'
);

select throws_ok(
  $$ update workers set personal_email = null where username = 'admin' $$,
  '23514', null,
  'la administracion no puede quedar sin correo personal'
);
select throws_ok(
  $$ update workers set personal_email = '' where username = 'admin' $$,
  '23514', null,
  'la administracion no puede dejar el correo personal vacio'
);
select is((select personal_email from workers where username = 'admin'), 'admin@correo.com', 'el correo personal de la administracion se conserva');

set local role service_role;
select is(
  (select personal_email from public.issue_password_reset_pin('admin', '482913', null)),
  'admin@correo.com',
  'el PIN de la administracion se emite para su correo personal'
);
reset role;

select is(
  (select count(*) from password_reset_pins where worker_id = '11111111-1111-1111-1111-111111111111' and expires_at - created_at = make_interval(mins => public.password_reset_pin_lifetime_minutes())),
  1::bigint,
  'el PIN de la administracion vive lo mismo que el de cualquier cuenta'
);
select is((select count(*) from password_reset_pins where worker_id = '11111111-1111-1111-1111-111111111111' and used_at is null), 1::bigint, 'la administracion queda con un PIN vivo');
select is((select status::text from workers where username = 'admin'), 'active', 'emitir el PIN no bloquea a la administracion');

set local role service_role;
select is(public.consume_password_reset_pin('admin', '482913'), '11111111-1111-1111-1111-111111111111'::uuid, 'el PIN correcto devuelve la cuenta de administracion');
reset role;

select is((select count(*) from password_reset_pins where worker_id = '11111111-1111-1111-1111-111111111111' and used_at is null), 0::bigint, 'consumir el PIN lo gasta');
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb)
    #>> '{error,message}',
  'account_recovery_required',
  'consumir el PIN no levanta el rechazo mientras no termine la recuperacion'
);
select is((select failed_attempts from workers where username = 'admin'), public.sign_in_attempt_limit(), 'consumir el PIN no cambia el contador');

update password_reset_pins
   set created_at = created_at - make_interval(secs => public.password_reset_request_cooldown_seconds() + 1)
 where worker_id = '11111111-1111-1111-1111-111111111111';

set local role service_role;
select is(
  (select personal_email from public.issue_password_reset_pin('admin', '739104', null)),
  'admin@correo.com',
  'pasado el enfriamiento la administracion recibe un segundo PIN en su correo personal'
);
reset role;

select is((select count(*) from password_reset_pins where worker_id = '11111111-1111-1111-1111-111111111111' and used_at is null), 1::bigint, 'el segundo PIN queda vivo antes de terminar la recuperacion');

set local role service_role;
select lives_ok($$ select public.finish_password_recovery('11111111-1111-1111-1111-111111111111') $$, 'la recuperacion de la administracion termina');
reset role;

select is((select failed_attempts from workers where username = 'admin'), 0::smallint, 'terminar la recuperacion devuelve el contador a cero');
select is((select count(*) from auth.sessions where user_id = '11111111-1111-1111-1111-111111111111'), 0::bigint, 'terminar la recuperacion borra las sesiones de la administracion');
select is((select count(*) from password_reset_pins where worker_id = '11111111-1111-1111-1111-111111111111' and used_at is null), 0::bigint, 'terminar la recuperacion gasta los PIN vivos');
select is(
  (select row(status::text, blocked_reason::text, must_change_password) from workers where username = 'admin'),
  row('active'::text, null::text, false),
  'tras recuperar la administracion sigue activa y sin cambio obligatorio pendiente'
);
select is(public.sign_in_requires_recovery('11111111-1111-1111-1111-111111111111'), false, 'tras recuperar ya no se exige recuperacion');
select is(
  public.custom_access_token_hook('{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{}}'::jsonb),
  '{"user_id":"11111111-1111-1111-1111-111111111111","authentication_method":"password","claims":{"must_change_password":false}}'::jsonb,
  'tras recuperar el gancho entrega el evento normal con clave'
);

set local role service_role;
select is(public.consume_password_reset_pin('admin', '482913'), null::uuid, 'el PIN ya consumido no sirve de nuevo');
reset role;

select is((select count(*) from workers where base_role = 'administracion' and status <> 'active'), 0::bigint, 'en ningun paso la administracion quedo bloqueada');
select is((select blocked_reason::text from workers where id = '11111111-1111-1111-1111-111111111111'), null::text, 'en ningun paso hubo motivo de bloqueo');

select * from finish();
rollback;
