import { DAY_PANEL_OPEN } from "@/app/components/day-panel/constants/DayPanel.constants";
import { PATHS } from "@/app/constants";
import { MAINTENANCE_QUERY } from "../constants/MaintenanceView.constants";
import type { MaintenanceFilters } from "../models/MaintenanceFilters.interface";
import type { MaintenanceHrefChanges } from "../models/MaintenanceHrefChanges.type";
import { buildMaintenanceViewQuery } from "./buildMaintenanceViewQuery";

export const buildMaintenanceHref = (
  filters: MaintenanceFilters,
  changes: MaintenanceHrefChanges = {}
): string => {
  const query = buildMaintenanceViewQuery(
    { ...filters, ...changes },
    changes
  );

  if (changes.isDayOpen) {
    query.set(DAY_PANEL_OPEN.PARAM, DAY_PANEL_OPEN.VALUE);
  }

  if (changes.showAttention) {
    query.set(
      MAINTENANCE_QUERY.ATTEND,
      MAINTENANCE_QUERY.ATTEND_OPEN
    );
  }

  return `${PATHS.OPERATIONS.MAINTENANCE}?${query.toString()}`;
};
