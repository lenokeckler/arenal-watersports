import { useTransition } from "react";
import { useReservationSubmissionState } from "./useReservationSubmissionState";
import { createReservationFormSubmissionCallbacks } from "../utils/createReservationFormSubmissionCallbacks";

export const useReservationFormSubmission = () => {
  const submission = useReservationSubmissionState();
  const [isPending, startTransition] = useTransition();
  const submitters =
    createReservationFormSubmissionCallbacks(
      submission,
      startTransition
    );

  return {
    ...submitters,
    clearFieldError: submission.clearFieldError,
    clearSubmissionStatus: submission.clearSubmissionStatus,
    errors: submission.errors,
    formError: submission.formError,
    isPending,
    isSubmitted: submission.isSubmitted,
    setFieldError: submission.setFieldError,
    setSubmissionError: submission.setSubmissionError,
  };
};
