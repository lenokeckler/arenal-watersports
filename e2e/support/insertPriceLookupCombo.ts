import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_PRICE_LOOKUP_COMBO_QUANTITY } from "../constants/E2ePriceLookup.constants";
import type { PriceLookupComboSeed } from "../models/PriceLookupComboSeed.interface";

export const insertPriceLookupCombo = async (
  seed: PriceLookupComboSeed,
  workerId: string
): Promise<string> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data, error } = await supabase
    .from("combos")
    .insert({
      audience: seed.audience,
      created_by: workerId,
      name: seed.name,
      package_price_crc: seed.packagePriceCrc,
      package_price_usd: seed.packagePriceUsd,
      status: seed.status,
      updated_by: workerId,
    })
    .select("id")
    .single();
  throwIfSupabaseError(error, "insertPriceLookupCombo");
  if (!data) {
    throw new Error(
      `insertPriceLookupCombo: no row returned for ${seed.name}`
    );
  }

  const { error: itemError } = await supabase
    .from("combo_items")
    .insert({
      category_id: seed.categoryId,
      combo_id: data.id,
      quantity: E2E_PRICE_LOOKUP_COMBO_QUANTITY,
    });
  throwIfSupabaseError(
    itemError,
    "insertPriceLookupComboItem"
  );

  return data.id;
};
