import { useTransition } from "react";
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import { mapCustomComboReservationResult } from "../utils/mapCustomComboReservationResult";
import type { useReservationSubmissionState } from "./useReservationSubmissionState";

type ReservationSubmissionState = ReturnType<
  typeof useReservationSubmissionState
>;

export const useCustomComboSubmitAction = (
  submission: ReservationSubmissionState
) => {
  const [isPending, startTransition] = useTransition();

  const submitCustomComboReservation = (
    input: CustomComboReservationInput
  ): void => {
    startTransition(async () => {
      try {
        const result =
          await createCustomComboReservationAction(input);
        const mappedResult =
          mapCustomComboReservationResult(result);
        if (!mappedResult.ok) {
          submission.requestErrorFocus();
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

  return { isPending, submitCustomComboReservation };
};
