import type { NullableRef } from "@/app/types";
import type { MaintenanceJobUnit } from "./MaintenanceJobUnit.interface";

export interface MaintenanceJobLoad {
  errorMessage: NullableRef<string>;
  units: MaintenanceJobUnit[];
}
