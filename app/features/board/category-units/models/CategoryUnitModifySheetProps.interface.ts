import type { CategoryUnit } from "./CategoryUnit.interface";
import type { CategoryUnitReadings } from "./CategoryUnitReadings.interface";

export interface CategoryUnitModifySheetProps {
  onClose: () => void;
  readings: CategoryUnitReadings;
  unit: CategoryUnit;
}
