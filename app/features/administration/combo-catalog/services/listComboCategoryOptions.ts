import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { COMBO_STATUS } from "../constants/ComboStatus.constants";
import type { ComboCategoryOption } from "../models/ComboCategoryOption.interface";

export const listComboCategoryOptions = async (): Promise<
  ComboCategoryOption[]
> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRows, error } = await supabase
    .from("equipment_categories")
    .select("id, name")
    .eq("status", COMBO_STATUS.ACTIVE)
    .order("name", { ascending: true });
  throwIfSupabaseError(error, "listComboCategoryOptions");

  return categoryRows ?? [];
};
