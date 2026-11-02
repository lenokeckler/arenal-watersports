import { useTransition } from "react";
import { RESERVATION_FORM_SUBMISSION_DEFAULTS } from "../constants/ReservationFormSubmission.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationFormSubmissionOptions } from "../models/ReservationFormSubmissionOptions.interface";
import { useReservationSubmissionState } from "./useReservationSubmissionState";

export const useReservationFormSubmission = (
  options?: ReservationFormSubmissionOptions
) => {
  const { submitAction, submitErrorCopy } = {
    ...RESERVATION_FORM_SUBMISSION_DEFAULTS,
    ...options,
  };
  const submission = useReservationSubmissionState();
  const [isPending, startTransition] = useTransition();

  const submit = async (
    values: ReservationFormInput
  ): Promise<ReservationFormActionResult | undefined> => {
    let result: ReservationFormActionResult;
    try {
      result = await submitAction(values);
    } catch {
      submission.setSubmissionError(submitErrorCopy);
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
