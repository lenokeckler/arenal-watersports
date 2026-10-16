"use client";

import { useState, useTransition } from "react";
import { STRING } from "@/app/constants";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_DEFAULT_VALUES } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";

const EMPTY_ERRORS: Partial<
  Record<ReservationFormField, string>
> = {};

export const useReservationFormViewModel = (
  initialDate: string,
  initialCategoryId: string
): ReservationFormViewModel => {
  const [values, setValues] =
    useState<ReservationFormInput>({
      ...RESERVATION_FORM_DEFAULT_VALUES,
      date: initialDate,
      categoryId: initialCategoryId,
    });
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [formError, setFormError] = useState<string>(
    STRING.Empty
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

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
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
    setFormError(STRING.Empty);
    setIsSubmitted(false);
  };

  const handleSubmit: ReservationFormViewModel["handleSubmit"] =
    (event) => {
      event.preventDefault();
      startTransition(async () => {
        let result: ReservationFormActionResult;
        try {
          result = await createReservationAction(values);
        } catch {
          setFormError(
            RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
          );
          return;
        }
        if (result.ok) {
          setErrors(EMPTY_ERRORS);
          setFormError(STRING.Empty);
          setIsSubmitted(true);
          return;
        }
        setErrors(result.errors);
        setFormError(result.formError ?? STRING.Empty);
      });
    };

  return {
    errors,
    formError,
    isPending,
    isSubmitted,
    values,
    handleCustomerNameChange: (value) =>
      updateValue("customerName", value),
    handleDateChange: (value) => updateValue("date", value),
    handleDurationChange: (value) =>
      updateValue("durationHours", value),
    handlePeopleCountChange: (value) =>
      updateValue("peopleCount", value),
    handleQuantityChange: (value) =>
      updateValue("quantity", value),
    handleCategoryChange: (value) =>
      updateValue("categoryId", value),
    handleTimeChange: (value) => updateValue("time", value),
    handleSubmit,
  };
};
