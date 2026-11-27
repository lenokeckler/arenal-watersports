import type { NullableUndefined } from "@/app/types";

export interface MaintenanceJobProps {
  dateParam?: string | string[];
  unitParam?: NullableUndefined<string | string[]>;
}
