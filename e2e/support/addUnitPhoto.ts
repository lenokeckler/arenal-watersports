import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_UNIT_PHOTOS,
  E2E_UNIT_PHOTOS_ERROR,
} from "../constants/E2eUnitPhotos.constants";
import { buildE2ePhoto } from "./buildE2ePhoto";
import { failE2eOperation } from "./failE2eOperation";
import { readUnitId } from "./readUnitId";

export const addUnitPhoto = async (
  supabase: SupabaseClient,
  code: string,
  angle: string,
  workerId: string
): Promise<void> => {
  const unitId = await readUnitId(supabase, code);
  const storagePath = `${unitId}${E2E_UNIT_PHOTOS.PHOTO_PATH_SEPARATOR}${angle}`;
  const upload = await supabase.storage
    .from(E2E_UNIT_PHOTOS.BUCKET)
    .upload(storagePath, buildE2ePhoto(), {
      contentType: E2E_UNIT_PHOTOS.MIME_TYPE,
      upsert: true,
    });

  if (upload.error) {
    return failE2eOperation(
      E2E_UNIT_PHOTOS_ERROR.OPERATION_ADD,
      upload.error.message
    );
  }

  const record = await supabase
    .from(E2E_UNIT_PHOTOS.TABLE_PHOTOS)
    .upsert(
      {
        angle,
        storage_path: storagePath,
        unit_id: unitId,
        uploaded_by: workerId,
      },
      { onConflict: "unit_id,angle" }
    );

  if (record.error) {
    return failE2eOperation(
      E2E_UNIT_PHOTOS_ERROR.OPERATION_ADD,
      record.error.message
    );
  }

  return undefined;
};
