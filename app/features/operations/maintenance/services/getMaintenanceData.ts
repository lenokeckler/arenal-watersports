import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { listCalendarMonths } from "@/app/utils/equipment-months/listCalendarMonths";
import { resolveHistoryWindow } from "@/app/utils/equipment-months/resolveHistoryWindow";
import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import type { MaintenanceData } from "../models/MaintenanceData.interface";
import { getMaintenanceOverview } from "./getMaintenanceOverview";
import { readMaintenanceActivity } from "./readMaintenanceActivity";
import { readMaintenanceCalendar } from "./readMaintenanceCalendar";
import { readMaintenanceMachines } from "./readMaintenanceMachines";

export const getMaintenanceData = async (
  requestedMonth?: string | string[]
): Promise<MaintenanceData> => {
  const supabase = await getOperationsSupabaseClient();
  const { currentMonth, months, since, today } =
    resolveHistoryWindow();
  const [overview, activity, machines] = await Promise.all([
    getMaintenanceOverview(),
    readMaintenanceActivity(supabase, since),
    readMaintenanceMachines(supabase),
  ]);
  const calendarMonths = listCalendarMonths(
    months,
    activity.firstDate
  );
  const month =
    resolveQueryChoice(requestedMonth, calendarMonths) ??
    currentMonth;

  return {
    calendar: await readMaintenanceCalendar(supabase, {
      month,
      months,
      recent: activity.recent,
    }),
    calendarMonths,
    jobs: activity.recent.jobs,
    machines,
    month,
    months,
    overview,
    today,
  };
};
