import type { MaintenanceUnit } from "./MaintenanceUnit.interface";

export interface MaintenanceOverview {
  oilDue: MaintenanceUnit[];
  outOfService: MaintenanceUnit[];
}
