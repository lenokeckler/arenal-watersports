begin;
select plan(32);

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@arenal.local'),
  ('22222222-2222-2222-2222-222222222222', 'ops@arenal.local'),
  ('33333333-3333-3333-3333-333333333333', 'celso@arenal.local');

insert into workers (id, username, full_name, personal_email, base_role) values
  ('11111111-1111-1111-1111-111111111111', 'admin', 'Administración', 'admin@correo.com', 'administracion');
insert into workers (id, username, full_name, base_role) values
  ('22222222-2222-2222-2222-222222222222', 'ismael', 'Ismael', 'operaciones'),
  ('33333333-3333-3333-3333-333333333333', 'celso', 'Celso', 'reservas');

insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Jet Ski', 'by_unit', true, true, 'engine_hours', 60,
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-01',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
       ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'JET-02',
        '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'Maria', 2, 'rental',
   '2026-09-05 10:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 'Carlos', 1, 'rental',
   '2026-09-05 11:00:00+00', 60, 'scheduled',
   '33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333'),
  ('dddddddd-0000-0000-0000-000000000004', 'Luis', 1, 'rental',
   '2026-09-06 09:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000005', 'Sofia', 1, 'rental',
   '2026-10-01 09:00:00+00', 60, 'scheduled',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status,
   cancellation_reason, created_by, updated_by)
values
  ('dddddddd-0000-0000-0000-000000000003', 'Ana', 1, 'rental',
   '2026-09-05 12:00:00+00', 30, 'cancelled', 'no llego',
   '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111');

insert into reservation_charges (reservation_id, kind, amount, currency, payment_method, created_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 'tariff', 120, 'USD', 'Efectivo',
   '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000001', 'tariff', 60000, 'CRC', 'Efectivo',
   '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000004', 'tariff', 80, 'USD', 'Efectivo',
   '11111111-1111-1111-1111-111111111111');

insert into refunds (reservation_id, amount, currency, reason, created_by)
values ('dddddddd-0000-0000-0000-000000000001', 30, 'USD', 'Cliente parcial',
        '11111111-1111-1111-1111-111111111111');

insert into deposits
  (reservation_id, amount, currency, status, retained_amount, retention_reason,
   resolved_by, resolved_at, created_by)
values
  ('dddddddd-0000-0000-0000-000000000001', 200, 'USD', 'retained', 50, 'Dano leve',
   '11111111-1111-1111-1111-111111111111', now(),
   '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-0000-0000-0000-000000000002', 100, 'USD', 'returned', null, null,
   '11111111-1111-1111-1111-111111111111', now(),
   '33333333-3333-3333-3333-333333333333');

insert into maintenance_records
  (unit_id, work_type, is_external, cost_amount, cost_currency, performed_at, created_by)
values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'cambio de aceite', true, 100, 'USD', '2026-08-01',
   '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000001', 'cambio de llanta', true, 50, 'USD', '2026-08-15',
   '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000001', 'revision interna', false, null, null, '2026-08-20',
   '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-0000-0000-0000-000000000001', 'pintura', true, 20000, 'CRC', '2026-08-25',
   '11111111-1111-1111-1111-111111111111');

select is(
  (select gross_amount from daily_revenue_report
   where day = (now() at time zone 'UTC')::date and currency = 'USD'),
  200::numeric,
  'ingresos brutos del dia en USD suman los dos cobros de esa moneda (120 + 80)'
);
select is(
  (select refunds_amount from daily_revenue_report
   where day = (now() at time zone 'UTC')::date and currency = 'USD'),
  30::numeric,
  'las devoluciones del dia en USD se ven aparte del bruto'
);
select is(
  (select retained_amount from daily_revenue_report
   where day = (now() at time zone 'UTC')::date and currency = 'USD'),
  50::numeric,
  'lo retenido del deposito entra al reporte de ingresos'
);
select is(
  (select net_amount from daily_revenue_report
   where day = (now() at time zone 'UTC')::date and currency = 'USD'),
  220::numeric,
  'el neto es el bruto menos devoluciones mas lo retenido (200 - 30 + 50)'
);
select is(
  (select gross_amount from daily_revenue_report
   where day = (now() at time zone 'UTC')::date and currency = 'CRC'),
  60000::numeric,
  'el mismo dia en colones es un renglon aparte, no sumado al de dolares'
);
select is(
  (select count(*)::int from daily_revenue_report where day = (now() at time zone 'UTC')::date),
  2,
  'un dia con dos monedas da dos renglones, nunca uno solo'
);
select is(
  (select count(*)::int from daily_revenue_report
   where day = (now() at time zone 'UTC')::date and currency = 'USD' and gross_amount = 300),
  0,
  'el deposito devuelto entero (no retenido) no entra al reporte de ingresos'
);

