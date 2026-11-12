import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryImageRowUpdate } from "../models/CategoryImageRowUpdate.type";
import type { UpdateCategoryImagePathOptions } from "../models/UpdateCategoryImagePathOptions.interface";

export const updateCategoryImagePath = async ({
  adminWorkerId,
  categoryId,
  imagePath,
  supabase,
}: UpdateCategoryImagePathOptions): Promise<boolean> => {
  const row: CategoryImageRowUpdate = {
    image_path: imagePath,
    updated_by: adminWorkerId,
  };

  const { data, error } = await supabase
    .from("equipment_categories")
    .update(row)
    .eq("id", categoryId)
    .select("id")
    .maybeSingle();
  throwIfSupabaseError(error, "updateCategoryImagePath");

  return Boolean(data);
};
