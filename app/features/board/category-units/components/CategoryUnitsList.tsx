import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsListProps } from "../models/CategoryUnitsListProps.interface";
import {
  CATEGORY_UNITS_LIST_CLASS,
  CATEGORY_UNITS_LIST_ITEM_CLASS,
} from "../styles/CategoryUnits.styles";
import CategoryUnitRow from "./CategoryUnitRow";

const CategoryUnitsList = ({
  categoryName,
  units,
}: CategoryUnitsListProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.LIST}
    aria-label={CATEGORY_UNITS_COPY.LIST_LABEL(
      categoryName
    )}
    className={CATEGORY_UNITS_LIST_CLASS}
  >
    {units.map((unit) => (
      <div
        key={unit.id}
        role={ARIA_ROLE.LISTITEM}
        className={CATEGORY_UNITS_LIST_ITEM_CLASS}
      >
        <CategoryUnitRow unit={unit} />
      </div>
    ))}
  </div>
);

export default CategoryUnitsList;
