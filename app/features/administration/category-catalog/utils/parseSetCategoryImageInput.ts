import { TYPE_OF } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { parseCategoryImagePath } from "@/app/utils/category-image/parseCategoryImagePath";
import type { SetCategoryImageInput } from "../models/SetCategoryImageInput.interface";
import { parseCategoryImageCategoryId } from "./parseCategoryImageCategoryId";

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === TYPE_OF.OBJECT &&
  value !== null &&
  !Array.isArray(value);

export const parseSetCategoryImageInput = (
  input: unknown
): NullableRef<SetCategoryImageInput> => {
  if (!isRecord(input)) {
    return null;
  }

  const categoryId = parseCategoryImageCategoryId(
    input.categoryId
  );
  if (!categoryId) {
    return null;
  }

  const imagePath = parseCategoryImagePath(
    input.imagePath,
    categoryId
  );

  return imagePath ? { categoryId, imagePath } : null;
};
