import { CATEGORY_IMAGE } from "@/app/constants";
import type { RemoveCategoryImageObjectOptions } from "../models/RemoveCategoryImageObjectOptions.interface";

export const removeCategoryImageObject = async ({
  imagePath,
  supabase,
}: RemoveCategoryImageObjectOptions): Promise<boolean> => {
  const { error } = await supabase.storage
    .from(CATEGORY_IMAGE.BUCKET)
    .remove([imagePath]);

  return error === null;
};
