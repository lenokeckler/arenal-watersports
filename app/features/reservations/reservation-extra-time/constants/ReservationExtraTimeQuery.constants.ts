export const RESERVATION_EXTRA_TIME_QUERY = {
  ARGS: {
    RESERVATION_ID: "p_reservation_id",
  },
  COLUMNS: {
    ID: "id",
    RESERVATION_ID: "reservation_id",
  },
  PAYLOAD_KEY: {
    AMOUNT: "amount",
    CURRENCY: "currency",
    OUTCOME: "outcome",
    PAYLOAD: "p_payload",
    PAYMENT_METHOD: "payment_method",
    RESERVATION_ID: "reservation_id",
  },
  PROJECTION: {
    RESERVATION: "code, customer_name, id, status",
    RESOLUTION: "extra_minutes, outcome",
  },
  RPC: {
    GROUPS: "reservation_extra_time_groups",
    RECORD: "record_reservation_extra_time",
  },
  TABLE: {
    RESERVATIONS: "reservations",
    RESOLUTIONS: "reservation_extra_time_resolutions",
  },
} as const;
