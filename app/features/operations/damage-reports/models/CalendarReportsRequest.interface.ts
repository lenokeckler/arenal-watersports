import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";

export interface CalendarReportsRequest {
  month: string;
  recent: EquipmentReport[];
  recentMonths: string[];
}
