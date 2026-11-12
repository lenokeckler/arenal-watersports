import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import type { PredefinedComboFixtureResources } from "../models/PredefinedComboFixtureResources.interface";

export const deletePredefinedComboRecords = async (
  supabase: SupabaseClient<Database>,
  comboId: PredefinedComboFixtureResources["comboId"]
): Promise<unknown[]> => {
  const { error: itemError } = await supabase
    .from("combo_items")
    .delete()
    .eq("combo_id", comboId);
  const { error: comboError } = await supabase
    .from("combos")
    .delete()
    .eq("id", comboId);
  return [itemError, comboError].filter(Boolean);
};

export const deletePredefinedComboCategory = async (
  supabase: SupabaseClient<Database>,
  categoryId: PredefinedComboFixtureResources["categoryId"]
): Promise<unknown[]> => {
  const { error: stockError } = await supabase
    .from("equipment_stock")
    .delete()
    .eq("category_id", categoryId);
  const { error: categoryError } = await supabase
    .from("equipment_categories")
    .delete()
    .eq("id", categoryId);
  return [stockError, categoryError].filter(Boolean);
};
