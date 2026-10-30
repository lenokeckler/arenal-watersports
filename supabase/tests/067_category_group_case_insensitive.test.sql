begin;
select plan(4);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administracion', 'admin@correo.com', 'administracion');

insert into equipment_categories (name, tracking_mode, group_name, created_by, updated_by)
values ('Kayak individual', 'by_unit', 'Kayak',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select throws_ok(
  $$insert into equipment_categories (name, tracking_mode, group_name, created_by, updated_by)
    values ('Kayak por cantidad', 'by_quantity', 'KAYAK',
            '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111')$$,
  null,
  'Un grupo no mezcla categorias por unidad con categorias por cantidad',
  'un grupo escrito con otras mayusculas no mezcla modos de seguimiento'
);

select lives_ok(
  $$insert into equipment_categories (name, tracking_mode, group_name, created_by, updated_by)
    values ('Kayak doble', 'by_unit', 'kayak',
            '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111')$$,
  'un grupo con otras mayusculas y el mismo modo de seguimiento se acepta'
);

select lives_ok(
  $$insert into equipment_categories (name, tracking_mode, group_name, created_by, updated_by)
    values ('Remo', 'by_quantity', 'Remo',
            '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111')$$,
  'un grupo distinto acepta otro modo de seguimiento'
);

select ok(
  position('pg_advisory_xact_lock' in pg_get_functiondef('guard_group_tracking_mode'::regproc)) > 0,
  'el guardia del grupo toma un lock consultivo para que dos altas simultaneas no se crucen'
);

select * from finish();
rollback;
