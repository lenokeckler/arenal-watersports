import { CATEGORY_ALERT_TYPE } from "./CategoryAlertType.constants";
import { CATEGORY_CATALOG_COPY } from "./CategoryCatalogCopy.constants";

export const CATEGORY_ALERT_TYPE_OPTIONS: Array<{
  key: string;
  value: string;
  label: string;
}> = [
  {
    key: CATEGORY_ALERT_TYPE.NONE,
    value: CATEGORY_ALERT_TYPE.NONE,
    label: CATEGORY_CATALOG_COPY.ALERT_TYPE_NONE_LABEL,
  },
  {
    key: CATEGORY_ALERT_TYPE.QUANTITY,
    value: CATEGORY_ALERT_TYPE.QUANTITY,
    label: CATEGORY_CATALOG_COPY.ALERT_TYPE_QUANTITY_LABEL,
  },
  {
    key: CATEGORY_ALERT_TYPE.EXPIRY,
    value: CATEGORY_ALERT_TYPE.EXPIRY,
    label: CATEGORY_CATALOG_COPY.ALERT_TYPE_EXPIRY_LABEL,
  },
  {
    key: CATEGORY_ALERT_TYPE.BOTH,
    value: CATEGORY_ALERT_TYPE.BOTH,
    label: CATEGORY_CATALOG_COPY.ALERT_TYPE_BOTH_LABEL,
  },
];
