import { resolveReservationHistoryStatus } from "./resolveReservationHistoryStatus";
import type { ReservationHistoryRecord } from "./models/ReservationHistoryRecord.interface";
import type { ReservationHistoryRecordRow } from "./models/ReservationHistoryRecordRow.type";

export const mapReservationHistoryRecord = (
  row: ReservationHistoryRecordRow
): ReservationHistoryRecord => ({
  cancellationReason: row.cancellation_reason,
  createdBy: {
    at: row.created_at,
    name: row.created_by_name,
  },
  customerName: row.customer_name,
  equipmentNames: row.equipment_names,
  guideNames: row.guide_names,
  id: row.id,
  startsAt: row.starts_at,
  status: resolveReservationHistoryStatus(row.status),
  updatedBy: {
    at: row.updated_at,
    name: row.updated_by_name,
  },
});
