import type { EquipmentSupabaseClient } from "@/app/services/equipment/models/EquipmentSupabaseClient.type";
import { readEquipmentJobs } from "@/app/services/equipment/readEquipmentJobs";
import { readEquipmentReports } from "@/app/services/equipment/readEquipmentReports";
import { readFirstJobDate } from "@/app/services/equipment/readFirstJobDate";
import { readFirstReportDate } from "@/app/services/equipment/readFirstReportDate";
import type { MaintenanceActivity } from "../models/MaintenanceActivity.interface";
import { findEarliestDate } from "../utils/findEarliestDate";

export const readMaintenanceActivity = async (
  supabase: EquipmentSupabaseClient,
  since: string
): Promise<MaintenanceActivity> => {
  const [jobs, reports, firstJob, firstReport] =
    await Promise.all([
      readEquipmentJobs(supabase, { since }),
      readEquipmentReports(supabase, { since }),
      readFirstJobDate(supabase),
      readFirstReportDate(supabase),
    ]);

  return {
    firstDate: findEarliestDate([firstJob, firstReport]),
    recent: { jobs, reports },
  };
};
