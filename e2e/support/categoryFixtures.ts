import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { CATEGORY_TRACKING_MODE } from "@/app/components/category-catalog/constants/CategoryTrackingMode.constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import { DEFAULT_CATEGORY_FIXTURE_BEHAVIOR } from "../constants/E2eCategoryFixtures.constants";
import type { CategoryFixtureBehavior } from "../models/CategoryFixtureBehavior.interface";

export const seedCategoryWithBehavior = async (
  categoryName: string,
  overrides: Partial<CategoryFixtureBehavior> = {}
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();
  const behavior = {
    ...DEFAULT_CATEGORY_FIXTURE_BEHAVIOR,
    ...overrides,
  };

  const { error: deleteError } = await supabase
    .from("equipment_categories")
    .delete()
    .eq("name", categoryName);
  throwIfSupabaseError(
    deleteError,
    "seedCategoryWithBehavior.delete"
  );

  const { error: insertError } = await supabase
    .from("equipment_categories")
    .insert({
      created_by: E2E_ADMIN_ACCOUNT.workerId,
      has_motor: behavior.hasMotor,
      name: categoryName,
      tracking_mode: behavior.trackingMode,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
      usage_metric: behavior.usageMetric,
    });
  throwIfSupabaseError(
    insertError,
    "seedCategoryWithBehavior.insert"
  );
};

export const seedDeletableCategory = (
  categoryName: string
): Promise<void> => seedCategoryWithBehavior(categoryName);

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

export const findCategoryId = async (
  categoryName: string
): Promise<string> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data: category, error } = await supabase
    .from("equipment_categories")
    .select("id")
    .eq("name", categoryName)
    .maybeSingle();
  throwIfSupabaseError(error, "findCategoryId");
  if (!category) {
    throw new Error(
      `findCategoryId: no category named ${categoryName}`
    );
  }

  return category.id;
};
