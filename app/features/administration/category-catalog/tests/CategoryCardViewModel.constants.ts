import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import { resolveCategorySubtitle } from "../utils/resolveCategorySubtitle";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

export const DEFAULT_CATEGORY_CARD_VIEW_MODEL: CategoryCardViewModel =
  {
    category: DEFAULT_CATEGORY_LIST_ITEM,
    isInactive: false,
    subtitle: resolveCategorySubtitle(
      DEFAULT_CATEGORY_LIST_ITEM
    ),
  };
