import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";

export const buildComboListQuery = (
  supabase: ServerSupabaseClient
) =>
  supabase
    .from("combos")
    .select(
      "id, name, status, audience, package_price_crc, package_price_usd, combo_items(quantity, equipment_categories!combo_items_category_id_fkey(name))"
    )
    .order("name", { ascending: true })
    .order("id", { ascending: true });
