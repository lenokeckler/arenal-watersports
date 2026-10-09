begin;
select plan(8);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'operaciones');

insert into worker_areas (worker_id, area, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'reservas',
   '11111111-1111-1111-1111-111111111111');

insert into worker_marks (worker_id, mark, granted_by) values
  ('33333333-3333-3333-3333-333333333333', 'guia',
   '11111111-1111-1111-1111-111111111111');

insert into auth.sessions (id, user_id, not_after) values
  ('bbbbbbbb-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', null),
  ('bbbbbbbb-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', now()),
  ('bbbbbbbb-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', null);

set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"bbbbbbbb-0000-0000-0000-000000000001"}';
select ok(has_mark('guia'), 'una sesion viva conserva la marca de guia');
select ok(has_area('reservas'), 'una sesion viva conserva el area extra');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"bbbbbbbb-0000-0000-0000-000000000002"}';
select ok(not has_mark('guia'), 'una sesion que vence en este instante pierde la marca de guia');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"bbbbbbbb-0000-0000-0000-000000000009"}';
select ok(not has_mark('guia'), 'una sesion inexistente pierde la marca de guia');

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"not-a-uuid"}';
select throws_ok(
  'select has_area(''reservas'')', '22P02', null,
  'un reclamo de sesion malformado falla en vez de conceder acceso'
);

reset role;
delete from auth.sessions where id = 'bbbbbbbb-0000-0000-0000-000000000001';
set local role authenticated;

set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated","session_id":"bbbbbbbb-0000-0000-0000-000000000001"}';
select ok(not has_area('reservas'), 'cerrar la sesion le quita el area de inmediato');

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","session_id":"bbbbbbbb-0000-0000-0000-000000000003"}';
select ok(is_admin(), 'otra sesion de otra cuenta sigue viva');

reset role;
delete from auth.sessions where user_id = '11111111-1111-1111-1111-111111111111';
set local role authenticated;

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated","session_id":"bbbbbbbb-0000-0000-0000-000000000003"}';
select ok(not is_admin(), 'cerrar todas las sesiones de la cuenta le quita administracion');

select * from finish();
rollback;
