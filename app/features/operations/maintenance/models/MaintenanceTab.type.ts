import type { MAINTENANCE_TAB } from "../constants/MaintenanceView.constants";

export type MaintenanceTab =
  (typeof MAINTENANCE_TAB)[keyof typeof MAINTENANCE_TAB];
