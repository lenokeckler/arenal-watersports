import { ARIA_ROLE } from "@/app/constants";
import { resolveCardGridSize } from "@/app/utils/card-grid/resolveCardGridSize";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsListProps } from "../models/CategoryUnitsListProps.interface";
import {
  CATEGORY_UNITS_LIST_CLASS,
  CATEGORY_UNITS_LIST_ITEM_CLASSES,
} from "../styles/CategoryUnits.styles";
import { resolveCategoryUnitRowKind } from "../utils/resolveCategoryUnitRowKind";
import CategoryUnitListItem from "./CategoryUnitListItem";

const CategoryUnitsList = ({
  categoryName,
  image,
  interaction,
  isPaginated = false,
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
        className={
          CATEGORY_UNITS_LIST_ITEM_CLASSES[
            resolveCardGridSize(units.length, isPaginated)
          ]
        }
      >
        <CategoryUnitListItem
          image={image}
          interaction={interaction}
          kind={resolveCategoryUnitRowKind({
            hasSelection: Boolean(selection),
            interaction,
            unit,
          })}
          selection={selection}
          unit={unit}
        />
      </div>
    ))}
  </div>
);

export default CategoryUnitsList;
