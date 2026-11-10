import { RESERVATION_FORM_SUBMISSION_DEFAULTS } from "../constants/ReservationFormSubmission.constants";
import type { ReservationFormSubmissionOptions } from "../models/ReservationFormSubmissionOptions.interface";
import { useReservationFormErrorFocus } from "./useReservationFormErrorFocus";
import { useReservationFormSubmitAction } from "./useReservationFormSubmitAction";
import { useReservationSubmissionState } from "./useReservationSubmissionState";
import { useCustomComboSubmitAction } from "./useCustomComboSubmitAction";

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
  const customComboAction =
    useCustomComboSubmitAction(submission);
  useReservationFormErrorFocus(submission);

  return {
    applyResult: submission.applyResult,
    clearFieldError: submission.clearFieldError,
    errors: submission.errors,
    formError: submission.formError,
    isPending:
      action.isPending || customComboAction.isPending,
    isSubmitted: submission.isSubmitted,
    requestErrorFocus: submission.requestErrorFocus,
    setFieldError: submission.setFieldError,
    submitCustomComboReservation:
      customComboAction.submitCustomComboReservation,
    submitReservation: action.submitReservation,
  };
};
