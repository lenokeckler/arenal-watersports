import { UNIT_PHOTOS_BUCKET } from "@/app/constants";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { UNIT_PHOTOS_ERROR } from "../constants/UnitPhotos.constants";
import type { UnitPhotoUploadInput } from "../models/UnitPhotoUploadInput.interface";
import { buildPhotoPath } from "../utils/buildPhotoPath";
import { readPreviousPhotoPath } from "./readPreviousPhotoPath";
import { readUploaderId } from "./readUploaderId";
import { recordUnitPhoto } from "./recordUnitPhoto";

export const uploadUnitPhoto = async ({
  angle,
  file,
  unitId,
}: UnitPhotoUploadInput): Promise<void> => {
  const supabase = createBrowserSupabaseClient();
  const userId = await readUploaderId(supabase);
  const previousPath = await readPreviousPhotoPath(
    supabase,
    unitId,
    angle
  );
  const bucket = supabase.storage.from(UNIT_PHOTOS_BUCKET);
  const storagePath = buildPhotoPath(
    unitId,
    angle,
    Date.now()
  );
  const { error } = await bucket.upload(storagePath, file, {
    contentType: file.type,
  });

  if (error) {
    throw new Error(UNIT_PHOTOS_ERROR.UPLOAD_PHOTO);
  }

  await recordUnitPhoto(supabase, {
    angle,
    storagePath,
    unitId,
    userId,
  });

  if (previousPath) {
    await bucket.remove([previousPath]);
  }
};
