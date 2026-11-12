import { STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE_LABEL } from "../constants/CategoryTrackingModeLabel.constants";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import { resolveCountLabel } from "./resolveCountLabel";

export const resolveCategorySubtitle = (
  category: CategoryListItem
): string =>
  [
    CATEGORY_TRACKING_MODE_LABEL[category.trackingMode],
    STRING.MIDDLE_DOT,
    resolveCountLabel(
      category.currentQuantity,
      CATEGORY_CATALOG_COPY.UNIT_COUNT_SINGULAR,
      CATEGORY_CATALOG_COPY.UNIT_COUNT_PLURAL
    ),
  ].join(STRING.SPACE);
