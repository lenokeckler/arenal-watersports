import type { NullableRef } from "@/app/types";
import type { MaintenanceHistoryEntry } from "./MaintenanceHistoryEntry.interface";

export interface MaintenanceHistoryViewProps {
  entries: MaintenanceHistoryEntry[];
  errorMessage: NullableRef<string>;
  hasNextPage: boolean;
  page: number;
}
