import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryImagePathRow } from "../models/CategoryImagePathRow.type";
import type { CategoryImageRowAccessOptions } from "../models/CategoryImageRowAccessOptions.interface";

export const readCategoryImagePath = async ({
  categoryId,
  supabase,
}: CategoryImageRowAccessOptions): Promise<
  NullableRef<CategoryImagePathRow>
> => {
  const { data, error } = await supabase
    .from("equipment_categories")
    .select("image_path")
    .eq("id", categoryId)
    .maybeSingle();
  throwIfSupabaseError(error, "readCategoryImagePath");

  return data;
};
