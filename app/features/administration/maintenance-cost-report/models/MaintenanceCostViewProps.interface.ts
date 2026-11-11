import type { NullableRef } from "@/app/types";
import type { UnitMaintenanceCost } from "./UnitMaintenanceCost.interface";

export interface MaintenanceCostViewProps {
  costs: UnitMaintenanceCost[];
  errorMessage: NullableRef<string>;
}
