import type { NullableRef } from "@/app/types";
import type { MaintenanceJobInput } from "./MaintenanceJobInput.interface";

export interface MaintenanceJobErrors {
  cost: NullableRef<string>;
  currency: NullableRef<string>;
  date: NullableRef<string>;
  description: NullableRef<string>;
  threshold: NullableRef<string>;
  unit: NullableRef<string>;
  workType: NullableRef<string>;
}

export interface MaintenanceJobFormResult {
  errors: MaintenanceJobErrors;
  input: NullableRef<MaintenanceJobInput>;
}
