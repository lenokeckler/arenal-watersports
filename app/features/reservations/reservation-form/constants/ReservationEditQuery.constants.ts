export const RESERVATION_EDIT_QUERY = {
  COMBO_TYPE: "combo",
  EDITOR_OPERATION: "read reservation last editor",
  EDITOR_RPC: "worker_display_names",
  ID_COLUMN: "id",
  MISSING_EDITOR:
    "Supabase returned no name for the reservation last editor",
  PROJECTION: `
    id,customer_name,people_count,type,starts_at,duration_minutes,status,updated_at,updated_by,
    reservation_items!reservation_items_reservation_id_fkey(
      id,category_id,unit_id,quantity,extra_id,dispatch_id,
      category:equipment_categories!reservation_items_category_id_fkey(id,name),
      unit:equipment_units!reservation_items_unit_id_fkey(
        code,category:equipment_categories!equipment_units_category_id_fkey(id,name)
      )
    )
  `,
  READ_OPERATION: "read reservation to edit",
  TABLE: "reservations",
} as const;
