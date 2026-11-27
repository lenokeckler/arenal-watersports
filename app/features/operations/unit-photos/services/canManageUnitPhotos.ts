import type { PendingDispatchSupabaseClient } from "@/app/services/operations/models/PendingDispatchSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_PHOTOS_ERROR } from "../constants/UnitPhotos.constants";

export const canManageUnitPhotos = async (
  supabase: PendingDispatchSupabaseClient
): Promise<boolean> => {
  const { data, error } = await supabase.rpc(
    "can_manage_unit_photos"
  );
  throwIfSupabaseError(
    error,
    UNIT_PHOTOS_ERROR.CHECK_PERMISSION
  );

  return Boolean(data);
};
