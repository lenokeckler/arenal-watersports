import type { DepositListItem } from "./models/DepositListItem.interface";
import type { DepositRow } from "./models/DepositRow.interface";

export const mapDepositRow = (
  row: DepositRow
): DepositListItem => ({
  id: row.id,
  amount: row.amount,
  currency: row.currency,
  status: row.status,
  reservation: {
    code: row.reservations.code,
    customerName: row.reservations.customer_name,
  },
});
