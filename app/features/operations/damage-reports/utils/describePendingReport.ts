import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";
import { formatShortDay } from "@/app/utils/equipment-months/formatEquipmentDates";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";

export const describePendingReport = (
  report: EquipmentReport
): string =>
  DAMAGE_REPORTS_COPY.PENDING_DETAIL(
    report.unitCode,
    formatShortDay(report.date)
  );
