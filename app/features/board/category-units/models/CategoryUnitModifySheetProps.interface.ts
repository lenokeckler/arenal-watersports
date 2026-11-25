import type { NullableRef } from "@/app/types";
import type { CategoryUnit } from "./CategoryUnit.interface";
import type { CategoryUnitReadings } from "./CategoryUnitReadings.interface";

export interface CategoryUnitModifySheetProps {
  onClose: () => void;
  readings: NullableRef<CategoryUnitReadings>;
  unit: CategoryUnit;
}
