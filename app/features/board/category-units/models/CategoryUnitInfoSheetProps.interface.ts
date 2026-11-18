import type { CategoryUnit } from "./CategoryUnit.interface";
import type { UnitOccupancy } from "./UnitOccupancy.interface";

export interface CategoryUnitInfoSheetProps {
  occupancy: UnitOccupancy;
  onClose: () => void;
  unit: CategoryUnit;
}
