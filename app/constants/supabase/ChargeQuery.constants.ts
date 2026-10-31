export const CHARGE_QUERY = {
  COUNT: "exact",
  CREATED_AT_COLUMN: "created_at",
  OPERATION: "fetch charges in range",
  SELECT: "amount, currency, payment_method",
  TABLE: "reservation_charges",
} as const;
