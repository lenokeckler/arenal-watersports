import {
  CATEGORY_IMAGE,
  type CategoryImageMimeType,
} from "@/app/constants";

export const isCategoryImageMimeType = (
  mimeType: string
): mimeType is CategoryImageMimeType =>
  CATEGORY_IMAGE.MIME_TYPES.some(
    (allowedType) => allowedType === mimeType
  );
