import { STRING } from "@/app/constants";
import { EMPTY_RESERVATION_FORM_ERRORS } from "../constants/ReservationSubmissionState.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationSubmissionStateSetters } from "../models/ReservationSubmissionStateSetters.interface";

const applySubmissionResult = (
  result: ReservationFormActionResult,
  setters: ReservationSubmissionStateSetters
): void => {
  if (result.ok) {
    setters.setErrors(EMPTY_RESERVATION_FORM_ERRORS);
    setters.setFormError(STRING.Empty);
    setters.setIsSubmitted(true);
    return;
  }
  setters.setErrors(result.errors);
  setters.setFormError(result.formError ?? STRING.Empty);
};

export const createReservationSubmissionStateHandlers = (
  setters: ReservationSubmissionStateSetters
) => ({
  applyResult: (
    result: ReservationFormActionResult
  ): void => applySubmissionResult(result, setters),
  clearFieldError: (field: ReservationFormField): void => {
    setters.setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
    setters.setFormError(STRING.Empty);
    setters.setIsSubmitted(false);
  },
  clearSubmissionStatus: (): void => {
    setters.setFormError(STRING.Empty);
    setters.setIsSubmitted(false);
  },
  setFieldError: (
    field: ReservationFormField,
    message: string
  ): void => {
    setters.setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: message,
    }));
    setters.setFormError(STRING.Empty);
    setters.setIsSubmitted(false);
  },
});
