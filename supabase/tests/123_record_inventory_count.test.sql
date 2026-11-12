begin;
select plan(16);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'res@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Admin', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ops', 'Ops', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'res', 'Res', 'reservas');

insert into equipment_categories (id, name, tracking_mode, created_by, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Count gear A', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Count gear B', 'by_unit',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'Count stock C', 'by_quantity',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'CA-1', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'CA-2', 'available', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'CA-3', 'decommissioned', now(), 'baja de prueba',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 'CB-1', 'in_repair', null, null,
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_stock (category_id, quantity_available, quantity_damaged, quantity_in_repair, updated_by) values
  ('aaaaaaaa-0000-0000-0000-000000000003', 5, 1, 0, '11111111-1111-1111-1111-111111111111');

select set_config('count.lines', (
  select jsonb_agg(line)::text from (
    select jsonb_build_object('category_id', u.category_id, 'unit_id', u.id, 'confirmed_status', u.status) as line
      from equipment_units u join equipment_categories c on c.id = u.category_id
     where c.status = 'active' and c.tracking_mode = 'by_unit' and u.status <> 'decommissioned'
    union all
    select jsonb_build_object('category_id', c.id, 'quantity_available', coalesce(s.quantity_available, 0),
                              'quantity_damaged', coalesce(s.quantity_damaged, 0),
                              'quantity_in_repair', coalesce(s.quantity_in_repair, 0))
      from equipment_categories c left join equipment_stock s on s.category_id = c.id
     where c.status = 'active' and c.tracking_mode = 'by_quantity'
  ) t), true);

select ok(
  not has_function_privilege('anon', 'public.record_inventory_count(text, jsonb)', 'execute'),
  'anon no levanta un conteo'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
select is(
  (select outcome from public.record_inventory_count('x', current_setting('count.lines')::jsonb)),
  'not_allowed',
  'reservas no levanta un conteo'
);

set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  (select outcome from public.record_inventory_count(null, '[]'::jsonb)),
  'invalid',
  'un conteo sin lineas no se registra'
);
select is(
  (select outcome from public.record_inventory_count(null, (current_setting('count.lines')::jsonb - 0))),
  'incomplete',
  'un conteo que deja una linea fuera no se registra'
);
select is(
  (select outcome from public.record_inventory_count(null,
    (select jsonb_agg(case when l ? 'unit_id' and l ->> 'unit_id' = 'bbbbbbbb-0000-0000-0000-000000000001'
        then l || '{"confirmed_status":"decommissioned"}'::jsonb else l end)
       from jsonb_array_elements(current_setting('count.lines')::jsonb) l))),
  'invalid',
  'una unidad no se confirma como dada de baja'
);
select is(
  (select outcome from public.record_inventory_count(null,
    (select jsonb_agg(case when l ? 'unit_id' and l ->> 'unit_id' = 'bbbbbbbb-0000-0000-0000-000000000001'
        then l || '{"category_id":"aaaaaaaa-0000-0000-0000-000000000002"}'::jsonb else l end)
       from jsonb_array_elements(current_setting('count.lines')::jsonb) l))),
  'invalid',
  'una unidad de otra categoria no se acepta'
);
select is(
  (select outcome from public.record_inventory_count(null,
    current_setting('count.lines')::jsonb || (current_setting('count.lines')::jsonb -> 0))),
  'invalid',
  'una unidad repetida no se acepta'
);
select is(
  (select outcome from public.record_inventory_count(null,
    (select jsonb_agg(case when l ->> 'category_id' = 'aaaaaaaa-0000-0000-0000-000000000003'
        then l || '{"quantity_damaged":-1}'::jsonb else l end)
       from jsonb_array_elements(current_setting('count.lines')::jsonb) l))),
  'invalid',
  'una cantidad negativa no se acepta'
);

reset role;
select is(
  (select count(*)::integer from public.inventory_counts),
  0,
  'ningun conteo rechazado deja datos a medias'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
select is(
  (select outcome from public.record_inventory_count('  Todo contado  ',
    (select jsonb_agg(case when l ? 'unit_id' and l ->> 'unit_id' = 'bbbbbbbb-0000-0000-0000-000000000001'
        then l || '{"confirmed_status":"damaged"}'::jsonb
        when l ->> 'category_id' = 'aaaaaaaa-0000-0000-0000-000000000003'
        then l || '{"quantity_available":4,"quantity_in_repair":1}'::jsonb else l end)
       from jsonb_array_elements(current_setting('count.lines')::jsonb) l))),
  'recorded',
  'operaciones levanta un conteo completo'
);

reset role;
select is(
  (select notes from public.inventory_counts),
  'Todo contado',
  'las notas se guardan sin espacios sobrantes'
);
select is(
  (select created_by from public.inventory_counts),
  '22222222-2222-2222-2222-222222222222'::uuid,
  'queda registrado quien levanto el conteo'
);
select is(
  (select count(*)::integer from public.inventory_count_lines),
  (select jsonb_array_length(current_setting('count.lines')::jsonb)),
  'el conteo guarda una linea por unidad y por categoria por cantidad'
);
select is(
  (select system_status::text || '/' || confirmed_status::text from public.inventory_count_lines
    where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  'available/damaged',
  'la linea de unidad guarda lo que tenia el sistema y lo que se confirmo'
);
select is(
  (select system_quantity_available::text || '/' || quantity_available::text
          || '/' || system_quantity_in_repair::text || '/' || quantity_in_repair::text
     from public.inventory_count_lines where category_id = 'aaaaaaaa-0000-0000-0000-000000000003'),
  '5/4/0/1',
  'la linea por cantidad guarda lo del sistema y lo contado'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is(
  (select outcome from public.record_inventory_count(null, current_setting('count.lines')::jsonb)),
  'recorded',
  'administracion tambien levanta un conteo'
);

select * from finish();
rollback;
