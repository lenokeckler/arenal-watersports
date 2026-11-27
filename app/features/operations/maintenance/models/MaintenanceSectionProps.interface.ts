import type { MaintenanceData } from "./MaintenanceData.interface";
import type { MaintenanceFilters } from "./MaintenanceFilters.interface";

export interface MaintenanceSectionProps {
  data: MaintenanceData;
  filters: MaintenanceFilters;
}
