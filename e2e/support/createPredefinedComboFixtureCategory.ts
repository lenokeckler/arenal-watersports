import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";

const createCategoryStock = async (
  supabase: SupabaseClient<Database>,
  workerId: string,
  categoryId: string
): Promise<void> => {
  const { error } = await supabase
    .from("equipment_stock")
    .insert({
      category_id: categoryId,
      quantity_available:
        E2E_PREDEFINED_COMBO_FIXTURE.STOCK_QUANTITY,
      updated_by: workerId,
    });
  if (error) {
    throw error;
  }
};

export const createPredefinedComboFixtureCategory = async (
  supabase: SupabaseClient<Database>,
  workerId: string,
  categoryId: string,
  categoryName: string
): Promise<void> => {
  const { error } = await supabase
    .from("equipment_categories")
    .insert({
      created_by: workerId,
      default_duration_minutes:
        E2E_PREDEFINED_COMBO_FIXTURE.DURATION_MINUTES,
      id: categoryId,
      is_reservable: true,
      name: categoryName,
      status: E2E_PREDEFINED_COMBO_FIXTURE.STATUS,
      tracking_mode:
        E2E_PREDEFINED_COMBO_FIXTURE.TRACKING_MODE,
      units_are_interchangeable: true,
      updated_by: workerId,
    });
  if (error) {
    throw error;
  }
  await createCategoryStock(supabase, workerId, categoryId);
};
