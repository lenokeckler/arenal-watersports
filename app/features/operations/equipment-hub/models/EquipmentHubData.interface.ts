import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";

export interface EquipmentHubData {
  jobs: EquipmentJob[];
  months: string[];
  pendingDamage: number;
  photosMissing: number;
  reports: EquipmentReport[];
  waitingMaintenance: number;
}
