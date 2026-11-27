import type { MaintenanceFilters } from "./MaintenanceFilters.interface";
import type { MaintenanceUnit } from "./MaintenanceUnit.interface";

export interface MaintenanceAttentionAlertProps {
  filters: MaintenanceFilters;
  waiting: MaintenanceUnit[];
}
