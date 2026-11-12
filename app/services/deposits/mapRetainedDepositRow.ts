import { DepositRowIncompleteError } from "./DepositRowIncompleteError";
import type { RetainedDepositItem } from "./models/RetainedDepositItem.interface";
import type { RetainedDepositRow } from "./models/RetainedDepositRow.interface";

export const mapRetainedDepositRow = (
  row: RetainedDepositRow
): RetainedDepositItem => {
  if (
    row.retained_amount === null ||
    row.retention_reason === null
  ) {
    throw new DepositRowIncompleteError();
  }

  return {
    id: row.id,
    currency: row.currency,
    status: row.status,
    retainedAmount: row.retained_amount,
    retentionReason: row.retention_reason,
    reservation: {
      code: row.reservations.code,
      customerName: row.reservations.customer_name,
    },
  };
};
