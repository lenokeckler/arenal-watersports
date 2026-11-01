import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryListItem } from "../models/CategoryListItem.interface";

export const isCategoryInactive = (
  category: CategoryListItem
): boolean => category.status === CATEGORY_STATUS.INACTIVE;
