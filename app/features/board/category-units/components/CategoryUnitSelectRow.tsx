"use client";

import { INPUT_TYPES } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitSelectRowProps } from "../models/CategoryUnitSelectRowProps.interface";
import {
  CATEGORY_UNIT_SELECT_INPUT_CLASS,
  CATEGORY_UNIT_SELECT_LABEL_CLASS,
} from "../styles/CategoryUnitRow.styles";
import CategoryUnitRow from "./CategoryUnitRow";

const CategoryUnitSelectRow = ({
  isSelected,
  onToggle,
  unit,
}: CategoryUnitSelectRowProps): React.JSX.Element => (
  <label className={CATEGORY_UNIT_SELECT_LABEL_CLASS}>
    <input
      type={INPUT_TYPES.CHECKBOX}
      className={CATEGORY_UNIT_SELECT_INPUT_CLASS}
      aria-label={CATEGORY_UNITS_COPY.DISPATCH_SELECT_UNIT(
        unit.code
      )}
      checked={isSelected}
      onChange={() => onToggle(unit.id)}
    />
    <CategoryUnitRow
      isSelectable
      isSelected={isSelected}
      unit={unit}
    />
  </label>
);

export default CategoryUnitSelectRow;
