import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import { BUTTON_TYPES } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitReceiveLaterProps } from "../models/CategoryUnitReceiveLaterProps.type";
import { CATEGORY_UNIT_RECEIVE_HINT_CLASS } from "../styles/CategoryUnitSheets.styles";
import type { JSX } from "react";

const CategoryUnitReceiveLater = ({
  receive,
}: CategoryUnitReceiveLaterProps): NullableRef<JSX.Element> =>
  receive.hasDamage ? (
    <>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.SECONDARY}
        disabled={!receive.canSaveLater}
        onClick={receive.handleSaveLater}
      >
        {CATEGORY_UNITS_COPY.RECEIVE_LATER}
      </Button>
      <Text className={CATEGORY_UNIT_RECEIVE_HINT_CLASS}>
        {CATEGORY_UNITS_COPY.RECEIVE_LATER_HINT}
      </Text>
    </>
  ) : null;

export default CategoryUnitReceiveLater;
