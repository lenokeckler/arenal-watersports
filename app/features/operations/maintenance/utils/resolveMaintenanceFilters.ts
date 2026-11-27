import { DAY_PANEL_OPEN } from "@/app/components/day-panel/constants/DayPanel.constants";
import { EQUIPMENT_CURRENCIES } from "@/app/constants";
import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import {
  MAINTENANCE_QUERY,
  MAINTENANCE_TAB,
} from "../constants/MaintenanceView.constants";
import type { MaintenanceData } from "../models/MaintenanceData.interface";
import type { MaintenanceFilters } from "../models/MaintenanceFilters.interface";
import type { MaintenanceSearchParams } from "../models/MaintenanceSearchParams.type";
import { resolveMachineId } from "./resolveMachineId";
import { resolveMaintenanceDay } from "./resolveMaintenanceDay";

export const resolveMaintenanceFilters = (
  params: MaintenanceSearchParams,
  data: MaintenanceData
): MaintenanceFilters => {
  const machineId = resolveMachineId(
    params[MAINTENANCE_QUERY.MACHINE],
    data.machines
  );
  const pick = <Choice extends string>(
    key: string,
    choices: readonly Choice[]
  ) => resolveQueryChoice(params[key], choices);

  return {
    bar:
      pick(MAINTENANCE_QUERY.BAR, data.months) ??
      data.months.at(-1) ??
      data.month,
    currency:
      pick(
        MAINTENANCE_QUERY.CURRENCY,
        EQUIPMENT_CURRENCIES
      ) ?? EQUIPMENT_CURRENCIES[0],
    day: resolveMaintenanceDay(params, data, machineId),
    isDayOpen:
      params[DAY_PANEL_OPEN.PARAM] === DAY_PANEL_OPEN.VALUE,
    machineId,
    month: data.month,
    showAttention:
      params[MAINTENANCE_QUERY.ATTEND] ===
      MAINTENANCE_QUERY.ATTEND_OPEN,
    tab:
      pick(
        MAINTENANCE_QUERY.TAB,
        Object.values(MAINTENANCE_TAB)
      ) ?? MAINTENANCE_TAB.CALENDAR,
  };
};
