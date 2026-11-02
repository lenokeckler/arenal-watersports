import type { CategoryStatus } from "../models/CategoryStatus.type";
import { CATEGORY_CATALOG_COPY } from "./CategoryCatalogCopy.constants";
import { CATEGORY_STATUS } from "./CategoryStatus.constants";

export const CATEGORY_STATUS_LABEL: Record<
  CategoryStatus,
  string
> = {
  [CATEGORY_STATUS.ACTIVE]:
    CATEGORY_CATALOG_COPY.STATUS_LABEL_ACTIVE,
  [CATEGORY_STATUS.INACTIVE]:
    CATEGORY_CATALOG_COPY.STATUS_LABEL_INACTIVE,
};
