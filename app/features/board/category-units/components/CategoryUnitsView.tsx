import type { CategoryUnitsViewProps } from "../models/CategoryUnitsViewProps.interface";
import CategoryUnitsDispatch from "./CategoryUnitsDispatch";
import CategoryUnitsList from "./CategoryUnitsList";

const CategoryUnitsView = ({
  canDispatch,
  categoryId,
  categoryName,
  units,
}: CategoryUnitsViewProps): React.JSX.Element =>
  canDispatch ? (
    <CategoryUnitsDispatch
      categoryId={categoryId}
      categoryName={categoryName}
      units={units}
    />
  ) : (
    <CategoryUnitsList
      categoryName={categoryName}
      units={units}
    />
  );

export default CategoryUnitsView;
