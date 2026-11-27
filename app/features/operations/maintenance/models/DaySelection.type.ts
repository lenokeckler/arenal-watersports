import type { MaintenanceFilters } from "./MaintenanceFilters.interface";

export type DaySelection = Pick<
  MaintenanceFilters,
  "day" | "machineId"
>;
