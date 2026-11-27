import type { MaintenanceJobUnit } from "./MaintenanceJobUnit.interface";

export interface MaintenanceJobFormInput {
  initialDate?: string;
  initialUnitId?: string;
  units: MaintenanceJobUnit[];
}
