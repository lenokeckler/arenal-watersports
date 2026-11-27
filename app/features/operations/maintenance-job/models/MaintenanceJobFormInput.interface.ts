import type { MaintenanceJobUnit } from "./MaintenanceJobUnit.interface";

export interface MaintenanceJobFormInput {
  initialUnitId?: string;
  units: MaintenanceJobUnit[];
}
