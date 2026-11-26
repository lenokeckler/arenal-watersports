import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { PRICE_LOOKUP_STATUS } from "../constants/PriceLookupStatus.constants";

export const buildPriceLookupTariffQuery = (
  supabase: ServerSupabaseClient
) =>
  supabase
    .from("equipment_categories")
    .select(
      "id, name, tariffs!tariffs_category_id_fkey(type, amount_usd, amount_crc)"
    )
    .eq("status", PRICE_LOOKUP_STATUS.ACTIVE)
    .order("name", { ascending: true })
    .order("id", { ascending: true });
