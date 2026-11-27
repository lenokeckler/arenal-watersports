import type { MaintenanceUnit } from "./MaintenanceUnit.interface";

export interface MaintenanceAttentionGroupProps {
  heading: string;
  units: MaintenanceUnit[];
}
