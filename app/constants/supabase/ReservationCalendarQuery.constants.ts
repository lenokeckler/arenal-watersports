import type { Database } from "@/app/types";

export const RESERVATION_CALENDAR_ACTIVE_STATUS = {
  DISPATCHED: "dispatched",
  SCHEDULED: "scheduled",
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["reservation_status"]
>;

export const RESERVATION_CALENDAR_QUERY = {
  COLUMNS: {
    CLOSED_AT: "closed_at",
    DISPATCHED_AT: "dispatched_at",
    ENDS_AT: "ends_at",
    ID: "id",
    STARTS_AT: "starts_at",
    STATUS: "status",
  },
  COUNT: "exact",
  MATCHING_DISPATCHES: "matching_dispatches",
  MAX_CONCURRENT_PAGE_READS: 4,
  MINIMUM_TOTAL_COUNT: 0,
  PAGE_SIZE: 100,
  INITIAL_REQUEST_SEQUENCE: 0,
  REQUEST_SEQUENCE_INCREMENT: 1,
  OPERATORS: {
    EQUAL: "eq",
    GREATER_THAN: "gt",
    IS_NULL: "is.null",
    LESS_THAN: "lt",
    NOT_NULL: "not.is.null",
  },
  PROJECTION: `
    id,customer_name,starts_at,ends_at,status,
    reservation_items!reservation_items_reservation_id_fkey(
      category_id,unit_id,quantity,extra_id,
      category:equipment_categories!reservation_items_category_id_fkey(id,name),
      unit:equipment_units!reservation_items_unit_id_fkey(
        code,category:equipment_categories!equipment_units_category_id_fkey(id,name)
      )
    ),
    reservation_dispatches!reservation_dispatches_reservation_id_fkey(
      id,category_id,dispatched_at,ends_at,closed_at,
      category:equipment_categories!reservation_dispatches_category_id_fkey(id,name)
    ),
    reservation_guides!reservation_guides_reservation_id_fkey(
      worker_id,
      workers!reservation_guides_worker_id_fkey(full_name,is_external_guide)
    ),
    matching_dispatches:reservation_dispatches!reservation_dispatches_reservation_id_fkey()
  `,
  SYNTAX: {
    AND: "and",
    CLOSE_GROUP: ")",
    FIELD_SEPARATOR: ".",
    OPEN_GROUP: "(",
  },
  TABLE: "reservations",
} as const;

export const RESERVATION_CALENDAR_WINDOW_FORMAT = {
  CIVIL_PREFIX_LENGTH: 19,
  INSTANT_PATTERN:
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/,
  UTC_SUFFIX: "Z",
} as const;
