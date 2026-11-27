import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { PRICE_LOOKUP_STATUS } from "../constants/PriceLookupStatus.constants";

export const buildPriceLookupComboQuery = (
  supabase: ServerSupabaseClient
) =>
  supabase
    .from("combos")
    .select(
      "id, name, audience, package_price_crc, package_price_usd, combo_items(quantity, equipment_categories!combo_items_category_id_fkey(name))"
    )
    .eq("status", PRICE_LOOKUP_STATUS.ACTIVE)
    .order("name", { ascending: true })
    .order("id", { ascending: true });
