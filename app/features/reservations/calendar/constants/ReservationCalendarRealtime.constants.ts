export const RESERVATION_CALENDAR_REALTIME = {
  CHANNEL: "reservation-calendar",
  EVENT: "*",
  SCHEMA: "public",
  TABLES: {
    DISPATCHES: "reservation_dispatches",
    ITEMS: "reservation_items",
    RESERVATIONS: "reservations",
  },
} as const;
