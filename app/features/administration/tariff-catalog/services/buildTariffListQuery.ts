import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { TARIFF_CATEGORY_STATUS } from "../constants/TariffCategoryStatus.constants";

export const buildTariffListQuery = (
  supabase: ServerSupabaseClient
) =>
  supabase
    .from("equipment_categories")
    .select(
      "id, name, tariffs!tariffs_category_id_fkey(type, amount_usd, amount_crc)"
    )
    .eq("status", TARIFF_CATEGORY_STATUS.ACTIVE)
    .order("name", { ascending: true })
    .order("id", { ascending: true });
