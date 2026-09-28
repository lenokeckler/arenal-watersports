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
