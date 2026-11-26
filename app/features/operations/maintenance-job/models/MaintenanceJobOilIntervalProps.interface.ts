import type { NullableRef } from "@/app/types";
import type { MaintenanceJobForm } from "./MaintenanceJobForm.interface";
import type { MaintenanceJobUnit } from "./MaintenanceJobUnit.interface";

export interface MaintenanceJobOilIntervalProps {
  error: NullableRef<string>;
  onChange: ReturnType<MaintenanceJobForm["handleChange"]>;
  unit: NullableRef<MaintenanceJobUnit>;
  value: string;
}
