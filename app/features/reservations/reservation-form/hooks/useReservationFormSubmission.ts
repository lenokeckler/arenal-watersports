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
  ): Promise<ReservationFormActionResult | undefined> => {
    let result: ReservationFormActionResult;
    try {
      result = await createReservationAction(values);
    } catch {
      submission.setSubmissionError(
        RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
      );
      return undefined;
    }
    return result;
  };

  const submitReservation = (
    values: ReservationFormInput,
    onUnitUnavailable: () => void
  ): void => {
    startTransition(async () => {
      const result = await submit(values);
      if (!result) {
        return;
      }
      if (!result.ok && result.unitUnavailable) {
        onUnitUnavailable();
      }
      submission.applyResult(result);
    });
  };

  return {
    clearFieldError: submission.clearFieldError,
    errors: submission.errors,
    formError: submission.formError,
    isPending,
    isSubmitted: submission.isSubmitted,
    submitReservation,
  };
};
