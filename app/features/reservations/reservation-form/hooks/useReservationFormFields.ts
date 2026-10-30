import { RESERVATION_FORM_MINIMUM_INPUT_VALUE } from "../constants/ReservationFormUi.constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import { useReservationFormValues } from "./useReservationFormValues";

export const useReservationFormFields = (
  initialDate: string,
  initialCategoryId: string,
  clearFieldError: (field: ReservationFormField) => void
) => {
  const { updateValue, values } = useReservationFormValues(
    initialDate,
    initialCategoryId,
    clearFieldError
  );

  return {
    handleCategoryChange: (value: string) =>
      updateValue("categoryId", value),
    handleCustomerNameChange: (value: string) =>
      updateValue("customerName", value),
    handleDateChange: (value: string) =>
      updateValue("date", value),
    handleDurationChange: (value: number) => {
      if (
        Number.isFinite(value) &&
        value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
      ) {
        updateValue("durationHours", value);
      }
    },
    handlePeopleCountChange: (value: number) => {
      if (
        Number.isFinite(value) &&
        value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
      ) {
        updateValue("peopleCount", value);
      }
    },
    handleQuantityChange: (value: number) => {
      if (
        Number.isFinite(value) &&
        value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
      ) {
        updateValue("quantity", value);
      }
    },
    handleTimeChange: (value: string) =>
      updateValue("time", value),
    values,
  };
};
