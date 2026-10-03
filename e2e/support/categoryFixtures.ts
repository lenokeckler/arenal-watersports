import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { CATEGORY_TRACKING_MODE } from "@/app/components/category-catalog/constants/CategoryTrackingMode.constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";

export const seedDeletableCategory = async (
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  const { error: deleteError } = await supabase
    .from("equipment_categories")
    .delete()
    .eq("name", categoryName);
  throwIfSupabaseError(
    deleteError,
    "seedDeletableCategory.delete"
  );

  const { error: insertError } = await supabase
    .from("equipment_categories")
    .insert({
      created_by: E2E_ADMIN_ACCOUNT.workerId,
      name: categoryName,
      tracking_mode: CATEGORY_TRACKING_MODE.BY_UNIT,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
    });
  throwIfSupabaseError(
    insertError,
    "seedDeletableCategory.insert"
  );
};

export const removeDeletableCategory = async (
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  const { error } = await supabase
    .from("equipment_categories")
    .delete()
    .eq("name", categoryName);
  throwIfSupabaseError(error, "removeDeletableCategory");
};

export const removeCategoryWithRecords = async (
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data: existingCategory, error: selectError } =
    await supabase
      .from("equipment_categories")
      .select("id")
      .eq("name", categoryName)
      .maybeSingle();
  throwIfSupabaseError(
    selectError,
    "removeCategoryWithRecords.select"
  );

  if (!existingCategory) {
    return;
  }

  const { error: stockDeleteError } = await supabase
    .from("equipment_stock")
    .delete()
    .eq("category_id", existingCategory.id);
  throwIfSupabaseError(
    stockDeleteError,
    "removeCategoryWithRecords.deleteStock"
  );

  const { error: categoryDeleteError } = await supabase
    .from("equipment_categories")
    .delete()
    .eq("id", existingCategory.id);
  throwIfSupabaseError(
    categoryDeleteError,
    "removeCategoryWithRecords.deleteCategory"
  );
};

export const seedCategoryWithRecords = async (
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  await removeCategoryWithRecords(categoryName);

  const { data: insertedCategory, error: insertError } =
    await supabase
      .from("equipment_categories")
      .insert({
        created_by: E2E_ADMIN_ACCOUNT.workerId,
        name: categoryName,
        tracking_mode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
        updated_by: E2E_ADMIN_ACCOUNT.workerId,
      })
      .select("id")
      .single();
  throwIfSupabaseError(
    insertError,
    "seedCategoryWithRecords.insertCategory"
  );
  if (!insertedCategory) {
    throw new Error(
      "seedCategoryWithRecords: insert returned no row"
    );
  }

  const { error: stockError } = await supabase
    .from("equipment_stock")
    .insert({
      category_id: insertedCategory.id,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
    });
  throwIfSupabaseError(
    stockError,
    "seedCategoryWithRecords.insertStock"
  );
};
