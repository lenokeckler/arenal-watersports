import { resolveReservationHistoryStatus } from "./resolveReservationHistoryStatus";
import type { ReservationHistoryItem } from "./models/ReservationHistoryItem.interface";
import type { ReservationHistoryListRow } from "./models/ReservationHistoryListRow.type";

export const mapReservationHistoryItem = (
  row: ReservationHistoryListRow
): ReservationHistoryItem => ({
  attendedByName: row.created_by_name,
  customerName: row.customer_name,
  equipmentNames: row.equipment_names,
  guideNames: row.guide_names,
  id: row.id,
  startsAt: row.starts_at,
  status: resolveReservationHistoryStatus(row.status),
});
