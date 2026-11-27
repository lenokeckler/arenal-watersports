import type { DamageReportEntry } from "./DamageReportEntry.interface";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";

export interface DamageReportCardProps {
  report?: EquipmentReport;
  entry: DamageReportEntry;
}
