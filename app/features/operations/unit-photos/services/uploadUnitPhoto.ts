import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  UNIT_PHOTOS_BUCKET,
  UNIT_PHOTOS_ERROR,
} from "../constants/UnitPhotos.constants";
import type { UnitPhotoUploadInput } from "../models/UnitPhotoUploadInput.interface";
import { buildPhotoPath } from "../utils/buildPhotoPath";

export const uploadUnitPhoto = async ({
  angle,
  file,
  unitId,
}: UnitPhotoUploadInput): Promise<void> => {
  const supabase = createBrowserSupabaseClient();
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error(UNIT_PHOTOS_ERROR.UPLOAD_PHOTO);
  }

  const storagePath = buildPhotoPath(unitId, angle);
  const { error: uploadError } = await supabase.storage
    .from(UNIT_PHOTOS_BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    throw new Error(UNIT_PHOTOS_ERROR.UPLOAD_PHOTO);
  }

  const { error: recordError } = await supabase
    .from("unit_condition_photos")
    .upsert(
      {
        angle,
        storage_path: storagePath,
        unit_id: unitId,
        uploaded_by: userData.user.id,
      },
      { onConflict: "unit_id,angle" }
    );
  throwIfSupabaseError(
    recordError,
    UNIT_PHOTOS_ERROR.RECORD_PHOTO
  );
};
