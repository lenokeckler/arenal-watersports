import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitsDispatchProps {
  categoryId: string;
  categoryName: string;
  units: CategoryUnit[];
}
