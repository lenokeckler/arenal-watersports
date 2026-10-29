begin;
select plan(3);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas');

select throws_ok(
  $$ update workers set personal_email = 'celso@correo.com' || chr(10) where username = 'celso' $$,
  '23514', null,
  'un salto de linea al final se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = chr(9) || 'celso@correo.com' where username = 'celso' $$,
  '23514', null,
  'una tabulacion al inicio se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = 'Admin@correo.com' where username = 'admin' $$,
  '23514', null,
  'administracion no guarda una direccion invalida no vacia'
);

select * from finish();
rollback;
