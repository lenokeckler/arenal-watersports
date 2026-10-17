insert into auth.users (id, email) values
  ('e2400000-0000-4000-8000-000000000001', 'res04-admin-fixture@arenal.local'),
  ('e2400000-0000-4000-8000-000000000002', 'res04-reservations-fixture@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('e2400000-0000-4000-8000-000000000001', 'res04-admin-fixture', 'Reservations admin fixture', 'res04-admin@correo.com', 'reservas'),
  ('e2400000-0000-4000-8000-000000000002', 'res04-reservations-fixture', 'Reservas fixture', 'res04-reservas@correo.com', 'reservas');

insert into equipment_categories
  (id, name, status, tracking_mode, is_reservable, units_are_interchangeable, default_duration_minutes, created_by, updated_by)
values
  ('e2400000-0000-4000-8000-000000000101', 'RES04 Chaleco fixture', 'active', 'by_quantity', true, true, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000102', 'RES04 Lancha fixture', 'active', 'by_unit', true, false, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000103', 'RES04 Tabla fixture', 'inactive', 'by_quantity', true, true, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000104', 'RES04 Kayak fixture', 'active', 'by_unit', true, true, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001'),
  ('e2400000-0000-4000-8000-000000000105', 'RES04 No reservable fixture', 'active', 'by_quantity', false, true, 60,
   'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001');

insert into equipment_stock (category_id, quantity_available, updated_by)
values ('e2400000-0000-4000-8000-000000000101', 2,
        'e2400000-0000-4000-8000-000000000001');

insert into equipment_units (category_id, code, status, created_by, updated_by)
values ('e2400000-0000-4000-8000-000000000104', 'RES04-KAYAK-FIXTURE', 'available',
        'e2400000-0000-4000-8000-000000000001', 'e2400000-0000-4000-8000-000000000001');
