import type { PendingDispatchSupabaseClient } from "@/app/services/operations/models/PendingDispatchSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  UNIT_PHOTOS_ERROR,
  UNIT_PHOTO_MANAGER_MARK,
} from "../constants/UnitPhotos.constants";

export const canManageUnitPhotos = async (
  supabase: PendingDispatchSupabaseClient
): Promise<boolean> => {
  const [mark, admin] = await Promise.all([
    supabase.rpc("has_mark", {
      target: UNIT_PHOTO_MANAGER_MARK,
    }),
    supabase.rpc("is_admin"),
  ]);
  throwIfSupabaseError(
    mark.error,
    UNIT_PHOTOS_ERROR.CHECK_MARK
  );
  throwIfSupabaseError(
    admin.error,
    UNIT_PHOTOS_ERROR.CHECK_MARK
  );

  return Boolean(mark.data) || Boolean(admin.data);
};
