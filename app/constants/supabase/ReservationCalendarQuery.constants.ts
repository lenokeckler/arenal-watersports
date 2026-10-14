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
    matching_dispatches:reservation_dispatches!reservation_dispatches_reservation_id_fkey()
  `,
  TABLE: "reservations",
} as const;
