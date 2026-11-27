import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_OCCUPIABLE_CATEGORY_COLUMNS } from "../constants/ExtraQuery.constants";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { ExtraOccupiableCategory } from "../models/ExtraOccupiableCategory.interface";

export const getOccupiableCategories = async (): Promise<
  ExtraOccupiableCategory[]
> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRows, error } = await supabase
    .from("equipment_categories")
    .select(EXTRA_OCCUPIABLE_CATEGORY_COLUMNS)
    .eq(
      "tracking_mode",
      INVENTORY_TRACKING_MODE.BY_QUANTITY
    )
    .eq("status", EXTRA_STATUS.ACTIVE)
    .order("name", { ascending: true });
  throwIfSupabaseError(error, "getOccupiableCategories");

  return categoryRows ?? [];
};
