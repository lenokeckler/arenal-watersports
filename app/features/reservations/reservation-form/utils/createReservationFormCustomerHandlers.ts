import { RESERVATION_FORM_MINIMUM_INPUT_VALUE } from "../constants/ReservationFormUi.constants";
import type { ReservationFormValueUpdater } from "../models/ReservationFormValueUpdater.type";

export const createReservationFormCustomerHandlers = (
  updateValue: ReservationFormValueUpdater
) => ({
  handleCustomerNameChange: (value: string): void =>
    updateValue("customerName", value),
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
