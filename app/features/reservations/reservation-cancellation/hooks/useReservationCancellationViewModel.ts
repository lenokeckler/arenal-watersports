"use client";

import { useState } from "react";
import { STRING } from "@/app/constants";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationCancellationFeedbackCopy.constants";
import type { ReservationCancellation } from "../models/ReservationCancellation.interface";
import type { ReservationCancellationErrors } from "../models/ReservationCancellationErrors.interface";
import type { ReservationCancellationViewModel } from "../models/ReservationCancellationViewModel.interface";
import { resolveReservationCancellationReasonError } from "../utils/resolveReservationCancellationReasonError";

const NO_ERRORS: ReservationCancellationErrors = {};

export const useReservationCancellationViewModel = (
  cancellation: ReservationCancellation
): ReservationCancellationViewModel => {
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [reason, setReasonValue] = useState<string>(
    STRING.Empty
  );
  const [errors, setErrors] = useState(NO_ERRORS);
  const [formError, setFormError] = useState<string>(
    STRING.Empty
  );
  const [isCancelled, setIsCancelled] = useState(false);
  const isStale = formError === FEEDBACK.STALE;
  const isSubmitDisabled =
    isSubmitting || isStale || isCancelled;

  const setReason = (nextReason: string): void => {
    if (isSubmitting) {
      return;
    }
    setReasonValue(nextReason);
    setErrors(NO_ERRORS);
    setFormError((current) =>
      current === FEEDBACK.STALE ? current : STRING.Empty
    );
  };

  const submit = (): Promise<void> =>
    runLocked(async () => {
      setFormError(STRING.Empty);
      try {
        const result = await cancelReservationAction({
          expectedUpdatedAt: cancellation.expectedUpdatedAt,
          reason: reason.trim(),
          reservationId: cancellation.id,
        });
        if (result.ok) {
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
      const reasonError =
        resolveReservationCancellationReasonError(reason);
      if (reasonError) {
        setErrors({ reason: reasonError });
        return;
      }
      void submit();
    };

  return {
    errors,
    formError,
    handleSubmit,
    isCancelled,
    isPending: isSubmitting,
    isStale,
    isSubmitDisabled,
    reason,
    setReason,
  };
};
