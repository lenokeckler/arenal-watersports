import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { requireBoardSupabase } from "./requireBoardSupabase";

const OPERATION =
  "read whether the category keeps condition photos";

export const readBoardCategoryHasPhotos = async (
  categoryId: string
): Promise<boolean> => {
  const supabase = await requireBoardSupabase();
  const { data, error } = await supabase
    .from("equipment_categories")
    .select("has_condition_photos")
    .eq("id", categoryId)
    .maybeSingle();
  throwIfSupabaseError(error, OPERATION);

  return data?.has_condition_photos ?? false;
};
