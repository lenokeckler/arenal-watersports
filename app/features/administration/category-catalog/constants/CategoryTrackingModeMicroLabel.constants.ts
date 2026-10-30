import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import { CATEGORY_CATALOG_COPY } from "./CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "./CategoryTrackingMode.constants";

export const CATEGORY_TRACKING_MODE_MICRO_LABEL: Record<
  CategoryTrackingMode,
  string
> = {
  [CATEGORY_TRACKING_MODE.BY_QUANTITY]:
    CATEGORY_CATALOG_COPY.TRACKING_MODE_MICRO_LABEL_BY_QUANTITY,
  [CATEGORY_TRACKING_MODE.BY_UNIT]:
    CATEGORY_CATALOG_COPY.TRACKING_MODE_MICRO_LABEL_BY_UNIT,
};
