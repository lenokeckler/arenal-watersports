import type { CategoryUnit } from "./CategoryUnit.interface";
import type { UnitOccupancy } from "./UnitOccupancy.interface";

export interface CategoryUnitInfoSheetProps {
  hasPhotos: boolean;
  occupancy: UnitOccupancy;
  onClose: () => void;
  onReceive: () => void;
  unit: CategoryUnit;
}
