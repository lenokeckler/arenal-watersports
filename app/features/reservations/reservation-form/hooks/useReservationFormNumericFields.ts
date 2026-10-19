import { RESERVATION_FORM_MINIMUM_INPUT_VALUE } from "../constants/ReservationFormUi.constants";
import type { ReservationFormValueUpdater } from "../models/ReservationFormValueUpdater.type";
import { STRING } from "@/app/constants";

export const useReservationFormNumericFields = (
  updateValue: ReservationFormValueUpdater
) => ({
  handleDurationChange: (value: number): void => {
    if (
      !Number.isFinite(value) ||
      value < RESERVATION_FORM_MINIMUM_INPUT_VALUE
    ) {
      return;
    }
    updateValue("durationHours", value);
    updateValue("unitId", STRING.Empty);
  },
  handlePeopleCountChange: (value: number): void => {
    if (
      Number.isFinite(value) &&
      value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
    ) {
      updateValue("peopleCount", value);
    }
  },
  handleQuantityChange: (value: number): void => {
    if (
      Number.isFinite(value) &&
      value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
    ) {
      updateValue("quantity", value);
    }
  },
});
