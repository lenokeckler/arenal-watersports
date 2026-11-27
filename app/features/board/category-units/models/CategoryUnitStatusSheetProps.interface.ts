import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitStatusSheetProps {
  hasPhotos: boolean;
  onClose: () => void;
  unit: CategoryUnit;
}
