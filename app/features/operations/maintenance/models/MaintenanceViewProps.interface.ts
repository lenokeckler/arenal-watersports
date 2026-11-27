import type { NullableRef } from "@/app/types";
import type { MaintenanceData } from "./MaintenanceData.interface";
import type { MaintenanceFilters } from "./MaintenanceFilters.interface";

export interface MaintenanceViewProps {
  data: MaintenanceData;
  errorMessage: NullableRef<string>;
  filters: MaintenanceFilters;
}
