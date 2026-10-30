import { STRING } from "@/app/constants";
import { useState } from "react";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormFieldsViewModel } from "../models/ReservationFormFieldsViewModel.interface";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { UpdateReservationFormValue } from "../models/UpdateReservationFormValue.type";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { createReservationTypeChangeHandler } from "../utils/createReservationTypeChangeHandler";
import { createReservationFormNumericFieldHandlers } from "../utils/createReservationFormNumericFieldHandlers";
import { useReservationFormSelectionFields } from "./useReservationFormSelectionFields";
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
  categories: ReservationCategoryOption[]
): ReservationFormFieldsViewModel => {
  const { updateValue, values } = useReservationFormValues(
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
      categories,
      values,
      updateValue,
      setHasReservationTypeSelectionReset
    );
  const numericFieldHandlers =
    createReservationFormNumericFieldHandlers(updateValue);
  return {
    ...createBasicFieldHandlers(updateValue, () =>
      setHasReservationTypeSelectionReset(false)
    ),
    ...numericFieldHandlers,
    ...useReservationFormSelectionFields(
      updateValue,
      values
    ),
    handleReservationTypeChange,
    hasReservationTypeSelectionReset,
    values,
  };
};
