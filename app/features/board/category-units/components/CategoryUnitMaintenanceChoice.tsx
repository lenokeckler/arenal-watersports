"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import { BUTTON_TYPES } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitMaintenanceChoiceProps } from "../models/CategoryUnitMaintenanceChoiceProps.interface";
import {
  CATEGORY_UNIT_RECEIVE_CHOICE_BUTTON_CLASS,
  CATEGORY_UNIT_RECEIVE_CHOICE_CLASS,
  CATEGORY_UNIT_RECEIVE_ORDER_CLASS,
} from "../styles/CategoryUnitSheets.styles";

const CategoryUnitMaintenanceChoice = ({
  inMaintenance,
  onChange,
}: CategoryUnitMaintenanceChoiceProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_RECEIVE_ORDER_CLASS}>
    <Text>{CATEGORY_UNITS_COPY.MAINTENANCE_LABEL}</Text>
    <div className={CATEGORY_UNIT_RECEIVE_CHOICE_CLASS}>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={
          inMaintenance ? BUTTON.SECONDARY : BUTTON.PRIMARY
        }
        className={
          CATEGORY_UNIT_RECEIVE_CHOICE_BUTTON_CLASS
        }
        aria-pressed={!inMaintenance}
        onClick={() => onChange(false)}
      >
        {CATEGORY_UNITS_COPY.MAINTENANCE_IN_SERVICE}
      </Button>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={
          inMaintenance ? BUTTON.PRIMARY : BUTTON.SECONDARY
        }
        className={
          CATEGORY_UNIT_RECEIVE_CHOICE_BUTTON_CLASS
        }
        aria-pressed={inMaintenance}
        onClick={() => onChange(true)}
      >
        {CATEGORY_UNITS_COPY.MAINTENANCE_IN_WORKSHOP}
      </Button>
    </div>
  </div>
);

export default CategoryUnitMaintenanceChoice;
