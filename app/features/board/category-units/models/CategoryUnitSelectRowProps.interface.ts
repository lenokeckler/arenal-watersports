import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitSelectRowProps {
  isSelected: boolean;
  onToggle: (unitId: string) => void;
  unit: CategoryUnit;
}
