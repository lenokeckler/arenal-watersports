import {
  CATEGORY_IMAGE,
  type CategoryImageMimeType,
} from "@/app/constants";

export const buildCompressedCategoryImageName = (
  originalName: string,
  mimeType: CategoryImageMimeType
): string => {
  const separatorIndex = originalName.lastIndexOf(
    CATEGORY_IMAGE.EXTENSION_SEPARATOR
  );
  const baseName =
    separatorIndex > 0
      ? originalName.slice(0, separatorIndex)
      : originalName;

  return `${baseName}${CATEGORY_IMAGE.EXTENSION_SEPARATOR}${CATEGORY_IMAGE.EXTENSION_BY_MIME[mimeType]}`;
};
