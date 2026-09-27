begin;
select plan(12);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');

select has_table('public', 'equipment_categories', 'existe equipment_categories');

select throws_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, has_motor, created_by, updated_by)
     values ('Jet Ski', 'by_unit', true,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una categoria con motor exige metrica de uso'
);

select throws_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, has_motor, usage_metric, created_by, updated_by)
     values ('Bote sin motor', 'by_unit', false, 'engine_hours',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una categoria sin motor no lleva metrica de uso'
);

select throws_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, has_condition_photos, created_by, updated_by)
     values ('Chaleco', 'by_quantity', true,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una categoria por cantidad no lleva fotos de estado'
);

select throws_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, is_reservable, created_by, updated_by)
     values ('Kayak doble', 'by_quantity', true,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una categoria reservable exige duracion por defecto'
);

select throws_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, alert_min_quantity, created_by, updated_by)
     values ('Chaleco reserva', 'by_quantity', 0,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'alert_min_quantity no acepta cero ni negativos'
);

select throws_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, alert_expiry_days, created_by, updated_by)
     values ('Extintor vencimiento', 'by_quantity', -5,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'alert_expiry_days no acepta cero ni negativos'
);

select throws_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, deposit_usd, created_by, updated_by)
     values ('Tabla deposito', 'by_quantity', 0,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'deposit_usd no acepta cero ni negativos'
);

select lives_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
     values ('Kayak doble', 'by_quantity', true, 60,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'una categoria reservable puede llevarse por cantidad'
);

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, group_name, default_duration_minutes, created_by, updated_by)
values ('cccccccc-0000-0000-0000-0000000000a1', 'Kayak grupal doble', 'by_quantity', true, 'Kayak', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

select lives_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, is_reservable, group_name, default_duration_minutes, created_by, updated_by)
     values ('Kayak grupal individual', 'by_quantity', true, 'Kayak', 60,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'dos categorias por cantidad comparten grupo'
);

select throws_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, is_reservable, group_name, default_duration_minutes, created_by, updated_by)
     values ('Kayak de carreras', 'by_unit', true, 'Kayak', 60,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'P0001', 'Un grupo no mezcla categorias por unidad con categorias por cantidad',
  'un grupo no mezcla por unidad con por cantidad'
);

select lives_ok(
  $$ insert into equipment_categories
       (name, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
     values ('Tabla de remo', 'by_unit', true, 60,
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111') $$,
  'una categoria sin grupo se acepta igual que siempre'
);

select * from finish();
rollback;
