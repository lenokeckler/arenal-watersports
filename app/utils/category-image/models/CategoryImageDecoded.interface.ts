import type { CategoryImageDimensions } from "./CategoryImageDimensions.interface";

export interface CategoryImageDecoded
  extends CategoryImageDimensions {
  source: CanvasImageSource;
}
