import type { SupabaseClient } from "@supabase/supabase-js";
import { E2E_DISPATCH_SHEET_TABLE } from "../constants/E2eDispatchSheet.constants";
import {
  E2E_UNIT_PHOTOS,
  E2E_UNIT_PHOTOS_ERROR,
} from "../constants/E2eUnitPhotos.constants";
import { failE2eOperation } from "./failE2eOperation";

export const removeUnitPhotos = async (
  supabase: SupabaseClient,
  unitCodes: string[]
): Promise<void> => {
  const units = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select("id")
    .in("code", unitCodes);
  const unitIds = (units.data ?? []).map((unit) => unit.id);
  const photos = await supabase
    .from(E2E_UNIT_PHOTOS.TABLE_PHOTOS)
    .select("storage_path")
    .in("unit_id", unitIds);
  const paths = (photos.data ?? []).map(
    (row) => row.storage_path
  );
  const objects =
    paths.length > 0
      ? await supabase.storage
          .from(E2E_UNIT_PHOTOS.BUCKET)
          .remove(paths)
      : { error: null };
  const rows = await supabase
    .from(E2E_UNIT_PHOTOS.TABLE_PHOTOS)
    .delete()
    .in("unit_id", unitIds);
  const failure =
    units.error ??
    photos.error ??
    objects.error ??
    rows.error;

  if (failure) {
    return failE2eOperation(
      E2E_UNIT_PHOTOS_ERROR.OPERATION_REMOVE_PHOTOS,
      failure.message
    );
  }

  return undefined;
};
