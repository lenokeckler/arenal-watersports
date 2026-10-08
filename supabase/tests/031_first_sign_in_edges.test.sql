begin;
select plan(5);

insert into auth.users (id, email) values
  ('22222222-2222-2222-2222-222222222222', 'ismael@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'intentos@arenal.local'),
  ('88888888-8888-8888-8888-888888888888', 'rosa@arenal.local'),
  ('99999999-9999-9999-9999-999999999999', 'reservas@arenal.local');

insert into workers (id, username, full_name, base_role, must_change_password) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones', true),
  ('88888888-8888-8888-8888-888888888888', 'rosa', 'Rosa', 'operaciones', true);
insert into workers (id, username, full_name, base_role, status, blocked_reason) values
  ('33333333-3333-3333-3333-333333333333', 'intentos', 'Intentos', 'operaciones',
   'blocked', 'failed_attempts');
insert into workers (id, username, full_name, base_role) values
  ('99999999-9999-9999-9999-999999999999', 'reservas', 'Reservas', 'reservas');
insert into worker_marks (worker_id, mark, granted_by)
values ('99999999-9999-9999-9999-999999999999', 'registro_guias_externos',
        '99999999-9999-9999-9999-999999999999');

select is(
  public.custom_access_token_hook('{"user_id":"22222222-2222-2222-2222-222222222222"}'::jsonb),
  '{"user_id":"22222222-2222-2222-2222-222222222222"}'::jsonb,
  'un evento sin reclamos vuelve sin cambios'
);

select ok(
  not (public.custom_access_token_hook(
    '{"user_id":"33333333-3333-3333-3333-333333333333","claims":{"role":"authenticated"}}'::jsonb
  ) ? 'claims'),
  'una cuenta rechazada no devuelve reclamos'
);

select complete_first_password_change('22222222-2222-2222-2222-222222222222');
select complete_first_password_change('22222222-2222-2222-2222-222222222222');
select is(
  (select must_change_password from workers where username = 'ismael'),
  false,
  'completar el primer cambio dos veces deja la marca en falso'
);
select is(
  (select must_change_password from workers where username = 'rosa'),
  true,
  'completar el primer cambio no toca a otros trabajadores'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"99999999-9999-9999-9999-999999999999","role":"authenticated"}';
select throws_ok(
  $$ insert into workers (id, username, full_name, base_role, is_external_guide, expires_at, must_change_password)
     values ('55555555-5555-5555-5555-555555555555', 'guia1', 'Guia Uno', 'operaciones', true,
             now() + interval '30 days', false) $$,
  '42501', null,
  'reservas no registra un guia externo con la marca de cambio ya limpia'
);

select * from finish();
rollback;
