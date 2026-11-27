import type { DepositResolutionRecordRow } from "../models/DepositResolutionRecordRow.type";
import type { DepositResolutionRecorded } from "../models/DepositResolutionRecorded.interface";

export const mapDepositResolutionRecorded = (
  row: DepositResolutionRecordRow
): DepositResolutionRecorded => ({
  currency: row.resolved_currency,
  depositAmount: row.deposit_amount,
  keptAmount: row.kept_amount,
  reason: row.resolved_reason,
  resolvedByName: row.resolved_by_name,
  returnedAmount: row.returned_amount,
  status: row.resolved_status,
});
