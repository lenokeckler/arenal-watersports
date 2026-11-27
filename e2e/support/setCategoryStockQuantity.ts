import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import { findCategoryId } from "./categoryFixtures";

export const setCategoryStockQuantity = async (
  categoryName: string,
  quantity: number
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  const { error } = await supabase
    .from("equipment_stock")
    .upsert({
      category_id: await findCategoryId(categoryName),
      quantity_available: quantity,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
    });
  throwIfSupabaseError(error, "setCategoryStockQuantity");
};
