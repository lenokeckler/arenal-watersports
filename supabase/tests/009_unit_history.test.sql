begin;
select plan(17);

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'ope13-test@arenal.local');
insert into workers (id, username, full_name, personal_email, base_role)
values ('11111111-1111-1111-1111-111111111111', 'ope13-test', 'Operaciones test', 'ope13-test@correo.com', 'operaciones');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   has_condition_photos, default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'OPE-13 Test Jet Ski', 'by_unit', true, true,
        'engine_hours', true, 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'OPE13-UNIT-01',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'OPE13-UNIT-02',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into unit_condition_photos (unit_id, angle, storage_path, uploaded_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'right_side', 'fotos/jet-01-der.webp',
        '11111111-1111-1111-1111-111111111111');

select throws_ok(
  $$ insert into unit_condition_photos (unit_id, angle, storage_path, uploaded_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'right_side', 'fotos/otra.webp',
             '11111111-1111-1111-1111-111111111111') $$,
  '23505', null,
  'no se acumulan dos fotos del mismo angulo'
);

select lives_ok(
  $$ insert into unit_condition_photos (unit_id, angle, storage_path, uploaded_by)
     values ('bbbbbbbb-0000-0000-0000-000000000002', 'right_side', 'fotos/jet-02-der.webp',
             '11111111-1111-1111-1111-111111111111') $$,
  'el mismo angulo en otra unidad si se acepta'
);

select throws_ok(
  $$ insert into damage_reports (unit_id, cause, description, impact_delta, created_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'collision', 'Golpe en el casco', -1,
             '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un impact_delta negativo es rechazado'
);

set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
set local role authenticated;

select lives_ok(
  $$ insert into damage_reports (id, unit_id, cause, description, impact_delta, created_by)
     values ('dddddddd-0000-0000-0000-000000000001',
             'bbbbbbbb-0000-0000-0000-000000000001', 'collision', 'Golpe en el casco', 1,
             null) $$,
  'un reporte de dano valido, sin reserva, se acepta'
);

reset role;

select is(
  (select row(unit_id, cause::text, description,
              impact_delta, created_by)
   from damage_reports
   where id = 'dddddddd-0000-0000-0000-000000000001'),
  row('bbbbbbbb-0000-0000-0000-000000000001'::uuid,
      'collision'::text, 'Golpe en el casco'::text, 1,
      '11111111-1111-1111-1111-111111111111'::uuid),
  'el reporte persiste sus datos y el trabajador autenticado'
);

select lives_ok(
  $$ insert into maintenance_records
       (unit_id, work_type, is_external, performed_at, created_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'Montar defensas', false,
             current_date, '11111111-1111-1111-1111-111111111111') $$,
  'un trabajo interno se registra sin costo'
);

select lives_ok(
  $$ insert into maintenance_records
       (unit_id, work_type, is_external, cost_amount, cost_currency, performed_at, created_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'Defensa nueva', false, 45, 'USD',
             current_date, '11111111-1111-1111-1111-111111111111') $$,
  'un trabajo interno con repuesto si lleva costo'
);

select throws_ok(
  $$ insert into maintenance_records
       (unit_id, work_type, is_external, cost_amount, performed_at, created_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'Cambio de aceite', true, 80,
             current_date, '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un costo sin moneda es rechazado'
);

select throws_ok(
  $$ insert into maintenance_records
       (unit_id, work_type, is_external, cost_currency, performed_at, created_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'Cambio de aceite', true, 'USD',
             current_date, '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'una moneda sin monto es rechazada'
);

select throws_ok(
  $$ insert into maintenance_records
       (unit_id, work_type, is_external, cost_amount, cost_currency, performed_at, created_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'Cambio de aceite', true, 0, 'USD',
             current_date, '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un costo de cero es rechazado'
);

select throws_ok(
  $$ insert into maintenance_records
       (unit_id, work_type, is_external, cost_amount, cost_currency, performed_at, created_by)
     values ('bbbbbbbb-0000-0000-0000-000000000001', 'Cambio de aceite', true, -10, 'USD',
             current_date, '11111111-1111-1111-1111-111111111111') $$,
  '23514', null,
  'un costo negativo es rechazado'
);

insert into inventory_counts (id, created_by)
values ('ffffffff-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111');

select throws_ok(
  $$ insert into inventory_count_lines
       (count_id, category_id, unit_id, confirmed_status, quantity_available)
     values ('ffffffff-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001',
             'bbbbbbbb-0000-0000-0000-000000000001', 'available', 3) $$,
  '23514', null,
  'una linea de conteo no mezcla unidad con cantidad'
);

select throws_ok(
  $$ insert into inventory_count_lines
       (count_id, category_id)
     values ('ffffffff-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001') $$,
  '23514', null,
  'una linea de conteo no puede quedar sin unidad y sin cantidad'
);

select lives_ok(
  $$ insert into inventory_count_lines
       (count_id, category_id, unit_id, confirmed_status)
     values ('ffffffff-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001',
             'bbbbbbbb-0000-0000-0000-000000000001', 'available') $$,
  'una linea de conteo por unidad, sola, se acepta'
);

select lives_ok(
  $$ insert into inventory_count_lines
       (count_id, category_id, quantity_available, quantity_damaged, quantity_in_repair)
     values ('ffffffff-0000-0000-0000-000000000001',
             'aaaaaaaa-0000-0000-0000-000000000001', 5, 1, 0) $$,
  'una linea de conteo por cantidad, sola, se acepta'
);

select is(
  (select count(*)::int from inventory_count_lines
   where count_id = 'ffffffff-0000-0000-0000-000000000001'),
  2,
  'el conteo tiene dos lineas antes de borrarlo'
);

delete from inventory_counts where id = 'ffffffff-0000-0000-0000-000000000001';

select is(
  (select count(*)::int from inventory_count_lines
   where count_id = 'ffffffff-0000-0000-0000-000000000001'),
  0,
  'borrar el conteo arrastra sus lineas por cascada'
);

select * from finish();
rollback;
