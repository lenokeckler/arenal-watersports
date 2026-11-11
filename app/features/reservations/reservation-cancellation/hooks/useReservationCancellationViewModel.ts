"use client";

import { useState } from "react";
import { STRING } from "@/app/constants";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationCancellationFeedbackCopy.constants";
import type { ReservationCancellation } from "../models/ReservationCancellation.interface";
import type { ReservationCancellationErrors } from "../models/ReservationCancellationErrors.interface";
import type { ReservationCancellationViewModel } from "../models/ReservationCancellationViewModel.interface";
import { isReservationCancellationCause } from "../utils/isReservationCancellationCause";
import { resolveReservationCancellationErrors } from "../utils/resolveReservationCancellationErrors";

const NO_ERRORS: ReservationCancellationErrors = {};

export const useReservationCancellationViewModel = (
  cancellation: ReservationCancellation
): ReservationCancellationViewModel => {
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [cause, setCauseValue] = useState<string>(
    STRING.Empty
  );
  const [reason, setReasonValue] = useState<string>(
    STRING.Empty
  );
  const [errors, setErrors] = useState(NO_ERRORS);
  const [formError, setFormError] = useState<string>(
    STRING.Empty
  );
  const [isCancelled, setIsCancelled] = useState(false);
  const [
    confirmedRequiresCause,
    setConfirmedRequiresCause,
  ] = useState(false);
  const { requiresCause } = cancellation;
  const isStale = formError === FEEDBACK.STALE;
  const isSubmitDisabled =
    isSubmitting || isStale || isCancelled;

  const edit =
    (apply: (next: string) => void) =>
    (next: string): void => {
      if (isSubmitting) {
        return;
      }
      apply(next);
      setErrors(NO_ERRORS);
      setFormError((current) =>
        current === FEEDBACK.STALE ? current : STRING.Empty
      );
    };

  const setCause = edit(setCauseValue);
  const setReason = edit(setReasonValue);

  const submit = (): Promise<void> =>
    runLocked(async () => {
      setFormError(STRING.Empty);
      try {
        const result = await cancelReservationAction({
          cause:
            requiresCause &&
            isReservationCancellationCause(cause)
              ? cause
              : null,
          expectedUpdatedAt: cancellation.expectedUpdatedAt,
          reason: reason.trim(),
          reservationId: cancellation.id,
        });
        if (result.ok) {
          setConfirmedRequiresCause(requiresCause);
          setIsCancelled(true);
          return;
        }
        setErrors(result.errors);
        setFormError(result.formError ?? STRING.Empty);
      } catch {
        setFormError(FEEDBACK.SUBMIT_ERROR);
      }
    });

  const handleSubmit: ReservationCancellationViewModel["handleSubmit"] =
    (event) => {
      event?.preventDefault();
      if (isSubmitDisabled) {
        return;
      }
      const nextErrors =
        resolveReservationCancellationErrors(
          cause,
          reason,
          requiresCause
        );
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
      void submit();
    };

  return {
    cause,
    confirmedRequiresCause,
    errors,
    formError,
    handleSubmit,
    isCancelled,
    isPending: isSubmitting,
    isStale,
    isSubmitDisabled,
    reason,
    requiresCause,
    setCause,
    setReason,
  };
};
