import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";

export interface DamagePendingSheetProps {
  closeHref: string;
  reports: EquipmentReport[];
  title: string;
}
