export const RESERVATION_DEPOSIT_QUERY = {
  COLUMNS: {
    ID: "id",
  },
  PAYLOAD_KEY: {
    AMOUNT: "amount",
    CURRENCY: "currency",
    HAS_DEPOSIT: "has_deposit",
    PAYLOAD: "p_payload",
    RESERVATION_ID: "reservation_id",
  },
  PROJECTION:
    "code, customer_name, id, parent_reservation_id, starts_at, status, deposits(amount, currency), deposit_declination:deposit_declinations(reservation_id)",
  PROPOSAL_ARGS: {
    RESERVATION_ID: "p_reservation_id",
  },
  RPC: {
    PROPOSAL: "reservation_deposit_proposal",
    RECORD: "record_reservation_deposit",
  },
  TABLE: "reservations",
} as const;
