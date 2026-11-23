import type { CategoryUnit } from "./CategoryUnit.interface";
import type { CategoryUnitReadings } from "./CategoryUnitReadings.interface";
import type { UnitOccupancy } from "./UnitOccupancy.interface";

export interface CategoryUnitReceiveSheetProps {
  occupancy: UnitOccupancy;
  onClose: () => void;
  readings: CategoryUnitReadings;
  unit: CategoryUnit;
}
