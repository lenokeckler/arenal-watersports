import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { readEquipmentReports } from "@/app/services/equipment/readEquipmentReports";
import { readFirstReportDate } from "@/app/services/equipment/readFirstReportDate";
import { readPendingEquipmentReports } from "@/app/services/equipment/readPendingEquipmentReports";
import { listCalendarMonths } from "@/app/utils/equipment-months/listCalendarMonths";
import { resolveHistoryWindow } from "@/app/utils/equipment-months/resolveHistoryWindow";
import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import type { DamageOverview } from "../models/DamageOverview.interface";
import { readCalendarReports } from "./readCalendarReports";

export const getDamageOverview = async (
  requestedMonth?: string | string[]
): Promise<DamageOverview> => {
  const supabase = await getOperationsSupabaseClient();
  const { currentMonth, months, since, today } =
    resolveHistoryWindow();
  const [recent, pending, firstReport] = await Promise.all([
    readEquipmentReports(supabase, { since }),
    readPendingEquipmentReports(supabase),
    readFirstReportDate(supabase),
  ]);
  const calendarMonths = listCalendarMonths(
    months,
    firstReport
  );
  const month =
    resolveQueryChoice(requestedMonth, calendarMonths) ??
    currentMonth;

  return {
    calendarMonths,
    calendarReports: await readCalendarReports(supabase, {
      month,
      recent,
      recentMonths: months,
    }),
    month,
    pending,
    recent,
    today,
  };
};
