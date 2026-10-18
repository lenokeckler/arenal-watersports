export const RESERVATION_EQUIPMENT_REALTIME = {
  CHANNEL_NAME: "reservation-equipment-eligibility",
  DATABASE_EVENT: "postgres_changes",
  EVENT: "*",
  SCHEMA: "public",
  TABLE: {
    CATEGORIES: "equipment_categories",
    DISPATCHES: "reservation_dispatches",
    ITEMS: "reservation_items",
    RESERVATIONS: "reservations",
    STOCK: "equipment_stock",
    UNITS: "equipment_units",
  },
} as const;
