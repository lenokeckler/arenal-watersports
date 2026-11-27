import type { CategoryUnitsViewProps } from "../models/CategoryUnitsViewProps.interface";
import CategoryUnitsDispatch from "./CategoryUnitsDispatch";
import CategoryUnitsHeader from "./CategoryUnitsHeader";
import CategoryUnitsList from "./CategoryUnitsList";

const CategoryUnitsView = ({
  afterHeader,
  canDispatch,
  categoryId,
  categoryName,
  filterControl,
  image,
  units,
}: CategoryUnitsViewProps): React.JSX.Element =>
  canDispatch ? (
    <CategoryUnitsDispatch
      afterHeader={afterHeader}
      categoryId={categoryId}
      categoryName={categoryName}
      filterControl={filterControl}
      image={image}
      units={units}
    />
  ) : (
    <>
      <CategoryUnitsHeader
        categoryName={categoryName}
        filterControl={filterControl}
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
