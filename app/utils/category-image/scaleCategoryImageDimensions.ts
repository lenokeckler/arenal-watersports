import { CATEGORY_IMAGE_COMPRESSION } from "@/app/constants";
import type { CategoryImageDimensions } from "./models/CategoryImageDimensions.interface";

const scaleSide = (side: number, ratio: number): number =>
  Math.max(
    CATEGORY_IMAGE_COMPRESSION.MIN_SIDE_PX,
    Math.round(side * ratio)
  );

export const scaleCategoryImageDimensions = ({
  height,
  width,
}: CategoryImageDimensions): CategoryImageDimensions => {
  const ratio = Math.min(
    CATEGORY_IMAGE_COMPRESSION.UNSCALED_RATIO,
    CATEGORY_IMAGE_COMPRESSION.MAX_SIDE_PX /
      Math.max(width, height)
  );

  return {
    height: scaleSide(height, ratio),
    width: scaleSide(width, ratio),
  };
};
