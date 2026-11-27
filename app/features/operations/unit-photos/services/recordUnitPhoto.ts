import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_PHOTOS_ERROR } from "../constants/UnitPhotos.constants";
import type { UnitPhotoBrowserClient } from "../models/UnitPhotoBrowserClient.type";
import type { UnitPhotoRecord } from "../models/UnitPhotoRecord.interface";

export const recordUnitPhoto = async (
  supabase: UnitPhotoBrowserClient,
  { angle, storagePath, unitId, userId }: UnitPhotoRecord
): Promise<void> => {
  const { error } = await supabase
    .from("unit_condition_photos")
    .upsert(
      {
        angle,
        storage_path: storagePath,
        unit_id: unitId,
        uploaded_by: userId,
      },
      { onConflict: "unit_id,angle" }
    );
  throwIfSupabaseError(
    error,
    UNIT_PHOTOS_ERROR.RECORD_PHOTO
  );
};
