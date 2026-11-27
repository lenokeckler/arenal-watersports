import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";

export interface DamageOverview {
  calendarMonths: string[];
  calendarReports: EquipmentReport[];
  month: string;
  pending: EquipmentReport[];
  recent: EquipmentReport[];
  today: string;
}
