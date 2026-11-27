import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";
import type { UnitHistoryUnit } from "./UnitHistoryUnit.interface";

export interface UnitHistoryData {
  jobs: EquipmentJob[];
  reports: EquipmentReport[];
  unit: UnitHistoryUnit;
}
