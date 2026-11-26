"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import {
  BUTTON_TYPES,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  CATEGORY_UNIT_FIELD_ID,
  CATEGORY_UNIT_RECEIVE,
} from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitReceiveOrderProps } from "../models/CategoryUnitReceiveOrderProps.interface";
import {
  CATEGORY_UNIT_RECEIVE_CHOICE_BUTTON_CLASS,
  CATEGORY_UNIT_RECEIVE_CHOICE_CLASS,
  CATEGORY_UNIT_RECEIVE_ORDER_CLASS,
} from "../styles/CategoryUnitSheets.styles";

const CategoryUnitReceiveOrder = ({
  damageText,
  hasDamage,
  onDamageTextChange,
  onHasDamageChange,
}: CategoryUnitReceiveOrderProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_RECEIVE_ORDER_CLASS}>
    <Text>{CATEGORY_UNITS_COPY.RECEIVE_ORDER}</Text>
    <div className={CATEGORY_UNIT_RECEIVE_CHOICE_CLASS}>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={
          hasDamage ? BUTTON.SECONDARY : BUTTON.PRIMARY
        }
        className={
          CATEGORY_UNIT_RECEIVE_CHOICE_BUTTON_CLASS
        }
        aria-pressed={!hasDamage}
        onClick={() => onHasDamageChange(false)}
      >
        {CATEGORY_UNITS_COPY.RECEIVE_ORDER_OK}
      </Button>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={
          hasDamage ? BUTTON.PRIMARY : BUTTON.SECONDARY
        }
        className={
          CATEGORY_UNIT_RECEIVE_CHOICE_BUTTON_CLASS
        }
        aria-pressed={hasDamage}
        onClick={() => onHasDamageChange(true)}
      >
        {CATEGORY_UNITS_COPY.RECEIVE_ORDER_DAMAGED}
      </Button>
    </div>
    {hasDamage && (
      <FormField
        id={CATEGORY_UNIT_FIELD_ID.DAMAGE}
        name={CATEGORY_UNIT_FIELD_ID.DAMAGE}
        label={CATEGORY_UNITS_COPY.RECEIVE_DAMAGE_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TEXT}
        value={damageText}
        onChange={(event) =>
          onDamageTextChange(
            event.target.value.slice(
              0,
              CATEGORY_UNIT_RECEIVE.DAMAGE_MAX_LENGTH
            )
          )
        }
      />
    )}
  </div>
);

export default CategoryUnitReceiveOrder;
