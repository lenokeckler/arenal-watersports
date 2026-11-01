import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { CATEGORY_TRACKING_MODE } from "@/app/features/administration/category-catalog/constants/CategoryTrackingMode.constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import {
  E2E_CATEGORY_TARIFF_AMOUNT_USD,
  E2E_CATEGORY_TARIFF_TYPE,
} from "../constants/E2eCategoryFixtures.constants";

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

  const { error: tariffDeleteError } = await supabase
    .from("tariffs")
    .delete()
    .eq("category_id", existingCategory.id);
  throwIfSupabaseError(
    tariffDeleteError,
    "removeCategoryWithRecords.deleteTariffs"
  );

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

export const addTariffToCategory = async (
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
    "addTariffToCategory.select"
  );

  if (!existingCategory) {
    throw new Error(
      `addTariffToCategory: no category named ${categoryName}`
    );
  }

  const { error: tariffError } = await supabase
    .from("tariffs")
    .insert({
      amount_usd: E2E_CATEGORY_TARIFF_AMOUNT_USD,
      category_id: existingCategory.id,
      created_by: E2E_ADMIN_ACCOUNT.workerId,
      type: E2E_CATEGORY_TARIFF_TYPE,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
    });
  throwIfSupabaseError(
    tariffError,
    "addTariffToCategory.insert"
  );
};