select is(
  (select gross_amount from monthly_revenue_report
   where month = date_trunc('month', now() at time zone 'UTC')::date and currency = 'USD'),
  200::numeric,
  'el mes agrega los cobros de sus dias en USD'
);
select is(
  (select net_amount from monthly_revenue_report
   where month = date_trunc('month', now() at time zone 'UTC')::date and currency = 'USD'),
  220::numeric,
  'el neto mensual en USD es 200 - 30 + 50'
);
select is(
  (select gross_amount from monthly_revenue_report
   where month = date_trunc('month', now() at time zone 'UTC')::date and currency = 'CRC'),
  60000::numeric,
  'el mes en colones queda separado del mes en dolares'
);
select is(
  (select count(*)::int from monthly_revenue_report
   where month <> date_trunc('month', now() at time zone 'UTC')::date),
  0,
  'ningun otro mes tiene cobros, asi que ninguno mas aparece en el reporte de ingresos'
);

select is(
  (select reservations_count from daily_reservation_counts where day = '2026-09-05'),
  2,
  'el 5 de setiembre salieron 2 reservas (la cancelada no cuenta)'
);
select is(
  (select reservations_count from daily_reservation_counts where day = '2026-09-06'),
  1,
  'el 6 de setiembre salio 1 reserva'
);
select is(
  (select count(*)::int from daily_reservation_counts where day = '2026-09-05' and reservations_count = 3),
  0,
  'la reserva cancelada nunca se cuenta como salida'
);
select is(
  (select reservations_count from monthly_reservation_counts where month = '2026-09-01'),
  3,
  'setiembre agrega las salidas de sus dos dias (2 + 1)'
);
select is(
  (select reservations_count from monthly_reservation_counts where month = '2026-10-01'),
  1,
  'octubre tiene su propia salida, separada de setiembre'
);

select is(
  (select reservations_count from reservations_by_worker
   where worker_id = '11111111-1111-1111-1111-111111111111'),
  3,
  'admin registro 3 reservas no canceladas (la cancelada no le cuenta)'
);
select is(
  (select reservations_count from reservations_by_worker
   where worker_id = '33333333-3333-3333-3333-333333333333'),
  1,
  'celso registro 1 reserva'
);
select is(
  (select count(*)::int from reservations_by_worker
   where worker_id = '22222222-2222-2222-2222-222222222222'),
  0,
  'ismael nunca registro una reserva, asi que no aparece en el reporte'
);
select ok(
  (select first_reservation_at from reservations_by_worker
   where worker_id = '11111111-1111-1111-1111-111111111111')
  = '2026-09-05 10:00:00+00'::timestamptz,
  'first_reservation_at es la salida mas temprana de ese trabajador'
);
select ok(
  (select last_reservation_at from reservations_by_worker
   where worker_id = '11111111-1111-1111-1111-111111111111')
  = '2026-10-01 09:00:00+00'::timestamptz,
  'last_reservation_at es la salida mas tardia de ese trabajador'
);

select is(
  (select total_cost from maintenance_cost_by_unit
   where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001' and currency = 'USD'),
  150::numeric,
  'el costo en USD suma los dos mantenimientos reales (100 + 50)'
);
select is(
  (select records_count from maintenance_cost_by_unit
   where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001' and currency = 'USD'),
  2,
  'el conteo en USD son los dos registros con costo, no el interno sin costo'
);
select ok(
  (select last_performed_at from maintenance_cost_by_unit
   where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001' and currency = 'USD')
  = '2026-08-15'::date,
  'last_performed_at es la fecha del mantenimiento con costo mas reciente en esa moneda'
);
select is(
  (select total_cost from maintenance_cost_by_unit
   where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001' and currency = 'CRC'),
  20000::numeric,
  'el mantenimiento en colones queda en un renglon propio, no mezclado con dolares'
);
select is(
  (select count(*)::int from maintenance_cost_by_unit
   where unit_id = 'bbbbbbbb-0000-0000-0000-000000000001'),
  2,
  'la unidad tiene exactamente dos renglones, uno por moneda (el interno sin costo no agrega un tercero)'
);
select is(
  (select count(*)::int from maintenance_cost_by_unit
   where unit_id = 'bbbbbbbb-0000-0000-0000-000000000002'),
  0,
  'una unidad sin ningun mantenimiento con costo no aparece en el reporte'
);

set local role authenticated;
set local request.jwt.claims to '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from daily_revenue_report),
  0,
  'operaciones no tiene politica de select sobre reservation_charges/refunds/deposits, asi que el reporte de ingresos le da vacio'
);
select is(
  (select count(*)::int from reservations_by_worker),
  0,
  'workers_select solo deja a un no-admin ver su propia fila de workers, asi que el join de reservations_by_worker no tiene nada que mostrarle a ismael'
);
select isnt(
  (select count(*)::int from maintenance_cost_by_unit),
  0,
  'maintenance_select es abierto a cualquier autenticado, asi que operaciones si ve el costo de mantenimiento'
);

reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select isnt(
  (select count(*)::int from daily_revenue_report),
  0,
  'administracion si ve el reporte de ingresos completo'
);
select is(
  (select reservations_count from reservations_by_worker
   where worker_id = '11111111-1111-1111-1111-111111111111'),
  3,
  'administracion ve el mismo reporte de reservas por trabajador que como superusuario'
);

select * from finish();
rollback;
