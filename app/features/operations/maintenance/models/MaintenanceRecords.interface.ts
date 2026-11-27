import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";

export interface MaintenanceRecords {
  jobs: EquipmentJob[];
  reports: EquipmentReport[];
}
