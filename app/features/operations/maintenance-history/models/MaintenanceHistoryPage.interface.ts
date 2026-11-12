import type { MaintenanceHistoryEntry } from "./MaintenanceHistoryEntry.interface";

export interface MaintenanceHistoryPage {
  entries: MaintenanceHistoryEntry[];
  hasNextPage: boolean;
  page: number;
}
