begin;
select plan(3);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'admin@correo.com', 'administracion');

alter table equipment_categories
  drop constraint categories_deposit_positive,
  add constraint categories_deposit_positive
    check ((deposit_usd is null or deposit_usd > 0)
       and (deposit_crc is null or deposit_crc > 0));

insert into equipment_categories
  (id, name, tracking_mode, deposit_usd, deposit_crc, created_by, updated_by)
values
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Legacy', 'by_unit', 'NaN', 'NaN',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

update equipment_categories set deposit_usd = null where deposit_usd = 'NaN';

update equipment_categories set deposit_crc = null where deposit_crc = 'NaN';

alter table equipment_categories
  drop constraint categories_deposit_positive,
  add constraint categories_deposit_positive
    check ((deposit_usd is null or (deposit_usd > 0 and deposit_usd <> 'NaN'))
       and (deposit_crc is null or (deposit_crc > 0 and deposit_crc <> 'NaN')));

select is(
  (select deposit_usd from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  null,
  'la migracion deja en nulo un deposito en dolares que era NaN'
);

select is(
  (select deposit_crc from equipment_categories
    where id = 'aaaaaaaa-0000-0000-0000-000000000002'),
  null,
  'la migracion deja en nulo un deposito en colones que era NaN'
);

select throws_ok(
  $$update equipment_categories set deposit_usd = 'NaN'
    where id = 'aaaaaaaa-0000-0000-0000-000000000002'$$,
  '23514',
  null,
  'despues de la migracion la restriccion rechaza NaN'
);

select * from finish();
rollback;
