import type { CategoryImageMimeType } from "@/app/constants";
import type { CategoryImageDecoded } from "./CategoryImageDecoded.interface";
import type { CategoryImageDimensions } from "./CategoryImageDimensions.interface";

export interface CategoryImageEncodeOptions {
  decoded: CategoryImageDecoded;
  dimensions: CategoryImageDimensions;
  mimeType: CategoryImageMimeType;
  quality: number;
}
