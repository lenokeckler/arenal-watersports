import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { UpdateCategoryRowOptions } from "../models/UpdateCategoryRowOptions.interface";

export const updateCategoryRow = async ({
  categoryId,
  buildRow,
  operation,
}: UpdateCategoryRowOptions): Promise<boolean> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const { data, error } = await supabase
    .from("equipment_categories")
    .update(buildRow(adminWorkerId))
    .eq("id", categoryId)
    .select("id")
    .maybeSingle();
  throwIfSupabaseError(error, operation);

  return Boolean(data);
};
