import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";

export interface UnitJobPage {
  currentPage: number;
  jobs: EquipmentJob[];
  pageCount: number;
}
