import { RESERVATION_FORM_SUBMISSION_DEFAULTS } from "../constants/ReservationFormSubmission.constants";
import type { ReservationFormSubmissionOptions } from "../models/ReservationFormSubmissionOptions.interface";
import { useReservationFormErrorFocus } from "./useReservationFormErrorFocus";
import { useReservationFormSubmitAction } from "./useReservationFormSubmitAction";
import { useReservationSubmissionState } from "./useReservationSubmissionState";

export const useReservationFormSubmission = (
  options?: ReservationFormSubmissionOptions
) => {
  const submission = useReservationSubmissionState();
  const action = useReservationFormSubmitAction(
    submission,
    {
      ...RESERVATION_FORM_SUBMISSION_DEFAULTS,
      ...options,
    }
  );
  useReservationFormErrorFocus(submission);

  return {
    applyResult: submission.applyResult,
    clearFieldError: submission.clearFieldError,
    errors: submission.errors,
    formError: submission.formError,
    isPending: action.isPending,
    isSubmitted: submission.isSubmitted,
    requestErrorFocus: submission.requestErrorFocus,
    submitReservation: action.submitReservation,
  };
};
