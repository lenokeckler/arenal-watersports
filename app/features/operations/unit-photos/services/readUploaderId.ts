import { UNIT_PHOTOS_ERROR } from "../constants/UnitPhotos.constants";
import type { UnitPhotoBrowserClient } from "../models/UnitPhotoBrowserClient.type";

export const readUploaderId = async (
  supabase: UnitPhotoBrowserClient
): Promise<string> => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new Error(UNIT_PHOTOS_ERROR.UPLOAD_PHOTO);
  }

  return data.user.id;
};
