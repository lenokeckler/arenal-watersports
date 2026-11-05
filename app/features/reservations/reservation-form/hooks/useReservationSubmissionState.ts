import { useState } from "react";
import { STRING } from "@/app/constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormErrorField } from "../models/ReservationFormField.constants";

const EMPTY_ERRORS: Partial<
  Record<ReservationFormErrorField, string>
> = {};

export const useReservationSubmissionState = () => {
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [formError, setFormError] = useState<string>(
    STRING.Empty
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const clearFieldError = (
    field: ReservationFormErrorField
  ) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
    setFormError(STRING.Empty);
    setIsSubmitted(false);
  };
  const setFieldError = (
    field: ReservationFormErrorField,
    message: string
  ): void => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: message,
    }));
    setFormError(STRING.Empty);
    setIsSubmitted(false);
  };
  const applyResult = (
    result: ReservationFormActionResult
  ): void => {
    if (result.ok) {
      setErrors(EMPTY_ERRORS);
      setFormError(STRING.Empty);
      setIsSubmitted(true);
      return;
    }
    setErrors(result.errors);
    setFormError(result.formError ?? STRING.Empty);
  };

  return {
    applyResult,
    clearFieldError,
    errors,
    formError,
    isSubmitted,
    setSubmissionError: setFormError,
    setFieldError,
  };
};
