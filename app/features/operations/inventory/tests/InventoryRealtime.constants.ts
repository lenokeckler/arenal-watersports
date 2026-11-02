export const INVENTORY_REALTIME_TEST = {
  DISCONNECT_ERROR:
    "The channel disconnected before unsubscribe completed",
  MISSING_LISTENER:
    "The inventory change listener was not registered",
  MISSING_STATUS_LISTENER:
    "The inventory connection listener was not registered",
  REMOVE_STATUS: {
    ERROR: "error",
    OK: "ok",
    TIMED_OUT: "timed out",
  },
  TABLES: {
    CATEGORIES: "equipment_categories",
    DISPATCHES: "reservation_dispatches",
    ITEMS: "reservation_items",
    STOCK: "equipment_stock",
    UNITS: "equipment_units",
  },
} as const;
