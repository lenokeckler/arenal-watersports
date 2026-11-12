export const RESERVATION_CANCELLATION_QUERY = {
  COLUMNS: {
    ID: "id",
  },
  PROJECTION: `
    id,code,customer_name,starts_at,status,updated_at,
    reservation_items!reservation_items_reservation_id_fkey(
      id,unit_id,quantity,extra_id,
      category:equipment_categories!reservation_items_category_id_fkey(name),
      unit:equipment_units!reservation_items_unit_id_fkey(
        code,
        category:equipment_categories!equipment_units_category_id_fkey(name)
      )
    )
  `,
  RPC: "cancel_reservation",
  TABLE: "reservations",
} as const;
