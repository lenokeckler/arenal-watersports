import type { NullableRef } from "@/app/types";
import type { CategoryUnitDamage } from "./CategoryUnitDamage.interface";
import type { CategoryUnitMaintenanceJob } from "./CategoryUnitMaintenanceJob.interface";

export interface CategoryUnitStatusDetails {
  damage: NullableRef<CategoryUnitDamage>;
  jobs: CategoryUnitMaintenanceJob[];
  pendingReportId: NullableRef<string>;
}
