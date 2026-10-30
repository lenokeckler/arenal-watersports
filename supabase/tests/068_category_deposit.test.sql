begin;
select plan(15);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'reservas@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'reservas', 'Reservas', 'reservas');

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Kayak', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select throws_ok(
  $$update equipment_categories set deposit_crc = 0
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'deposit_crc no acepta cero'
);

select throws_ok(
  $$update equipment_categories set deposit_usd = 0
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'deposit_usd no acepta cero'
);

select throws_ok(
  $$update equipment_categories set deposit_usd = 'NaN'
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'deposit_usd no acepta NaN'
);

select throws_ok(
  $$update equipment_categories set deposit_crc = 'NaN'
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'deposit_crc no acepta NaN'
);

select throws_ok(
  $$update equipment_categories set deposit_usd = -5
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'deposit_usd no acepta un monto negativo'
);

select throws_ok(
  $$update equipment_categories set deposit_crc = -5000
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'deposit_crc no acepta un monto negativo'
);

select throws_ok(
  $$update equipment_categories set deposit_usd = 12345678901
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '22003',
  null,
  'deposit_usd rechaza mas de diez digitos enteros'
);

select throws_ok(
  $$update equipment_categories set deposit_crc = 1234567890123
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '22003',
  null,
  'deposit_crc rechaza mas de doce digitos enteros'
);

select lives_ok(
  $$update equipment_categories set deposit_usd = null, deposit_crc = null
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  'una categoria sin deposito en ninguna moneda se acepta'
);

update equipment_categories set deposit_usd = 200, deposit_crc = 100000
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select deposit_usd::text || '/' || deposit_crc::text from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '200.00/100000.00',
  'ambos depositos se guardan en su moneda'
);

update equipment_categories set deposit_usd = null, deposit_crc = null
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select count(*)::integer from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'
      and deposit_usd is null and deposit_crc is null),
  1,
  'ambos depositos se pueden vaciar'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
update equipment_categories set deposit_usd = 50
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select count(*)::integer from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001' and deposit_usd is not null),
  0,
  'un trabajador que no es administrador no cambia el deposito'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
update equipment_categories set deposit_usd = 75, deposit_crc = 40000
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select deposit_usd::text || '/' || deposit_crc::text from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '75.00/40000.00',
  'un administrador cambia el deposito'
);

update equipment_categories
set deposit_usd = 80, updated_by = '22222222-2222-2222-2222-222222222222'
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select updated_by from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '11111111-1111-1111-1111-111111111111'::uuid,
  'el cambio de deposito queda firmado por quien lo hizo'
);

reset role;
select is(
  (select created_by from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '11111111-1111-1111-1111-111111111111'::uuid,
  'cambiar el deposito no cambia quien creo la categoria'
);

select * from finish();
rollback;
