export const RESERVATION_CHARGE_QUERY = {
  COLUMNS: {
    ID: "id",
  },
  PROJECTION:
    "code, customer_name, duration_minutes, id, parent_reservation_id, people_count, starts_at, status",
  PROPOSAL_ARGS: {
    RESERVATION_ID: "p_reservation_id",
  },
  RPC: {
    PROPOSAL: "reservation_charge_proposal",
  },
  TABLE: "reservations",
} as const;
