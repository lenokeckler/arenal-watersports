import { readEquipmentReports } from "@/app/services/equipment/readEquipmentReports";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";
import type { EquipmentSupabaseClient } from "@/app/services/equipment/models/EquipmentSupabaseClient.type";
import { buildMonthRange } from "@/app/utils/equipment-months/buildMonthRange";
import type { CalendarReportsRequest } from "../models/CalendarReportsRequest.interface";

export const readCalendarReports = async (
  supabase: EquipmentSupabaseClient,
  { month, recent, recentMonths }: CalendarReportsRequest
): Promise<EquipmentReport[]> =>
  recentMonths.includes(month)
    ? recent
    : await readEquipmentReports(
        supabase,
        buildMonthRange(month)
      );
