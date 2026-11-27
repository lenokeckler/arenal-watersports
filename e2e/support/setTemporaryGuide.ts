import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_UNIT_PHOTOS,
  E2E_UNIT_PHOTOS_ERROR,
} from "../constants/E2eUnitPhotos.constants";
import { failE2eOperation } from "./failE2eOperation";

export const setTemporaryGuide = async (
  supabase: SupabaseClient,
  workerId: string,
  isTemporary: boolean
): Promise<void> => {
  const change = await supabase
    .from(E2E_UNIT_PHOTOS.TABLE_WORKERS)
    .update(
      isTemporary
        ? {
            expires_at: new Date(
              Date.now() + E2E_UNIT_PHOTOS.GUIDE_LIFETIME_MS
            ).toISOString(),
            is_external_guide: true,
            national_id: E2E_UNIT_PHOTOS.GUIDE_NATIONAL_ID,
          }
        : {
            expires_at: null,
            is_external_guide: false,
            national_id: null,
          }
    )
    .eq("id", workerId);

  if (change.error) {
    return failE2eOperation(
      E2E_UNIT_PHOTOS_ERROR.OPERATION_SET_GUIDE,
      change.error.message
    );
  }

  return undefined;
};
