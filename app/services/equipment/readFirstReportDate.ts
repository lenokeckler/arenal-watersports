import { EQUIPMENT_QUERY } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { toCostaRicaDate } from "@/app/utils/equipment-months/toCostaRicaDate";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { EquipmentSupabaseClient } from "./models/EquipmentSupabaseClient.type";

export const readFirstReportDate = async (
  supabase: EquipmentSupabaseClient
): Promise<NullableRef<string>> => {
  const { data, error } = await supabase
    .from(EQUIPMENT_QUERY.DAMAGE_TABLE)
    .select("created_at")
    .order("created_at", { ascending: true })
    .limit(1);
  throwIfSupabaseError(error, EQUIPMENT_QUERY.LOAD_DAMAGE);
  const [first] = data ?? [];

  return first ? toCostaRicaDate(first.created_at) : null;
};
