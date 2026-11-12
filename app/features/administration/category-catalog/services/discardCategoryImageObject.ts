import type { DiscardCategoryImageObjectOptions } from "../models/DiscardCategoryImageObjectOptions.interface";
import { removeCategoryImageObject } from "./removeCategoryImageObject";

export const discardCategoryImageObject = async ({
  imagePath,
  supabase,
}: DiscardCategoryImageObjectOptions): Promise<boolean> => {
  if (!imagePath) {
    return false;
  }

  const wasRemoved = await removeCategoryImageObject({
    imagePath,
    supabase,
  });

  return !wasRemoved;
};
