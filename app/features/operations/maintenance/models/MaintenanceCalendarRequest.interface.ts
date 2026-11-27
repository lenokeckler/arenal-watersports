import type { MaintenanceRecords } from "./MaintenanceRecords.interface";

export interface MaintenanceCalendarRequest {
  month: string;
  months: string[];
  recent: MaintenanceRecords;
}
