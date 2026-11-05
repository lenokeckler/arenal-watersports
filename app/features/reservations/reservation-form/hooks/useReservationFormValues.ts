import { useState } from "react";
import { RESERVATION_FORM_DEFAULT_VALUES } from "../constants/ReservationFormUi.constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationFormValueField } from "../models/ReservationFormValueField.type";

export const useReservationFormValues = (
  initialDate: string,
  initialCategoryId: string,
  clearFieldError: (field: ReservationFormField) => void
) => {
  const [values, setValues] =
    useState<ReservationFormInput>({
      ...RESERVATION_FORM_DEFAULT_VALUES,
      date: initialDate,
      categoryId: initialCategoryId,
    });

  const updateValue = <K extends ReservationFormValueField>(
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
