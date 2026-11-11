begin;
select plan(11);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'reservas@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'reservas', 'Reservas', 'reservas');

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Chaleco', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select throws_ok(
  $$update equipment_categories set alert_min_quantity = 0
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'alert_min_quantity no acepta cero'
);

select throws_ok(
  $$update equipment_categories set alert_min_quantity = -1
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'alert_min_quantity no acepta un valor negativo'
);

select throws_ok(
  $$update equipment_categories set alert_expiry_days = 0
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'alert_expiry_days no acepta cero'
);

select throws_ok(
  $$update equipment_categories set alert_expiry_days = -30
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  '23514',
  null,
  'alert_expiry_days no acepta un valor negativo'
);

select lives_ok(
  $$update equipment_categories set alert_min_quantity = null, alert_expiry_days = null
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'$$,
  'una categoria sin aviso se acepta'
);

update equipment_categories set alert_min_quantity = 5, alert_expiry_days = 30
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select alert_min_quantity::text || '/' || alert_expiry_days::text from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '5/30',
  'una categoria puede avisar por cantidad y por vencimiento a la vez'
);

update equipment_categories set alert_min_quantity = null
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select count(*)::integer from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'
      and alert_min_quantity is null and alert_expiry_days = 30),
  1,
  'una categoria puede avisar solo por vencimiento'
);

set local role authenticated;

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
update equipment_categories set alert_expiry_days = 99
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select alert_expiry_days from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  30,
  'un trabajador que no es administrador no cambia los avisos'
);

set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
update equipment_categories set alert_min_quantity = 8, alert_expiry_days = 15
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select alert_min_quantity::text || '/' || alert_expiry_days::text from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '8/15',
  'un administrador cambia los avisos'
);

update equipment_categories
set alert_min_quantity = 9, updated_by = '22222222-2222-2222-2222-222222222222'
where id = 'aaaaaaaa-0000-0000-0000-000000000001';
select is(
  (select updated_by from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '11111111-1111-1111-1111-111111111111'::uuid,
  'el cambio de avisos queda firmado por quien lo hizo'
);

reset role;
select is(
  (select created_by from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  '11111111-1111-1111-1111-111111111111'::uuid,
  'cambiar los avisos no cambia quien creo la categoria'
);

select * from finish();
rollback;
