import { EQUIPMENT_QUERY } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { EquipmentSupabaseClient } from "./models/EquipmentSupabaseClient.type";

export const readFirstJobDate = async (
  supabase: EquipmentSupabaseClient
): Promise<NullableRef<string>> => {
  const { data, error } = await supabase
    .from(EQUIPMENT_QUERY.JOB_TABLE)
    .select("performed_at")
    .order("performed_at", { ascending: true })
    .limit(1);
  throwIfSupabaseError(error, EQUIPMENT_QUERY.LOAD_JOBS);
  const [first] = data ?? [];

  return first ? first.performed_at : null;
};
