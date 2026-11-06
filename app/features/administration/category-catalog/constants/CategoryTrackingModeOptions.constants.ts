import { CATEGORY_CATALOG_COPY } from "./CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "./CategoryTrackingMode.constants";

export const CATEGORY_TRACKING_MODE_OPTIONS: Array<{
  key: string;
  value: string;
  label: string;
}> = [
  {
    key: CATEGORY_TRACKING_MODE.BY_UNIT,
    value: CATEGORY_TRACKING_MODE.BY_UNIT,
    label:
      CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LABEL,
  },
  {
    key: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    value: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    label:
      CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LABEL,
  },
];
