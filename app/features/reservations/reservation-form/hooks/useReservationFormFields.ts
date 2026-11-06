import { useState } from "react";
import { STRING } from "@/app/constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationFormFieldsViewModel } from "../models/ReservationFormFieldsViewModel.interface";
import type { UpdateReservationFormValue } from "../models/UpdateReservationFormValue.type";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { createReservationTypeChangeHandler } from "../utils/createReservationTypeChangeHandler";
import { createReservationFormNumericFieldHandlers } from "../utils/createReservationFormNumericFieldHandlers";
import { useReservationFormValues } from "./useReservationFormValues";

const createBasicFieldHandlers = (
  updateValue: UpdateReservationFormValue,
  clearSelectionResetNotice: () => void
) => ({
  handleCategoryChange: (value: string) => {
    clearSelectionResetNotice();
    updateValue(RESERVATION_FORM_FIELD.CATEGORY_ID, value);
    updateValue(
      RESERVATION_FORM_FIELD.UNIT_ID,
      STRING.Empty
    );
  },
  handleCustomerNameChange: (value: string) =>
    updateValue(
      RESERVATION_FORM_FIELD.CUSTOMER_NAME,
      value
    ),
  handleDateChange: (value: string) => {
    updateValue(RESERVATION_FORM_FIELD.DATE, value);
    updateValue(
      RESERVATION_FORM_FIELD.UNIT_ID,
      STRING.Empty
    );
  },
  handleTimeChange: (value: string) => {
    updateValue(RESERVATION_FORM_FIELD.TIME, value);
    updateValue(
      RESERVATION_FORM_FIELD.UNIT_ID,
      STRING.Empty
    );
  },
  handleUnitChange: (value: string) => {
    clearSelectionResetNotice();
    updateValue(RESERVATION_FORM_FIELD.UNIT_ID, value);
  },
});

export const useReservationFormFields = (
  initialDate: string,
  initialCategoryId: string,
  clearFieldError: (field: ReservationFormField) => void,
  liveCategories: ReservationCategoryOption[] = []
): ReservationFormFieldsViewModel => {
  const { reset, updateValue, values } =
    useReservationFormValues(
      initialDate,
      initialCategoryId,
      clearFieldError
    );
  const [
    hasReservationTypeSelectionReset,
    setHasReservationTypeSelectionReset,
  ] = useState(false);
  const handleReservationTypeChange =
    createReservationTypeChangeHandler(
      values,
      updateValue,
      setHasReservationTypeSelectionReset
    );

  return {
    ...createBasicFieldHandlers(updateValue, () =>
      setHasReservationTypeSelectionReset(false)
    ),
    ...createReservationFormNumericFieldHandlers(
      updateValue
    ),
    reset: () => {
      reset();
      setHasReservationTypeSelectionReset(false);
    },
    handleReservationTypeChange: (
      value,
      currentCategories
    ) =>
      handleReservationTypeChange(
        value,
        currentCategories ?? liveCategories
      ),
    hasReservationTypeSelectionReset,
    values,
  };
};
