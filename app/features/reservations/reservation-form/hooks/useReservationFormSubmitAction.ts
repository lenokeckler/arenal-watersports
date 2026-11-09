import { useTransition } from "react";
import type { NullableUndefined } from "@/app/types";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationFormSubmissionOptions } from "../models/ReservationFormSubmissionOptions.interface";
import type { useReservationSubmissionState } from "./useReservationSubmissionState";

type ReservationSubmissionState = ReturnType<
  typeof useReservationSubmissionState
>;

type ResolvedSubmissionOptions =
  Required<ReservationFormSubmissionOptions>;

const resolveSafeSubmissionErrorCopy = (
  error: unknown,
  submitErrorCopy: string
): string =>
  error instanceof Error
    ? submitErrorCopy
    : RESERVATION_FORM_UI_COPY.SUBMIT_UNEXPECTED_ERROR;

const executeReservationAction = async (
  values: ReservationFormInput,
  submission: ReservationSubmissionState,
  options: ResolvedSubmissionOptions
): Promise<
  NullableUndefined<ReservationFormActionResult>
> => {
  try {
    return await options.submitAction(values);
  } catch (error: unknown) {
    submission.setSubmissionError(
      resolveSafeSubmissionErrorCopy(
        error,
        options.submitErrorCopy
      )
    );
    return undefined;
  }
};

export const useReservationFormSubmitAction = (
  submission: ReservationSubmissionState,
  options: ResolvedSubmissionOptions
) => {
  const [isPending, startTransition] = useTransition();

  const submitReservation = (
    values: ReservationFormInput,
    onUnitUnavailable: () => void,
    onSuccess?: () => void
  ): void => {
    startTransition(async () => {
      const result = await executeReservationAction(
        values,
        submission,
        options
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
      } else {
        onSuccess?.();
      }
      submission.applyResult(result);
    });
  };

  return { isPending, submitReservation };
};
