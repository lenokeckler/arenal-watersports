import type { CategoryUnit } from "./CategoryUnit.interface";
import type { CategoryUnitSelection } from "./CategoryUnitSelection.interface";

export interface CategoryUnitsListProps {
  categoryName: string;
  selection?: CategoryUnitSelection;
  units: CategoryUnit[];
}
