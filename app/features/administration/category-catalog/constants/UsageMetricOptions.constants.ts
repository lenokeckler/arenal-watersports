import { CATEGORY_CATALOG_COPY } from "./CategoryCatalogCopy.constants";
import { USAGE_METRIC } from "./UsageMetric.constants";

export const USAGE_METRIC_OPTIONS: Array<{
  key: string;
  value: string;
  label: string;
}> = [
  {
    key: USAGE_METRIC.ENGINE_HOURS,
    value: USAGE_METRIC.ENGINE_HOURS,
    label:
      CATEGORY_CATALOG_COPY.USAGE_METRIC_ENGINE_HOURS_LABEL,
  },
  {
    key: USAGE_METRIC.KILOMETERS,
    value: USAGE_METRIC.KILOMETERS,
    label:
      CATEGORY_CATALOG_COPY.USAGE_METRIC_KILOMETERS_LABEL,
  },
];
