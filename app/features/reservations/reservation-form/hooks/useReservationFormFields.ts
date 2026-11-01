import { RESERVATION_FORM_MINIMUM_INPUT_VALUE } from "../constants/ReservationFormUi.constants";
import { STRING } from "@/app/constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationFormFieldsOptions } from "../models/ReservationFormFieldsOptions.interface";
import { useReservationFormValues } from "./useReservationFormValues";

export const useReservationFormFields = (
  initialDate: string,
  initialCategoryId: string,
  clearFieldError: (field: ReservationFormField) => void,
  options?: ReservationFormFieldsOptions
) => {
  const { updateValue, values } = useReservationFormValues(
    initialDate,
    initialCategoryId,
    clearFieldError,
    options?.initialValues
  );
  const clearUnitAfterScheduleChange = (): void => {
    if (!options?.keepsUnitOnScheduleChange) {
      updateValue("unitId", STRING.Empty);
    }
  };

  return {
    handleCategoryChange: (value: string) => {
      updateValue("categoryId", value);
      updateValue("unitId", STRING.Empty);
    },
    handleCustomerNameChange: (value: string) =>
      updateValue("customerName", value),
    handleDateChange: (value: string) => {
      updateValue("date", value);
      updateValue("unitId", STRING.Empty);
    },
    handleDurationChange: (value: number) => {
      if (
        Number.isFinite(value) &&
        value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
      ) {
        updateValue("durationHours", value);
        clearUnitAfterScheduleChange();
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
    handleTimeChange: (value: string) => {
      updateValue("time", value);
      clearUnitAfterScheduleChange();
    },
    handleUnitChange: (value: string) =>
      updateValue("unitId", value),
    values,
  };
};
