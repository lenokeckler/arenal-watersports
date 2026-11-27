import type { NullableRef } from "@/app/types";

export interface CategoryUnitMaintenanceJob {
  cost: NullableRef<string>;
  description: NullableRef<string>;
  isExternal: boolean;
  performedAt: string;
  workType: string;
}
