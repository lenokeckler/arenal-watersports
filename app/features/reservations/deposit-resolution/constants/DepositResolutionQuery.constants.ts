export const DEPOSIT_RESOLUTION_QUERY = {
  COLUMNS: {
    ID: "id",
  },
  PAYLOAD_KEY: {
    DEPOSIT_ID: "deposit_id",
    PAYLOAD: "p_payload",
    REASON: "reason",
    RETURNED_AMOUNT: "returned_amount",
  },
  PROJECTION:
    "amount, currency, id, status, reservation:reservations(code, customer_name, id, status)",
  RPC: {
    RESOLVE: "resolve_reservation_deposit",
  },
  TABLE: "deposits",
} as const;
