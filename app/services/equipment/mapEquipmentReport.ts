import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { toCostaRicaDate } from "@/app/utils/equipment-months/toCostaRicaDate";
import type { EquipmentReport } from "./models/EquipmentReport.interface";
import type { EquipmentReportRow } from "./models/EquipmentReportRow.type";

export const mapEquipmentReport = (
  row: EquipmentReportRow
): EquipmentReport => ({
  cause: row.cause,
  createdAt: row.created_at,
  date: toCostaRicaDate(row.created_at),
  description: row.description,
  hasPhotos: row.unit.category.has_condition_photos,
  hits: row.impact_delta,
  id: row.id,
  isPending: row.detail_pending,
  isRetired:
    row.unit.status ===
    INVENTORY_UNIT_STATUS.DECOMMISSIONED,
  reservationId: row.reservation_id,
  unitCode: row.unit.code,
  unitId: row.unit_id,
});
