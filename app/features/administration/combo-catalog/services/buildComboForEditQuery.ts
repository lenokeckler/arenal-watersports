import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";

export const buildComboForEditQuery = (
  supabase: ServerSupabaseClient,
  comboId: string
) =>
  supabase
    .from("combos")
    .select(
      "id, name, audience, package_price_crc, package_price_usd, combo_items(category_id, quantity)"
    )
    .eq("id", comboId)
    .maybeSingle();
