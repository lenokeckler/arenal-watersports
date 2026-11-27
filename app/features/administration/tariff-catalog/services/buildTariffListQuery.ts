import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { TARIFF_CATEGORY_SELECT } from "../constants/TariffCategorySelect.constants";
import { TARIFF_CATEGORY_STATUS } from "../constants/TariffCategoryStatus.constants";

export const buildTariffListQuery = (
  supabase: ServerSupabaseClient
) =>
  supabase
    .from("equipment_categories")
    .select(TARIFF_CATEGORY_SELECT)
    .eq("status", TARIFF_CATEGORY_STATUS.ACTIVE)
    .order("name", { ascending: true })
    .order("id", { ascending: true });
