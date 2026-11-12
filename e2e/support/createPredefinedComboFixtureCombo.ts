import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";

export const createPredefinedComboFixtureCombo = async (
  supabase: SupabaseClient<Database>,
  workerId: string,
  comboId: string,
  comboName: string
): Promise<void> => {
  const { error } = await supabase.from("combos").insert({
    audience: E2E_PREDEFINED_COMBO_FIXTURE.AUDIENCE,
    created_by: workerId,
    id: comboId,
    name: comboName,
    package_price_crc:
      E2E_PREDEFINED_COMBO_FIXTURE.PACKAGE_PRICE_CRC,
    status: E2E_PREDEFINED_COMBO_FIXTURE.STATUS,
    updated_by: workerId,
  });
  if (error) {
    throw error;
  }
};

export const createPredefinedComboFixtureComboItem = async (
  supabase: SupabaseClient<Database>,
  comboId: string,
  categoryId: string
): Promise<void> => {
  const { error } = await supabase
    .from("combo_items")
    .insert({
      category_id: categoryId,
      combo_id: comboId,
      quantity: E2E_PREDEFINED_COMBO_FIXTURE.QUANTITY,
    });
  if (error) {
    throw error;
  }
};
