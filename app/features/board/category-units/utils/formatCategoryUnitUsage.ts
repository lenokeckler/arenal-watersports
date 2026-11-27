import type { DispatchUsageMetric } from "@/app/components/dispatch-board/models/DispatchUsageMetric.type";
import { CATEGORY_UNIT_USAGE } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNIT_USAGE_COPY } from "../constants/CategoryUnitsCopy.constants";

export const formatCategoryUnitUsage = (
  usageTotal: number,
  metric: DispatchUsageMetric
): string =>
  CATEGORY_UNIT_USAGE_COPY[metric](
    usageTotal.toLocaleString(
      CATEGORY_UNIT_USAGE.LOCALE,
      CATEGORY_UNIT_USAGE.FORMAT
    )
  );
