import { UNIT_PHOTOS_BUCKET } from "@/app/constants";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_PHOTOS_ERROR } from "../constants/UnitPhotos.constants";
import type { UnitPhotoDeletion } from "../models/UnitPhotoDeletion.interface";
import type { UnitPhotoUploadProps } from "../models/UnitPhotoUploadProps.interface";

export const deleteUnitPhoto = async ({
  slot,
  unitId,
}: UnitPhotoUploadProps): Promise<UnitPhotoDeletion> => {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from("unit_condition_photos")
    .delete()
    .eq("unit_id", unitId)
    .eq("angle", slot.angle)
    .select("storage_path");
  throwIfSupabaseError(
    error,
    UNIT_PHOTOS_ERROR.DELETE_PHOTO
  );
  const paths = (data ?? []).map((row) => row.storage_path);

  if (paths.length === 0) {
    throw new Error(UNIT_PHOTOS_ERROR.DELETE_PHOTO);
  }

  const { data: removed, error: fileError } =
    await supabase.storage
      .from(UNIT_PHOTOS_BUCKET)
      .remove(paths);

  return {
    isFileRemoved:
      !fileError && removed?.length === paths.length,
  };
};
