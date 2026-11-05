import { RESERVATION_FORM_MINIMUM_INPUT_VALUE } from "../constants/ReservationFormUi.constants";
import { STRING } from "@/app/constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { UpdateReservationFormValue } from "../models/UpdateReservationFormValue.type";

export const createReservationFormNumericFieldHandlers = (
  updateValue: UpdateReservationFormValue
) => ({
  handleDurationChange: (value: number) => {
    if (
      Number.isFinite(value) &&
      value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
    ) {
      updateValue(
        RESERVATION_FORM_FIELD.DURATION_HOURS,
        value
      );
      updateValue(
        RESERVATION_FORM_FIELD.UNIT_ID,
        STRING.Empty
      );
    }
  },
  handlePeopleCountChange: (value: number) => {
    if (
      Number.isFinite(value) &&
      value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
    ) {
      updateValue(
        RESERVATION_FORM_FIELD.PEOPLE_COUNT,
        value
      );
    }
  },
  handleQuantityChange: (value: number) => {
    if (
      Number.isFinite(value) &&
      value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
    ) {
      updateValue(RESERVATION_FORM_FIELD.QUANTITY, value);
    }
  },
});
