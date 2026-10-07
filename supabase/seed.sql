insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
  confirmation_token, recovery_token, email_change_token_new, email_change,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
values (
  '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'admin@arenal.local',
  extensions.crypt('Arenal.2026', extensions.gen_salt('bf')), now(),
  '', '', '', '',
  jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')), '{}'::jsonb, now(), now()
)
on conflict do nothing;

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider, last_sign_in_at,
  created_at, updated_at
)
values (
  gen_random_uuid(), '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000001',
    'email', 'admin@arenal.local'
  ),
  'email', now(), now(), now()
)
on conflict do nothing;

insert into workers (id, username, full_name, personal_email, base_role, must_change_password)
values ('00000000-0000-0000-0000-000000000001', 'admin', 'Administración',
        'arenalwatersports@gmail.com', 'administracion', true)
on conflict do nothing;

insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
  confirmation_token, recovery_token, email_change_token_new, email_change,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
select
  v.id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', v.email,
  extensions.crypt('Arenal.2026', extensions.gen_salt('bf')), now(),
  '', '', '', '',
  jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')), '{}'::jsonb, now(), now()
from (values
  ('00000000-0000-0000-0000-000000000003'::uuid, 'bloqueo_intentos@arenal.local'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'bloqueo_admin@arenal.local')
) as v(id, email)
on conflict do nothing;

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider, last_sign_in_at,
  created_at, updated_at
)
select
  gen_random_uuid(), v.id, v.id,
  jsonb_build_object('sub', v.id, 'email', v.email),
  'email', now(), now(), now()
from (values
  ('00000000-0000-0000-0000-000000000003'::uuid, 'bloqueo_intentos@arenal.local'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'bloqueo_admin@arenal.local')
) as v(id, email)
on conflict do nothing;

insert into workers
  (id, username, full_name, base_role, status, blocked_reason, failed_attempts,
   must_change_password, created_by)
values
  ('00000000-0000-0000-0000-000000000003', 'bloqueo_intentos', 'Bloqueo por intentos',
   'operaciones', 'blocked', 'failed_attempts', sign_in_attempt_limit(), false, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000004', 'bloqueo_admin', 'Bloqueo por administración',
   'operaciones', 'blocked', 'administration', 0, false, '00000000-0000-0000-0000-000000000001')
on conflict do nothing;

insert into equipment_categories
  (name, tracking_mode, units_are_interchangeable, is_reservable, has_motor,
   usage_metric, consumes_fuel, has_condition_photos, guide_only,
   default_duration_minutes, deposit_usd, deposit_crc, created_by, updated_by)
values
  ('Jet Ski',     'by_unit', true,  true, true, 'engine_hours', true, true, false, 60,
   200, 100000, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Lancha',      'by_unit', false, true, true, 'engine_hours', true, true, true,  60,
   200, 100000, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Cuadraciclo', 'by_unit', true,  true, true, 'kilometers',   true, true, true,  60,
   200, 100000, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');

insert into equipment_categories
  (name, tracking_mode, units_are_interchangeable, is_reservable, group_name,
   default_duration_minutes, created_by, updated_by)
values
  ('Kayak doble',      'by_unit', true, true, 'Kayak', 60,
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Kayak individual', 'by_unit', true, true, 'Kayak', 60,
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Paddleboard',      'by_unit', true, true, null, 60,
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');

insert into equipment_categories
  (name, tracking_mode, is_reservable, alert_min_quantity, alert_expiry_days,
   group_name, created_by, updated_by)
values
  ('Chaleco',   'by_quantity', false, 5,    null, null,
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

  ('Remo de kayak',       'by_quantity', false, 4, null, 'Remo',
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Remo de paddleboard', 'by_quantity', false, 4, null, 'Remo',
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Extintor',  'by_quantity', false, null, 30, null,
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Botiquin',  'by_quantity', false, null, 30, null,
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Parrilla',  'by_quantity', false, null, null, null,
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

  ('Tabla de wake', 'by_quantity', false, null, null, null,
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');

insert into equipment_units (category_id, code, created_by, updated_by)
select c.id, 'JET-0' || n,
       '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'
from equipment_categories c, generate_series(1, 4) n
where c.name = 'Jet Ski';

insert into equipment_units (category_id, code, fuel_max, created_by, updated_by)
select c.id, 'CUAD-0' || n, 6,
       '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'
from equipment_categories c, generate_series(1, 8) n
where c.name = 'Cuadraciclo';

insert into equipment_units (category_id, code, created_by, updated_by)
select c.id, v.prefix || lpad(n::text, 2, '0'),
       '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'
from equipment_categories c
join (values ('Kayak doble', 'KD-', 6), ('Kayak individual', 'KI-', 3), ('Paddleboard', 'PB-', 9))
  as v(category_name, prefix, unit_count) on v.category_name = c.name
cross join lateral generate_series(1, v.unit_count) n;

insert into equipment_units (category_id, code, created_by, updated_by)
select c.id, code,
       '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'
from equipment_categories c, (values ('PONTOON'), ('BENNINGTON')) as v(code)
where c.name = 'Lancha';

insert into equipment_stock (category_id, quantity_available, updated_by)
select c.id,
       case c.name
         when 'Chaleco'             then 35
         when 'Parrilla'            then 1
         when 'Remo de kayak'       then 22
         when 'Remo de paddleboard' then 15
         when 'Extintor'            then 5
         when 'Botiquin'            then 5
         when 'Tabla de wake'       then 2
         else 0
       end,
       '00000000-0000-0000-0000-000000000001'
from equipment_categories c
where c.tracking_mode = 'by_quantity';

insert into extras (name, price_usd, created_by, updated_by)

values
  ('Parrilla',  25, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Tubing',    30, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('Wakeboard', 35, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');

insert into extra_compatibility (extra_id, unit_id)
select e.id, u.id
from extras e, equipment_units u
where (e.name = 'Parrilla'                and u.code = 'PONTOON')
   or (e.name in ('Wakeboard', 'Tubing')  and u.code = 'BENNINGTON');
