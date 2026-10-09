begin;
select plan(24);

insert into auth.users (id, email) values
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into workers (id, username, full_name, base_role) values
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas');

select lives_ok(
  $$ update workers set personal_email = 'celso.r@correo.com' where username = 'celso' $$,
  'una direccion valida se acepta'
);
select lives_ok(
  $$ update workers set personal_email = null where username = 'celso' $$,
  'un trabajador que no es administracion puede no tener direccion'
);
select throws_ok(
  $$ update workers set personal_email = '' where username = 'celso' $$,
  '23514', null,
  'la cadena vacia se rechaza para un trabajador comun'
);
select throws_ok(
  $$ update workers set personal_email = 'Celso@correo.com' where username = 'celso' $$,
  '23514', null,
  'las mayusculas se rechazan'
);
select throws_ok(
  $$ update workers set personal_email = ' celso@correo.com' where username = 'celso' $$,
  '23514', null,
  'un espacio al inicio se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = 'celso@correo.com ' where username = 'celso' $$,
  '23514', null,
  'un espacio al final se rechaza'
);
select lives_ok(
  $$ update workers set personal_email = repeat('a', 64) || '@' || repeat('b', 63) || '.' || repeat('b', 63) || '.' || repeat('b', 61) where username = 'celso' $$,
  'una direccion de 254 caracteres se acepta'
);
select throws_ok(
  $$ update workers set personal_email = repeat('a', 64) || '@' || repeat('b', 63) || '.' || repeat('b', 63) || '.' || repeat('b', 62) where username = 'celso' $$,
  '23514', null,
  'una direccion de 255 caracteres se rechaza'
);
select lives_ok(
  $$ update workers set personal_email = repeat('a', 64) || '@correo.com' where username = 'celso' $$,
  'una parte local de 64 caracteres se acepta'
);
select throws_ok(
  $$ update workers set personal_email = repeat('a', 65) || '@correo.com' where username = 'celso' $$,
  '23514', null,
  'una parte local de 65 caracteres se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = chr(8490) || 'elvin@correo.com' where username = 'celso' $$,
  '23514', null,
  'el signo Kelvin se rechaza porque el patron es solo ASCII'
);
select throws_ok(
  $$ update workers set personal_email = 'celso.correo.com' where username = 'celso' $$,
  '23514', null,
  'sin arroba se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = 'celso@@correo.com' where username = 'celso' $$,
  '23514', null,
  'dos arrobas se rechazan'
);
select lives_ok(
  $$ update workers set personal_email = 'celso@correo' where username = 'celso' $$,
  'un dominio sin punto se acepta como en el patron del navegador'
);
select throws_ok(
  $$ update workers set personal_email = 'celso@-correo.com' where username = 'celso' $$,
  '23514', null,
  'una etiqueta que empieza con guion se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = 'celso@correo-.com' where username = 'celso' $$,
  '23514', null,
  'una etiqueta que termina con guion se rechaza'
);
select lives_ok(
  $$ update workers set personal_email = 'celso@' || repeat('b', 63) || '.com' where username = 'celso' $$,
  'una etiqueta de 63 caracteres se acepta'
);
select throws_ok(
  $$ update workers set personal_email = 'celso@' || repeat('b', 64) || '.com' where username = 'celso' $$,
  '23514', null,
  'una etiqueta de 64 caracteres se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = 'celso@correo..com' where username = 'celso' $$,
  '23514', null,
  'puntos seguidos en el dominio se rechazan'
);
select throws_ok(
  $$ update workers set personal_email = 'cel so@correo.com' where username = 'celso' $$,
  '23514', null,
  'un espacio dentro se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = 'cel,so@correo.com' where username = 'celso' $$,
  '23514', null,
  'una coma se rechaza'
);
select throws_ok(
  $$ update workers set personal_email = 'celso@mi_correo.com' where username = 'celso' $$,
  '23514', null,
  'un guion bajo en el dominio se rechaza'
);
select lives_ok(
  $$ update workers set personal_email = 'celso+reservas@correo.com' where username = 'celso' $$,
  'el signo mas en la parte local se acepta'
);
select lives_ok(
  $$ update workers set personal_email = 'o''brien@correo.com' where username = 'celso' $$,
  'el apostrofe en la parte local se acepta'
);

select * from finish();
rollback;
