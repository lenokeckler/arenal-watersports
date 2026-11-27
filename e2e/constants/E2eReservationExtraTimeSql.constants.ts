import { E2E_RESERVATION_EXTRA_TIME_SCENARIO as SCENARIO } from "./E2eReservationExtraTime.constants";

const RESERVATION = `
select id as category from equipment_categories where status = 'active' order by name limit 1 \\gset
select now() - interval '5 hours' as base \\gset
insert into reservations (created_by, customer_name, duration_minutes, people_count, starts_at, status,
  dispatched_at, closed_at, type, updated_by)
values (:'uid', :'customer', 60, 2, :'base'::timestamptz, :'status'::reservation_status,
  :'base'::timestamptz, case when :'status' = 'closed' then now() end, 'rental', :'uid')
returning id as reservation, code as code \\gset
`;

const DISPATCH = (
  start: string,
  duration: number,
  planned: number,
  closed: string
): string => `
insert into reservation_dispatches (reservation_id, category_id, dispatched_at, duration_minutes,
  planned_duration_minutes, closed_at, created_by, updated_by)
values (:'reservation', :'category', :'base'::timestamptz + interval '${start}', ${duration}, ${planned},
  ${closed}, :'uid', :'uid');
`;

const RESULT = "select :'reservation' || ',' || :'code';";

export const E2E_RESERVATION_EXTRA_TIME_SQL = {
  SEED: {
    [SCENARIO.EXTENDED]: `${RESERVATION}${DISPATCH("0 minutes", 90, 60, ":'base'::timestamptz + interval '90 minutes'")}${RESULT}`,
    [SCENARIO.OUT]: `${RESERVATION}${DISPATCH("0 minutes", 60, 60, "null")}${RESULT}`,
    [SCENARIO.OVERDUE]: `${RESERVATION}${DISPATCH("0 minutes", 60, 60, ":'base'::timestamptz + interval '95 minutes'")}${RESULT}`,
    [SCENARIO.POSTPONED]: `${RESERVATION}${DISPATCH("0 minutes", 60, 60, ":'base'::timestamptz + interval '150 minutes'")}
insert into reservation_postponements (reservation_id, cause, was_dispatched, previous_starts_at, new_starts_at, created_by)
values (:'reservation', 'storm', true, :'base'::timestamptz, :'base'::timestamptz + interval '160 minutes', :'uid');
${DISPATCH("160 minutes", 60, 60, ":'base'::timestamptz + interval '230 minutes'")}${RESULT}`,
  },
  READ: `
select concat_ws('|',
  coalesce((select outcome::text from reservation_extra_time_resolutions where reservation_id = :'reservation'), ''),
  coalesce((select extra_minutes::text from reservation_extra_time_resolutions where reservation_id = :'reservation'), ''),
  (select count(*) from reservation_charges where reservation_id = :'reservation'),
  coalesce((select string_agg(concat_ws(',', kind, amount, currency, payment_method), ';')
    from reservation_charges where reservation_id = :'reservation'), '')
);`,
  CLEANUP: `
begin;
create temporary table e2e_extra_time_ids on commit drop as
select id from reservations where created_by = :'uid';
delete from reservation_extra_time_resolutions where reservation_id in (select id from e2e_extra_time_ids);
delete from reservation_charges where reservation_id in (select id from e2e_extra_time_ids);
delete from reservation_postponements where reservation_id in (select id from e2e_extra_time_ids);
delete from reservation_dispatches where reservation_id in (select id from e2e_extra_time_ids);
commit;`,
} as const;
