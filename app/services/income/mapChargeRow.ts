import type { ChargeMovement } from "./models/ChargeMovement.interface";
import type { ChargeRow } from "./models/ChargeRow.interface";

export const mapChargeRow = (
  row: ChargeRow
): ChargeMovement => ({
  amount: row.amount,
  currency: row.currency,
  paymentMethod: row.payment_method,
});
