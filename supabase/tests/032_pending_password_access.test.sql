begin;
select plan(13);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local'),
  ('77777777-7777-7777-7777-777777777777', 'retirado@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas'),
  ('77777777-7777-7777-7777-777777777777', 'retirado', 'Retirado', 'reservas');

insert into worker_marks (worker_id, mark, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'registro_guias_externos',
   '11111111-1111-1111-1111-111111111111'),
  ('77777777-7777-7777-7777-777777777777', 'registro_guias_externos',
   '11111111-1111-1111-1111-111111111111');

update workers set deleted_at = now()
 where id = '77777777-7777-7777-7777-777777777777';

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, created_by, updated_by)
values ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
        '2026-09-05 10:00:00+00', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","must_change_password":true}';
select ok(not has_area('reservas'), 'una cuenta pendiente no tiene su area');
select ok(not has_mark('registro_guias_externos'), 'una cuenta pendiente no tiene su marca');
select is(
  (select count(*) from reservations), 0::bigint,
  'una cuenta pendiente no lee reservas por la API'
);
select is(
  (select count(*) from workers where id = '33333333-3333-3333-3333-333333333333'), 1::bigint,
  'una cuenta pendiente sigue leyendo su propia fila de trabajador'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","must_change_password":true}';
select ok(not is_admin(), 'una administracion pendiente no es administracion');
select is(
  (select count(*) from workers), 1::bigint,
  'una administracion pendiente solo lee su propia fila'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","must_change_password":false}';
select ok(has_area('reservas'), 'con la marca en falso conserva el area');
select ok(has_mark('registro_guias_externos'), 'con la marca en falso conserva la marca');
select is(
  (select count(*) from reservations), 1::bigint,
  'con la marca en falso lee reservas'
);

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select ok(has_area('reservas'), 'sin el reclamo conserva el area');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select ok(is_admin(), 'sin el reclamo administracion conserva su rol');

set local request.jwt.claims to '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}';
select ok(not has_area('reservas'), 'un trabajador retirado no tiene area');
select ok(not has_mark('registro_guias_externos'), 'un trabajador retirado no tiene marca');

select * from finish();
rollback;
