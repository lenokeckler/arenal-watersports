begin;
select plan(12);

insert into auth.users (id, email) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'page-size-a@arenal.test'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'page-size-b@arenal.test');

insert into workers (id, username, full_name, base_role) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'page_size_a', 'Worker A', 'reservas'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'page_size_b', 'Worker B', 'reservas');

set local role authenticated;
set local request.jwt.claims to '{"sub":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","role":"authenticated"}';

select is(
  (select reservation_calendar_page_size from workers where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  10,
  'el tamano predeterminado es diez filas'
);
select lives_ok(
  $$ update workers set reservation_calendar_page_size = 25 where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  'el trabajador cambia su tamano de pagina a veinticinco'
);
select is(
  (select reservation_calendar_page_size from workers where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  25,
  'el tamano actualizado queda guardado en su perfil'
);
select lives_ok(
  $$ update workers set reservation_calendar_page_size = 50 where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  'el trabajador cambia el tamano de pagina a cincuenta'
);
select lives_ok(
  $$ update workers set reservation_calendar_page_size = 10 where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  'el trabajador puede restaurar el tamano predeterminado'
);
select throws_ok(
  $$ update workers set reservation_calendar_page_size = 15 where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  '23514', null,
  'un tamano no permitido se rechaza'
);
select throws_ok(
  $$ update workers set full_name = 'Changed' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  '42501', 'Un trabajador solo cambia su correo personal, ultimo modo de trabajo y tamano de pagina del calendario',
  'la preferencia no habilita cambiar el nombre'
);
select throws_ok(
  $$ update workers set reservation_calendar_page_size = 25, expires_at = now() + interval '90 days' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  '42501', 'Un trabajador solo cambia su correo personal, ultimo modo de trabajo y tamano de pagina del calendario',
  'el trabajador no combina la preferencia con un campo protegido'
);
select lives_ok(
  $$ update workers set reservation_calendar_page_size = 50 where id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' $$,
  'rls no permite cambiar la preferencia de otra persona'
);

reset role;
select is(
  (select reservation_calendar_page_size from workers where id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  10,
  'la preferencia de otro trabajador conserva su valor'
);

set local role authenticated;
set local request.jwt.claims to '{"role":"authenticated"}';
select lives_ok(
  $$ update workers set reservation_calendar_page_size = 50 where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  'sin identidad autenticada el cambio no afecta ninguna fila'
);
reset role;
select is(
  (select reservation_calendar_page_size from workers where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  10,
  'sin identidad autenticada la preferencia permanece igual'
);

select * from finish();
rollback;
