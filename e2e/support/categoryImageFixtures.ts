import { CATEGORY_IMAGE, STRING } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  findCategoryId,
  removeDeletableCategory,
} from "./categoryFixtures";

export const readCategoryImagePath = async (
  categoryName: string
): Promise<NullableRef<string>> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data: category, error } = await supabase
    .from("equipment_categories")
    .select("image_path")
    .eq("name", categoryName)
    .single();
  throwIfSupabaseError(error, "readCategoryImagePath");

  return category?.image_path ?? null;
};

const listCategoryImageObjects = async (
  categoryId: string
): Promise<string[]> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data: objects, error } = await supabase.storage
    .from(CATEGORY_IMAGE.BUCKET)
    .list(categoryId);
  if (error) {
    throw error;
  }

  return (objects ?? []).map(
    (object) => `${categoryId}${STRING.SLASH}${object.name}`
  );
};

export const removeCategoryWithImages = async (
  categoryName: string
): Promise<void> => {
  const categoryId = await findCategoryId(categoryName);
  const objectPaths =
    await listCategoryImageObjects(categoryId);

  if (objectPaths.length > 0) {
    const { error } =
      await createServiceRoleSupabaseClient()
        .storage.from(CATEGORY_IMAGE.BUCKET)
        .remove(objectPaths);
    if (error) {
      throw error;
    }
  }

  await removeDeletableCategory(categoryName);
};
