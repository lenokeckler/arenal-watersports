import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";

export const isOccupiableCategory = async (
  supabase: ServerSupabaseClient,
  categoryId: string
): Promise<boolean> => {
  const { data: categoryRow, error } = await supabase
    .from("equipment_categories")
    .select("id")
    .eq("id", categoryId)
    .eq(
      "tracking_mode",
      INVENTORY_TRACKING_MODE.BY_QUANTITY
    )
    .eq("status", EXTRA_STATUS.ACTIVE)
    .maybeSingle();
  throwIfSupabaseError(error, "isOccupiableCategory");

  return categoryRow !== null;
};
