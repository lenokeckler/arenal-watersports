import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";

export interface UnitJobMonth {
  jobs: EquipmentJob[];
  month: string;
}
