import { MAINTENANCE_OIL_STATE } from "../constants/Maintenance.constants";
import type { MaintenanceUnit } from "../models/MaintenanceUnit.interface";

export const getOilState = (
  unit: MaintenanceUnit
): keyof typeof MAINTENANCE_OIL_STATE =>
  (unit.oilOverage ?? 0) > 0
    ? MAINTENANCE_OIL_STATE.PASSED
    : MAINTENANCE_OIL_STATE.REACHED;
