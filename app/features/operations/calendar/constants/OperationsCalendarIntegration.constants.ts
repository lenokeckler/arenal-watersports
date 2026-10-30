export const OPERATIONS_CALENDAR_INTEGRATION_COPY = {
  LOAD_ERROR:
    "No se pudo cargar el calendario de operaciones. Intente de nuevo.",
  RETRY: "Volver a intentar",
} as const;

export const OPERATIONS_CALENDAR_REALTIME = {
  CHANNEL: "operations-calendar",
  EVENT: "*",
  SCHEMA: "public",
  TABLES: {
    DISPATCHES: "reservation_dispatches",
    ITEMS: "reservation_items",
    RESERVATIONS: "reservations",
  },
} as const;
