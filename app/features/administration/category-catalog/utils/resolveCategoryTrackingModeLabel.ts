import { CATEGORY_TRACKING_MODE_MICRO_LABEL } from "../constants/CategoryTrackingModeMicroLabel.constants";
import type { CategoryListItem } from "../models/CategoryListItem.interface";

export const resolveCategoryTrackingModeLabel = (
  category: CategoryListItem
): string =>
  CATEGORY_TRACKING_MODE_MICRO_LABEL[category.trackingMode];
