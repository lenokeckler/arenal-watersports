import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_UNIT_PHOTOS,
  E2E_UNIT_PHOTOS_ERROR,
} from "../constants/E2eUnitPhotos.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { UnitPhotoRecord } from "./models/DispatchSheetFixture.interface";
import { readUnitId } from "./readUnitId";

export const readUnitPhotos = async (
  supabase: SupabaseClient,
  code: string
): Promise<UnitPhotoRecord[]> => {
  const unitId = await readUnitId(supabase, code);
  const photos = await supabase
    .from(E2E_UNIT_PHOTOS.TABLE_PHOTOS)
    .select("angle, storage_path, uploaded_by")
    .eq("unit_id", unitId);

  if (photos.error) {
    return failE2eOperation(
      E2E_UNIT_PHOTOS_ERROR.OPERATION_READ,
      photos.error.message
    );
  }

  return (photos.data ?? []).map((row) => ({
    angle: row.angle,
    storagePath: row.storage_path,
    uploadedBy: row.uploaded_by,
  }));
};
