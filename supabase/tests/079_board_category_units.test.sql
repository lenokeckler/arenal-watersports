begin;
select plan(12);

insert into auth.users (id, email) values
  ('b0a4d000-0000-0000-0000-000000000001', 'units-structure@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('b0a4d000-0000-0000-0000-000000000001', 'units_structure', 'Units structure', 'units-structure@arenal.local', 'operaciones');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, default_duration_minutes, created_by, updated_by)
values
  ('b0a4d001-0000-0000-0000-000000000001', 'Units structure visible', 'active', 'by_unit', true, 60, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d001-0000-0000-0000-000000000002', 'Units structure not reservable', 'active', 'by_unit', false, 60, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d001-0000-0000-0000-000000000003', 'Units structure inactive', 'inactive', 'by_unit', true, 60, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d001-0000-0000-0000-000000000004', 'Units structure empty', 'active', 'by_unit', true, 60, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001');

insert into equipment_units
  (id, category_id, code, status, decommissioned_at, decommission_reason, created_by, updated_by)
values
  ('b0a4d002-0000-0000-0000-000000000001', 'b0a4d001-0000-0000-0000-000000000001', 'UST-1', 'available', null, null, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d002-0000-0000-0000-000000000002', 'b0a4d001-0000-0000-0000-000000000001', 'UST-2', 'in_maintenance', null, null, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d002-0000-0000-0000-000000000003', 'b0a4d001-0000-0000-0000-000000000001', 'UST-3', 'damaged', null, null, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d002-0000-0000-0000-000000000004', 'b0a4d001-0000-0000-0000-000000000001', 'UST-4', 'in_repair', null, null, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d002-0000-0000-0000-000000000005', 'b0a4d001-0000-0000-0000-000000000001', 'UST-5', 'decommissioned', now(), 'Fixture decommission', 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d002-0000-0000-0000-000000000006', 'b0a4d001-0000-0000-0000-000000000002', 'UST-6', 'available', null, null, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001'),
  ('b0a4d002-0000-0000-0000-000000000007', 'b0a4d001-0000-0000-0000-000000000003', 'UST-7', 'available', null, null, 'b0a4d000-0000-0000-0000-000000000001', 'b0a4d000-0000-0000-0000-000000000001');

select columns_are(
  'public',
  'board_category_units',
  array[
    'unit_id',
    'unit_code',
    'category_id',
    'effective_status',
    'returns_at',
    'reservation_id',
    'reservation_code',
    'customer_name',
    'reservation_starts_at',
    'reservation_ends_at'
  ],
  'la vista expone solo las diez columnas acordadas'
);
select ok(
  (select coalesce(reloptions @> array['security_invoker=true'], false) from pg_class where oid = 'public.board_category_units'::regclass),
  'la vista usa security_invoker'
);
select is(
  (select count(*)::integer from board_category_units where category_id = 'b0a4d001-0000-0000-0000-000000000001'),
  4,
  'la categoria visible lista sus cuatro unidades activas'
);
select is(
  (select count(*)::integer from board_category_units where unit_id = 'b0a4d002-0000-0000-0000-000000000005'),
  0,
  'una unidad dada de baja no aparece'
);
select is(
  (select count(*)::integer from board_category_units where category_id = 'b0a4d001-0000-0000-0000-000000000002'),
  0,
  'las unidades de una categoria no reservable no aparecen'
);
select is(
  (select count(*)::integer from board_category_units where category_id = 'b0a4d001-0000-0000-0000-000000000003'),
  0,
  'las unidades de una categoria inactiva no aparecen'
);
select is(
  (select count(*)::integer from board_category_units where category_id = 'b0a4d001-0000-0000-0000-000000000004'),
  0,
  'una categoria visible sin unidades no devuelve filas'
);
select is(
  (select count(*)::integer from board_category_units where category_id = 'b0a4d001-0000-0000-0000-000000000001'),
  (select total_count from board_category_summary where category_id = 'b0a4d001-0000-0000-0000-000000000001'),
  'las filas de la categoria coinciden con el total del tablero'
);
select is(
  (select effective_status from board_category_units where unit_id = 'b0a4d002-0000-0000-0000-000000000001'),
  'available',
  'una unidad disponible se muestra disponible'
);
select is(
  (select effective_status from board_category_units where unit_id = 'b0a4d002-0000-0000-0000-000000000002'),
  'in_maintenance',
  'una unidad en mantenimiento se muestra en mantenimiento'
);
select is(
  (select effective_status from board_category_units where unit_id = 'b0a4d002-0000-0000-0000-000000000003'),
  'damaged',
  'una unidad danada se muestra danada'
);
select is(
  (select effective_status from board_category_units where unit_id = 'b0a4d002-0000-0000-0000-000000000004'),
  'in_repair',
  'una unidad en reparacion se muestra en reparacion'
);

select * from finish();
rollback;
