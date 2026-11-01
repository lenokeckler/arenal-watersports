export const RESERVATION_DETAIL_QUERY = {
  ORDER: {
    RESERVATION_DISPATCHES: {
      DISPATCHED_AT: "dispatched_at",
      ID: "id",
      TABLE: "reservation_dispatches",
    },
    RESERVATION_ITEMS: {
      ID: "id",
      TABLE: "reservation_items",
    },
  },
  SELECT:
    "cancellation_reason, closed_at, code, created_at, created_by, customer_name, dispatched_at, duration_minutes, ends_at, id, parent_reservation_id, people_count, starts_at, status, type, updated_at, updated_by, reservation_items(id, category_id, dispatch_id, extra_id, quantity, unit_id, category:equipment_categories!reservation_items_category_id_fkey(name), unit:equipment_units!reservation_items_unit_id_fkey(code, category:equipment_categories!equipment_units_category_id_fkey(name)), extra:extras!reservation_items_extra_id_fkey(name)), reservation_guides(worker_id), reservation_dispatches(id, category_id, dispatched_at, ends_at, closed_at, category:equipment_categories!reservation_dispatches_category_id_fkey(name)), reservation_charges(amount, currency, kind), refunds(amount, currency), reservation_pricing(list_amount_usd, list_amount_crc, agreed_amount_usd, agreed_amount_crc), combo:combos!reservations_combo_id_fkey(name)",
  WORKER_NAMES_RPC: "worker_display_names",
} as const;
