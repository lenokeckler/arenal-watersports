"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import {
  BUTTON_TYPES,
  MATERIAL_ICON_NAME,
} from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsEditToggleProps } from "../models/CategoryUnitsEditToggleProps.interface";
import { CATEGORY_UNITS_EDIT_TOGGLE_CLASS } from "../styles/CategoryUnitSheets.styles";

const CategoryUnitsEditToggle = ({
  isEditing,
  onToggle,
}: CategoryUnitsEditToggleProps): React.JSX.Element => (
  <Button
    type={BUTTON_TYPES.BUTTON}
    variant={isEditing ? BUTTON.PRIMARY : BUTTON.SECONDARY}
    className={CATEGORY_UNITS_EDIT_TOGGLE_CLASS}
    aria-pressed={isEditing}
    onClick={onToggle}
  >
    <MaterialIcon name={MATERIAL_ICON_NAME.EDIT} />
    {CATEGORY_UNITS_COPY.EDIT}
  </Button>
);

export default CategoryUnitsEditToggle;
