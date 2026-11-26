import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { TARIFF_CATEGORY_SELECT } from "../constants/TariffCategorySelect.constants";
import { TARIFF_CATEGORY_STATUS } from "../constants/TariffCategoryStatus.constants";

export const buildTariffForEditQuery = (
  supabase: ServerSupabaseClient,
  categoryId: string
) =>
  supabase
    .from("equipment_categories")
    .select(TARIFF_CATEGORY_SELECT)
    .eq("id", categoryId)
    .eq("status", TARIFF_CATEGORY_STATUS.ACTIVE)
    .maybeSingle();
