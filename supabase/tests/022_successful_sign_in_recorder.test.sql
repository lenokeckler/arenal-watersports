begin;
select plan(3);

insert into auth.users (id, email) values
  ('33333333-3333-3333-3333-333333333333', 'rosa@arenal.local'),
  ('44444444-4444-4444-4444-444444444444', 'bloqueado@arenal.local'),
  ('55555555-5555-5555-5555-555555555555', 'retirada@arenal.local');

insert into workers (id, username, full_name, base_role) values
  ('33333333-3333-3333-3333-333333333333', 'rosa', 'Rosa', 'operaciones');
insert into workers (id, username, full_name, base_role, status, blocked_reason) values
  ('44444444-4444-4444-4444-444444444444', 'bloqueado', 'Bloqueado', 'operaciones',
   'blocked', 'administration');
insert into workers (id, username, full_name, base_role, deleted_at) values
  ('55555555-5555-5555-5555-555555555555', 'retirada', 'Retirada', 'operaciones', now());

update workers set failed_attempts = 5 where username = 'rosa';
select record_successful_sign_in('33333333-3333-3333-3333-333333333333');
select is(
  (select failed_attempts::integer from workers where username = 'rosa'),
  0,
  'un ingreso exitoso reinicia el contador'
);

update workers set failed_attempts = 3 where username = 'bloqueado';
select record_successful_sign_in('44444444-4444-4444-4444-444444444444');
select is(
  (select status::text || ':' || failed_attempts::text from workers where username = 'bloqueado'),
  'blocked:3',
  'un ingreso exitoso no toca una cuenta bloqueada'
);

update workers set failed_attempts = 4 where username = 'retirada';
select record_successful_sign_in('55555555-5555-5555-5555-555555555555');
select is(
  (select failed_attempts::integer from workers where username = 'retirada'),
  4,
  'un ingreso exitoso no reinicia el contador de un trabajador retirado'
);

select * from finish();
rollback;
