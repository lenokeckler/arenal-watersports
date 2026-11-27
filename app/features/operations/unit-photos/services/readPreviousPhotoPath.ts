import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_PHOTOS_ERROR } from "../constants/UnitPhotos.constants";
import type { UnitPhotoBrowserClient } from "../models/UnitPhotoBrowserClient.type";
import type { UnitPhotoSlot } from "../models/UnitPhotoSlot.interface";

export const readPreviousPhotoPath = async (
  supabase: UnitPhotoBrowserClient,
  unitId: string,
  angle: UnitPhotoSlot["angle"]
): Promise<NullableRef<string>> => {
  const { data, error } = await supabase
    .from("unit_condition_photos")
    .select("storage_path")
    .eq("unit_id", unitId)
    .eq("angle", angle)
    .maybeSingle();
  throwIfSupabaseError(
    error,
    UNIT_PHOTOS_ERROR.READ_PREVIOUS
  );

  return data ? data.storage_path : null;
};
