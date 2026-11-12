import { useTransition } from "react";
import { createPredefinedComboReservationAction } from "../actions/createPredefinedComboReservationAction";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { PredefinedComboReservationInput } from "../models/PredefinedComboReservationInput.interface";
import { mapPredefinedComboReservationResult } from "../utils/mapPredefinedComboReservationResult";
import type { useReservationSubmissionState } from "./useReservationSubmissionState";

type ReservationSubmissionState = ReturnType<
  typeof useReservationSubmissionState
>;

export const usePredefinedComboSubmitAction = (
  submission: ReservationSubmissionState
) => {
  const [isPending, startTransition] = useTransition();

  const submitPredefinedComboReservation = (
    input: PredefinedComboReservationInput,
    onSuccess?: () => void
  ): void => {
    startTransition(async () => {
      try {
        const result =
          await createPredefinedComboReservationAction(
            input
          );
        const mappedResult =
          mapPredefinedComboReservationResult(result);
        if (!mappedResult.ok) {
          submission.requestErrorFocus();
        } else {
          onSuccess?.();
        }
        submission.applyResult(mappedResult);
      } catch {
        submission.setSubmissionError(
          RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
        );
        submission.requestErrorFocus();
      }
    });
  };

  return { isPending, submitPredefinedComboReservation };
};
