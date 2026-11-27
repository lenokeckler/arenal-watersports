import { EQUIPMENT_CURRENCIES } from "@/app/constants";
import {
  MAINTENANCE_QUERY,
  MAINTENANCE_TAB,
} from "../constants/MaintenanceView.constants";
import type { MaintenanceFilters } from "../models/MaintenanceFilters.interface";
import type { MaintenanceHrefChanges } from "../models/MaintenanceHrefChanges.type";

export const buildMaintenanceViewQuery = (
  next: MaintenanceFilters,
  changes: MaintenanceHrefChanges
): URLSearchParams => {
  const query = new URLSearchParams();
  const isCalendar = next.tab === MAINTENANCE_TAB.CALENDAR;
  const keepsDay = !changes.month || Boolean(changes.day);
  const entries = [
    [MAINTENANCE_QUERY.TAB, !isCalendar && next.tab],
    [MAINTENANCE_QUERY.BAR, !isCalendar && next.bar],
    [
      MAINTENANCE_QUERY.CURRENCY,
      next.currency !== EQUIPMENT_CURRENCIES[0] &&
        next.currency,
    ],
    [MAINTENANCE_QUERY.MONTH, isCalendar && next.month],
    [
      MAINTENANCE_QUERY.DAY,
      isCalendar && keepsDay && next.day,
    ],
    [MAINTENANCE_QUERY.MACHINE, next.machineId],
  ] as const;

  entries.forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  return query;
};
