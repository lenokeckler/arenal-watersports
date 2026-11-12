import { CATEGORY_IMAGE } from "@/app/constants";
import type { CategoryImagePathParts } from "./models/CategoryImagePathParts.interface";

export const buildCategoryImagePath = ({
  categoryId,
  mimeType,
  objectId,
}: CategoryImagePathParts): string => {
  const extension =
    CATEGORY_IMAGE.EXTENSION_BY_MIME[mimeType];

  return `${categoryId}${CATEGORY_IMAGE.PATH_SEPARATOR}${objectId}${CATEGORY_IMAGE.EXTENSION_SEPARATOR}${extension}`;
};
