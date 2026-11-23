import type { CategoryUnitsViewProps } from "../models/CategoryUnitsViewProps.interface";
import CategoryUnitsDispatch from "./CategoryUnitsDispatch";
import CategoryUnitsHeader from "./CategoryUnitsHeader";
import CategoryUnitsList from "./CategoryUnitsList";

const CategoryUnitsView = ({
  afterHeader,
  canDispatch,
  categoryId,
  categoryName,
  image,
  unitCount,
  units,
}: CategoryUnitsViewProps): React.JSX.Element =>
  canDispatch ? (
    <CategoryUnitsDispatch
      afterHeader={afterHeader}
      categoryId={categoryId}
      categoryName={categoryName}
      image={image}
      unitCount={unitCount}
      units={units}
    />
  ) : (
    <>
      <CategoryUnitsHeader
        categoryName={categoryName}
        unitCount={unitCount}
      />
      {afterHeader}
      <CategoryUnitsList
        categoryName={categoryName}
        image={image}
        units={units}
      />
    </>
  );

export default CategoryUnitsView;
