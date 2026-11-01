import { E2E_UNIT_CONCURRENCY } from "../constants/E2eUnitConcurrency.constants";
import type { UnitConcurrencyIds } from "./models/UnitConcurrencyIds.interface";

export const buildCleanupSql = (
  ids: UnitConcurrencyIds
): string => `
delete from reservation_items where reservation_id = '${ids.reservationId}';
delete from reservation_dispatches where id = '${ids.dispatchId}';
delete from reservations where id = '${ids.reservationId}';
delete from equipment_units where id = '${ids.unitId}';
delete from equipment_categories where id = '${ids.categoryId}';
`;

export const buildSeedSql = (
  ids: UnitConcurrencyIds
): string => `
${buildCleanupSql(ids)}
select id as admin_id from workers where base_role = 'administracion' limit 1 \\gset
insert into equipment_categories
  (id, name, tracking_mode, is_reservable, has_motor, usage_metric,
   default_duration_minutes, created_by, updated_by)
values ('${ids.categoryId}', '${E2E_UNIT_CONCURRENCY.CATEGORY_NAME} ${ids.unitCode}', 'by_unit', true, false, null, 60,
        :'admin_id', :'admin_id');
insert into equipment_units (id, category_id, code, created_by, updated_by)
values ('${ids.unitId}', '${ids.categoryId}', '${ids.unitCode}', :'admin_id', :'admin_id');
insert into reservations
  (id, customer_name, people_count, type, starts_at, duration_minutes, status, created_by, updated_by)
values ('${ids.reservationId}', 'E2E concurrency', 1, 'rental',
        '2030-01-01 10:00:00+00', 60, 'scheduled', :'admin_id', :'admin_id');
insert into reservation_items (reservation_id, unit_id, created_by, updated_by)
values ('${ids.reservationId}', '${ids.unitId}', :'admin_id', :'admin_id');
insert into reservation_dispatches
  (id, reservation_id, category_id, dispatched_at, duration_minutes, created_by, updated_by)
values ('${ids.dispatchId}', '${ids.reservationId}', '${ids.categoryId}',
        '2030-01-01 10:00:00+00', 60, :'admin_id', :'admin_id');
`;

export const buildChangeStatusSql = (
  ids: UnitConcurrencyIds,
  holdSeconds: number
): string => `
begin;
update equipment_units set status = 'in_maintenance' where id = '${ids.unitId}';
select pg_sleep(${holdSeconds});
commit;
`;

export const buildAssignDispatchSql = (
  ids: UnitConcurrencyIds,
  holdSeconds: number
): string => `
begin;
update reservation_items set dispatch_id = '${ids.dispatchId}'
where reservation_id = '${ids.reservationId}' and unit_id = '${ids.unitId}';
select pg_sleep(${holdSeconds});
commit;
`;

export const buildReadStateSql = (
  ids: UnitConcurrencyIds
): string => `
select (select status from equipment_units where id = '${ids.unitId}')
  || '|' || coalesce((select dispatch_id::text from reservation_items
     where reservation_id = '${ids.reservationId}' and unit_id = '${ids.unitId}'), 'none');
`;
