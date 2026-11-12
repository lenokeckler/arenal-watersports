"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import { BUTTON_TYPES } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsDispatchBarProps } from "../models/CategoryUnitsDispatchBarProps.interface";
import {
  CATEGORY_UNITS_DISPATCH_BAR_ACTIONS_CLASS,
  CATEGORY_UNITS_DISPATCH_BAR_CLASS,
  CATEGORY_UNITS_DISPATCH_BAR_COUNT_CLASS,
} from "../styles/CategoryUnits.styles";

const CategoryUnitsDispatchBar = ({
  onCancel,
  onDispatch,
  selectedCount,
}: CategoryUnitsDispatchBarProps): React.JSX.Element => (
  <div className={CATEGORY_UNITS_DISPATCH_BAR_CLASS}>
    <Text
      className={CATEGORY_UNITS_DISPATCH_BAR_COUNT_CLASS}
    >
      {CATEGORY_UNITS_COPY.DISPATCH_SELECTED(selectedCount)}
    </Text>
    <div
      className={CATEGORY_UNITS_DISPATCH_BAR_ACTIONS_CLASS}
    >
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.SECONDARY}
        onClick={onCancel}
      >
        {CATEGORY_UNITS_COPY.DISPATCH_CANCEL}
      </Button>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.PRIMARY}
        onClick={onDispatch}
      >
        {CATEGORY_UNITS_COPY.DISPATCH_ACTION}
      </Button>
    </div>
  </div>
);

export default CategoryUnitsDispatchBar;
