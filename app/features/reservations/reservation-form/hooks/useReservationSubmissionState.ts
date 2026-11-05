import { useState } from "react";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import { useReservationErrorFocusRequest } from "./useReservationErrorFocusRequest";
import { useReservationSubmissionErrors } from "./useReservationSubmissionErrors";

export const useReservationSubmissionState = () => {
  const submissionErrors = useReservationSubmissionErrors();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errorFocus = useReservationErrorFocusRequest();

  const clearFieldError = (
    field: ReservationFormField
  ): void => {
    submissionErrors.clearFieldError(field);
    setIsSubmitted(false);
  };
  const applyResult = (
    result: ReservationFormActionResult
  ): void => {
    submissionErrors.applyResult(result);
    setIsSubmitted(result.ok);
  };

  return {
    ...submissionErrors,
    applyResult,
    clearFieldError,
    errorFocusRequest: errorFocus.errorFocusRequest,
    isSubmitted,
    requestErrorFocus: errorFocus.requestErrorFocus,
  };
};
