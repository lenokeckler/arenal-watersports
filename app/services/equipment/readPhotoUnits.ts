import { PHOTO_UNIT_QUERY } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { mapPhotoUnit } from "./mapPhotoUnit";
import type { EquipmentSupabaseClient } from "./models/EquipmentSupabaseClient.type";
import type { PhotoUnit } from "./models/PhotoUnit.interface";

export const readPhotoUnits = async (
  supabase: EquipmentSupabaseClient
): Promise<PhotoUnit[]> => {
  const { data, error } = await supabase
    .from("equipment_units")
    .select(PHOTO_UNIT_QUERY.COLUMNS)
    .eq("category.has_condition_photos", true)
    .neq("status", "decommissioned")
    .order("code");
  throwIfSupabaseError(error, PHOTO_UNIT_QUERY.LOAD);

  return (data ?? []).map(mapPhotoUnit);
};
