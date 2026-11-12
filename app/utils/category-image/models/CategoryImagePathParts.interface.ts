import type { CategoryImageMimeType } from "@/app/constants";

export interface CategoryImagePathParts {
  categoryId: string;
  mimeType: CategoryImageMimeType;
  objectId: string;
}
