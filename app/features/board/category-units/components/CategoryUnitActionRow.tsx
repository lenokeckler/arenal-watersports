"use client";

import { BUTTON_TYPES } from "@/app/constants";
import { CATEGORY_UNIT_ACTION } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitActionRowProps } from "../models/CategoryUnitActionRowProps.interface";
import { CATEGORY_UNIT_ACTION_ROW_CLASS } from "../styles/CategoryUnitSheets.styles";
import CategoryUnitRow from "./CategoryUnitRow";

const ACTION_LABEL = {
  [CATEGORY_UNIT_ACTION.INFO]:
    CATEGORY_UNITS_COPY.INFO_UNIT,
  [CATEGORY_UNIT_ACTION.MODIFY]:
    CATEGORY_UNITS_COPY.EDIT_UNIT,
  [CATEGORY_UNIT_ACTION.STATUS]:
    CATEGORY_UNITS_COPY.STATUS_UNIT,
} as const;

const CategoryUnitActionRow = ({
  action,
  image,
  onAction,
  unit,
}: CategoryUnitActionRowProps): React.JSX.Element => (
  <button
    type={BUTTON_TYPES.BUTTON}
    aria-label={ACTION_LABEL[action](unit.code)}
    className={CATEGORY_UNIT_ACTION_ROW_CLASS}
    onClick={() => onAction(unit.id)}
  >
    <CategoryUnitRow
      image={image}
      isEditable={action === CATEGORY_UNIT_ACTION.MODIFY}
      unit={unit}
    />
  </button>
);

export default CategoryUnitActionRow;
