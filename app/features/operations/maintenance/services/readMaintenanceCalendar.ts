import type { EquipmentSupabaseClient } from "@/app/services/equipment/models/EquipmentSupabaseClient.type";
import { readEquipmentJobs } from "@/app/services/equipment/readEquipmentJobs";
import { readEquipmentReports } from "@/app/services/equipment/readEquipmentReports";
import { buildMonthRange } from "@/app/utils/equipment-months/buildMonthRange";
import type { MaintenanceCalendarRequest } from "../models/MaintenanceCalendarRequest.interface";
import type { MaintenanceRecords } from "../models/MaintenanceRecords.interface";

export const readMaintenanceCalendar = async (
  supabase: EquipmentSupabaseClient,
  { month, months, recent }: MaintenanceCalendarRequest
): Promise<MaintenanceRecords> => {
  if (months.includes(month)) {
    return recent;
  }

  const range = buildMonthRange(month);

  return {
    jobs: await readEquipmentJobs(supabase, range),
    reports: await readEquipmentReports(supabase, range),
  };
};
