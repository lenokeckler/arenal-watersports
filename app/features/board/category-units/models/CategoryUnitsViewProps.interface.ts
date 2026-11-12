import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitsViewProps {
  canDispatch: boolean;
  categoryId: string;
  categoryName: string;
  units: CategoryUnit[];
}
