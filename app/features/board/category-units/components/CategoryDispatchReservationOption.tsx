"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { formatCostaRicaTime } from "@/app/components/dispatch-board/utils/formatCostaRicaTime";
import Text from "@/app/components/text/Text";
import { BUTTON_TYPES, STRING } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryDispatchReservationOptionProps } from "../models/CategoryDispatchReservationOptionProps.interface";
import {
  CATEGORY_UNITS_PICKER_ACTION_CLASS,
  CATEGORY_UNITS_PICKER_NOTE_CLASS,
  CATEGORY_UNITS_PICKER_OPTION_CLASS,
  CATEGORY_UNITS_PICKER_TITLE_CLASS,
} from "../styles/CategoryUnits.styles";

const CategoryDispatchReservationOption = ({
  onChoose,
  reservation,
  selectedCount,
}: CategoryDispatchReservationOptionProps): React.JSX.Element => (
  <div className={CATEGORY_UNITS_PICKER_OPTION_CLASS}>
    <Text className={CATEGORY_UNITS_PICKER_TITLE_CLASS}>
      {`${reservation.customerName}${STRING.SPACE}${STRING.MIDDLE_DOT}${STRING.SPACE}${reservation.code}`}
    </Text>
    <Text className={CATEGORY_UNITS_PICKER_NOTE_CLASS}>
      {`${formatCostaRicaTime(reservation.startsAt)}${STRING.SPACE}${STRING.MIDDLE_DOT}${STRING.SPACE}${CATEGORY_UNITS_COPY.PICKER_COMMITTED(reservation.requiredCount)}`}
    </Text>
    {selectedCount > reservation.requiredCount && (
      <Text className={CATEGORY_UNITS_PICKER_NOTE_CLASS}>
        {CATEGORY_UNITS_COPY.PICKER_FITS(
          reservation.requiredCount,
          selectedCount
        )}
      </Text>
    )}
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON.PRIMARY}
      aria-label={CATEGORY_UNITS_COPY.PICKER_DISPATCH(
        reservation.customerName
      )}
      className={CATEGORY_UNITS_PICKER_ACTION_CLASS}
      onClick={() => onChoose(reservation)}
    >
      {CATEGORY_UNITS_COPY.DISPATCH_ACTION}
    </Button>
  </div>
);

export default CategoryDispatchReservationOption;
