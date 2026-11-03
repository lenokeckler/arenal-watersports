import { useReservationFormErrorFocus } from "./useReservationFormErrorFocus";
import { useReservationFormSubmitAction } from "./useReservationFormSubmitAction";
import { useReservationSubmissionState } from "./useReservationSubmissionState";

export const useReservationFormSubmission = () => {
  const submission = useReservationSubmissionState();
  const action = useReservationFormSubmitAction(submission);
  useReservationFormErrorFocus(submission);

  return {
    clearFieldError: submission.clearFieldError,
    errors: submission.errors,
    formError: submission.formError,
    isPending: action.isPending,
    isSubmitted: submission.isSubmitted,
    submitReservation: action.submitReservation,
  };
};
