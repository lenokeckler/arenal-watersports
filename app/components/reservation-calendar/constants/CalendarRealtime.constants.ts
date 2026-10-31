export const CALENDAR_REALTIME = {
  CHANGE: "postgres_changes",
  EVENT: "*",
  SCHEMA: "public",
  TABLES: {
    RESERVATIONS: "reservations",
    DISPATCHES: "reservation_dispatches",
    ITEMS: "reservation_items",
  },
  STATUS: {
    SUBSCRIBED: "SUBSCRIBED",
    ERROR: "CHANNEL_ERROR",
    TIMED_OUT: "TIMED_OUT",
    CLOSED: "CLOSED",
  },
  ONLINE: "online",
  COALESCE_MS: 250,
} as const;
