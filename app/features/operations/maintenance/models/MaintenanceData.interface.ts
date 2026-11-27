import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { MaintenanceMachine } from "./MaintenanceMachine.interface";
import type { MaintenanceOverview } from "./MaintenanceOverview.interface";
import type { MaintenanceRecords } from "./MaintenanceRecords.interface";

export interface MaintenanceData {
  calendar: MaintenanceRecords;
  calendarMonths: string[];
  jobs: EquipmentJob[];
  machines: MaintenanceMachine[];
  month: string;
  months: string[];
  overview: MaintenanceOverview;
  today: string;
}
