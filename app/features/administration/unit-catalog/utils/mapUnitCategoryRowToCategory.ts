import type { UnitCategory } from "../models/UnitCategory.interface";
import type { UnitCategoryRow } from "../models/UnitCategoryRow.type";

export const mapUnitCategoryRowToCategory = (
  categoryRow: UnitCategoryRow
): UnitCategory => ({
  id: categoryRow.id,
  name: categoryRow.name,
  trackingMode: categoryRow.tracking_mode,
  hasMotor: categoryRow.has_motor,
  usageMetric: categoryRow.usage_metric,
});
