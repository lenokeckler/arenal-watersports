export const RESERVATION_REFUND_QUERY = {
  COLUMNS: {
    ID: "id",
  },
  NET_ARGS: {
    RESERVATION_ID: "p_reservation_id",
  },
  PAYLOAD_KEY: {
    AMOUNT: "amount",
    CURRENCY: "currency",
    PAYLOAD: "p_payload",
    REASON: "reason",
    RESERVATION_ID: "reservation_id",
  },
  PROJECTION:
    "code, customer_name, id, parent_reservation_id, starts_at, status",
  RPC: {
    NET: "reservation_refundable_net",
    RECORD: "record_reservation_refund",
  },
  TABLE: "reservations",
} as const;
