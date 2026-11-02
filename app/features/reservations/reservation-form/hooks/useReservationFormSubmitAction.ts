import { useTransition } from "react";
import type { NullableUndefined } from "@/app/types";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { useReservationSubmissionState } from "./useReservationSubmissionState";

type ReservationSubmissionState = ReturnType<
  typeof useReservationSubmissionState
>;

const resolveSafeSubmissionErrorCopy = (
  error: unknown
): string =>
  error instanceof Error
    ? RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
    : RESERVATION_FORM_UI_COPY.SUBMIT_UNEXPECTED_ERROR;

const executeReservationAction = async (
  values: ReservationFormInput,
  submission: ReservationSubmissionState
): Promise<
  NullableUndefined<ReservationFormActionResult>
> => {
  try {
    return await createReservationAction(values);
  } catch (error: unknown) {
    submission.setSubmissionError(
      resolveSafeSubmissionErrorCopy(error)
    );
    return undefined;
  }
};

export const useReservationFormSubmitAction = (
  submission: ReservationSubmissionState
) => {
  const [isPending, startTransition] = useTransition();

  const submitReservation = (
    values: ReservationFormInput,
    onUnitUnavailable: () => void
  ): void => {
    startTransition(async () => {
      const result = await executeReservationAction(
        values,
        submission
      );
      if (!result) {
        submission.requestErrorFocus();
        return;
      }
      if (!result.ok) {
        submission.requestErrorFocus();
        if (result.unitUnavailable) {
          onUnitUnavailable();
        }
      }
      submission.applyResult(result);
    });
  };

  return { isPending, submitReservation };
};
