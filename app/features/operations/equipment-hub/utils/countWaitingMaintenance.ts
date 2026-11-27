import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { WaitingMaintenanceRow } from "../models/WaitingMaintenanceRow.interface";

export const countWaitingMaintenance = (
  rows: WaitingMaintenanceRow[]
): number =>
  rows.filter(
    (row) =>
      row.oil_warning ||
      row.status !== INVENTORY_UNIT_STATUS.AVAILABLE
  ).length;
