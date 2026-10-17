import { useTransition } from "react";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import { useReservationSubmissionState } from "./useReservationSubmissionState";

export const useReservationFormSubmission = () => {
  const submission = useReservationSubmissionState();
  const [isPending, startTransition] = useTransition();

  const submit = async (
    values: ReservationFormInput
  ): Promise<void> => {
    let result: ReservationFormActionResult;
    try {
      result = await createReservationAction(values);
    } catch {
      submission.setSubmissionError(
        RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
      );
      return;
    }
    submission.applyResult(result);
  };

  const submitReservation = (
    values: ReservationFormInput
  ): void => {
    startTransition(() => submit(values));
  };

  return {
    clearFieldError: submission.clearFieldError,
    errors: submission.errors,
    formError: submission.formError,
    isPending,
    isSubmitted: submission.isSubmitted,
    setFieldError: submission.setFieldError,
    submitReservation,
  };
};
