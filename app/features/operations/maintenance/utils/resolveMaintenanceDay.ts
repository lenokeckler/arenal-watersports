import { resolveSelectedDay } from "@/app/utils/equipment-months/resolveSelectedDay";
import type { NullableRef } from "@/app/types";
import { MAINTENANCE_QUERY } from "../constants/MaintenanceView.constants";
import type { MaintenanceData } from "../models/MaintenanceData.interface";
import type { MaintenanceSearchParams } from "../models/MaintenanceSearchParams.type";
import { matchesMachine } from "./matchesMachine";

export const resolveMaintenanceDay = (
  params: MaintenanceSearchParams,
  { calendar, month, today }: MaintenanceData,
  machineId: NullableRef<string>
): string =>
  resolveSelectedDay({
    entryDates: [...calendar.jobs, ...calendar.reports]
      .filter((entry) => matchesMachine(entry, machineId))
      .map((entry) => entry.date),
    month,
    requested: params[MAINTENANCE_QUERY.DAY],
    today,
  });
