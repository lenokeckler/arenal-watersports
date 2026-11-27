import type { NullableRef } from "@/app/types";
import type { MaintenanceRecords } from "./MaintenanceRecords.interface";

export interface MaintenanceActivity {
  firstDate: NullableRef<string>;
  recent: MaintenanceRecords;
}
