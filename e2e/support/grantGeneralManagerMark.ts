import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_UNIT_PHOTOS,
  E2E_UNIT_PHOTOS_ERROR,
} from "../constants/E2eUnitPhotos.constants";
import { failE2eOperation } from "./failE2eOperation";
import { readSeededAdmin } from "./readSeededAdmin";

export const grantGeneralManagerMark = async (
  supabase: SupabaseClient,
  workerId: string
): Promise<void> => {
  const admin = await readSeededAdmin();
  const grant = await supabase
    .from(E2E_UNIT_PHOTOS.TABLE_MARKS)
    .upsert({
      granted_by: admin.id,
      mark: E2E_UNIT_PHOTOS.GENERAL_MANAGER_MARK,
      worker_id: workerId,
    });

  if (grant.error) {
    return failE2eOperation(
      E2E_UNIT_PHOTOS_ERROR.OPERATION_GRANT_MARK,
      grant.error.message
    );
  }

  return undefined;
};

export const removeGeneralManagerMark = async (
  supabase: SupabaseClient,
  workerId: string
): Promise<void> => {
  const removal = await supabase
    .from(E2E_UNIT_PHOTOS.TABLE_MARKS)
    .delete()
    .eq("worker_id", workerId)
    .eq("mark", E2E_UNIT_PHOTOS.GENERAL_MANAGER_MARK);

  if (removal.error) {
    return failE2eOperation(
      E2E_UNIT_PHOTOS_ERROR.OPERATION_REMOVE_MARK,
      removal.error.message
    );
  }

  return undefined;
};
