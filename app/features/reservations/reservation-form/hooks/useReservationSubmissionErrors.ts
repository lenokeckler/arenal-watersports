import { useState } from "react";
import { STRING } from "@/app/constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormField } from "../models/ReservationFormField.constants";

const EMPTY_ERRORS: Partial<
  Record<ReservationFormField, string>
> = {};

export const useReservationSubmissionErrors = () => {
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [formError, setFormError] = useState<string>(
    STRING.Empty
  );

  const clearFieldError = (field: ReservationFormField) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
    setFormError(STRING.Empty);
  };
  const applyResult = (
    result: ReservationFormActionResult
  ): void => {
    if (result.ok) {
      setErrors(EMPTY_ERRORS);
      setFormError(STRING.Empty);
      return;
    }
    setErrors(result.errors);
    setFormError(result.formError ?? STRING.Empty);
  };
  const setSubmissionError = (message: string): void => {
    setErrors(EMPTY_ERRORS);
    setFormError(message);
  };

  return {
    applyResult,
    clearFieldError,
    errors,
    formError,
    setSubmissionError,
  };
};
