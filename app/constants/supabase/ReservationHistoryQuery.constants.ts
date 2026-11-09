export const RESERVATION_HISTORY_QUERY = {
  CATEGORY_OPTIONS: {
    COLUMNS: "id,name",
    ORDER_BY: "name",
  },
} as const;

export const RESERVATION_HISTORY_OPERATION = {
  CATEGORY_OPTIONS:
    "read reservation history category options",
  LIST: "read reservation history",
  RECORD: "read reservation history record",
} as const;
