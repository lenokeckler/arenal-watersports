import type { NullableRef } from "@/app/types";
import type { MaintenanceOverview } from "./MaintenanceOverview.interface";

export interface MaintenanceViewProps {
  errorMessage: NullableRef<string>;
  overview: MaintenanceOverview;
}
