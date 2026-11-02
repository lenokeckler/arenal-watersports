import { useState } from "react";
import { RESERVATION_FORM_DEFAULT_VALUES } from "../constants/ReservationFormUi.constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";

export const useReservationFormValues = (
  initialDate: string,
  initialCategoryId: string,
  clearFieldError: (field: ReservationFormField) => void,
  initialValues?: ReservationFormInput
) => {
  const [values, setValues] =
    useState<ReservationFormInput>({
      ...RESERVATION_FORM_DEFAULT_VALUES,
      date: initialDate,
      categoryId: initialCategoryId,
      ...initialValues,
    });

  const updateValue = <
    K extends keyof ReservationFormInput,
  >(
    field: K,
    value: ReservationFormInput[K]
  ): void => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    clearFieldError(field);
  };

  return { updateValue, values };
};
