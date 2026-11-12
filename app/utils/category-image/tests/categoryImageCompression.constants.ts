import { CATEGORY_IMAGE_COMPRESSION } from "@/app/constants";
import type { CategoryImageDimensions } from "../models/CategoryImageDimensions.interface";

const MAX_SIDE = CATEGORY_IMAGE_COMPRESSION.MAX_SIDE_PX;

export const LANDSCAPE_DIMENSIONS: CategoryImageDimensions =
  { height: 2_000, width: 4_000 };

export const PORTRAIT_DIMENSIONS: CategoryImageDimensions =
  { height: 3_000, width: 1_500 };

export const SMALL_DIMENSIONS: CategoryImageDimensions = {
  height: 300,
  width: 400,
};

export const THIN_DIMENSIONS: CategoryImageDimensions = {
  height: 2,
  width: MAX_SIDE * 10,
};

export const SOURCE_FILE_NAME = "boat.photo.png";

export const NAME_WITHOUT_EXTENSION = "boat";

export const HIDDEN_FILE_NAME = ".boat";
