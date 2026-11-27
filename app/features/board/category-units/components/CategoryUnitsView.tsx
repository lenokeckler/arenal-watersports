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
  hasPhotos,
  image,
  isPaginated,
  units,
}: CategoryUnitsViewProps): React.JSX.Element =>
  canDispatch ? (
    <CategoryUnitsDispatch
      afterHeader={afterHeader}
      categoryId={categoryId}
      categoryName={categoryName}
      filterControl={filterControl}
      hasPhotos={hasPhotos}
      image={image}
      isPaginated={isPaginated}
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
        isPaginated={isPaginated}
        units={units}
      />
    </>
  );

export default CategoryUnitsView;
