import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const removeCategoryWithStock = async (
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();
  const { data: category, error: selectError } =
    await supabase
      .from("equipment_categories")
      .select("id")
      .eq("name", categoryName)
      .maybeSingle();
  throwIfSupabaseError(
    selectError,
    "removeCategoryWithStock.select"
  );
  if (!category) {
    return;
  }

  const { error: movementsError } = await supabase
    .from("equipment_stock_movements")
    .delete()
    .eq("category_id", category.id);
  throwIfSupabaseError(
    movementsError,
    "removeCategoryWithStock.movements"
  );

  const { error: stockError } = await supabase
    .from("equipment_stock")
    .delete()
    .eq("category_id", category.id);
  throwIfSupabaseError(
    stockError,
    "removeCategoryWithStock.stock"
  );

  const { error: categoryError } = await supabase
    .from("equipment_categories")
    .delete()
    .eq("id", category.id);
  throwIfSupabaseError(
    categoryError,
    "removeCategoryWithStock.category"
  );
};
