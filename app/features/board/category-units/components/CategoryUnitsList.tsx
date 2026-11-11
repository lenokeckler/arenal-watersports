import {
  ARIA_ROLE,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsListProps } from "../models/CategoryUnitsListProps.interface";
import {
  CATEGORY_UNITS_LIST_CLASS,
  CATEGORY_UNITS_LIST_ITEM_CLASS,
} from "../styles/CategoryUnits.styles";
import CategoryUnitRow from "./CategoryUnitRow";
import CategoryUnitSelectRow from "./CategoryUnitSelectRow";

const CategoryUnitsList = ({
  categoryName,
  selection,
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
        {selection &&
        unit.status === INVENTORY_UNIT_STATUS.AVAILABLE ? (
          <CategoryUnitSelectRow
            isSelected={selection.selectedUnitIds.includes(
              unit.id
            )}
            onToggle={selection.onToggle}
            unit={unit}
          />
        ) : (
          <CategoryUnitRow unit={unit} />
        )}
      </div>
    ))}
  </div>
);

export default CategoryUnitsList;
