import { EQUIPMENT_QUERY } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { mapEquipmentJob } from "./mapEquipmentJob";
import type { EquipmentJob } from "./models/EquipmentJob.interface";
import type { EquipmentRecordFilter } from "./models/EquipmentRecordFilter.interface";
import type { EquipmentSupabaseClient } from "./models/EquipmentSupabaseClient.type";

export const readEquipmentJobs = async (
  supabase: EquipmentSupabaseClient,
  { before, since, unitId }: EquipmentRecordFilter = {}
): Promise<EquipmentJob[]> => {
  let query = supabase
    .from(EQUIPMENT_QUERY.JOB_TABLE)
    .select(EQUIPMENT_QUERY.JOB_COLUMNS)
    .order("performed_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (since) {
    query = query.gte("performed_at", since);
  }

  if (before) {
    query = query.lt("performed_at", before);
  }

  if (unitId) {
    query = query.eq("unit_id", unitId);
  }

  const { data, error } = await query;
  throwIfSupabaseError(error, EQUIPMENT_QUERY.LOAD_JOBS);

  return (data ?? []).map(mapEquipmentJob);
};
