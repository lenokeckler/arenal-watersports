export const RESERVATION_POSTPONEMENT_QUERY = {
  COLUMNS: {
    ID: "id",
  },
  PROJECTION: `
    id,code,customer_name,starts_at,duration_minutes,status,updated_at,
    reservation_items!reservation_items_reservation_id_fkey(
      id,category_id,unit_id,quantity,extra_id,dispatch_id,fuel_out,usage_out,
      category:equipment_categories!reservation_items_category_id_fkey(name),
      dispatch:reservation_dispatches!reservation_items_dispatch_id_fkey(closed_at),
      unit:equipment_units!reservation_items_unit_id_fkey(
        code,fuel_max,
        category:equipment_categories!equipment_units_category_id_fkey(name,consumes_fuel,usage_metric)
      )
    )
  `,
  TABLE: "reservations",
} as const;
