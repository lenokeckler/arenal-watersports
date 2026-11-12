"use client";

import { useState } from "react";
import { STRING } from "@/app/constants";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { postponeReservationAction } from "../actions/postponeReservationAction";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import type { ReservationPostponementErrors } from "../models/ReservationPostponementErrors.interface";
import type { ReservationPostponementSubmission } from "../models/ReservationPostponementSubmission.interface";

const NO_ERRORS: ReservationPostponementErrors = {
  readings: {},
};

export const useReservationPostponementSubmission =
  (): ReservationPostponementSubmission => {
    const { isSubmitting, runLocked } = useSubmissionLock();
    const [errors, setErrors] = useState(NO_ERRORS);
    const [formError, setFormError] = useState<string>(
      STRING.Empty
    );
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isStale =
      formError ===
      RESERVATION_POSTPONEMENT_FEEDBACK_COPY.STALE;

    const clearFormError = (): void =>
      setFormError((current) =>
        current ===
        RESERVATION_POSTPONEMENT_FEEDBACK_COPY.STALE
          ? current
          : STRING.Empty
      );

    const clearFieldError: ReservationPostponementSubmission["clearFieldError"] =
      (field) => {
        setErrors((current) => ({
          ...current,
          [field]: undefined,
        }));
        clearFormError();
      };

    const clearReadingError: ReservationPostponementSubmission["clearReadingError"] =
      (itemId, field) => {
        setErrors((current) => ({
          ...current,
          readings: {
            ...current.readings,
            [itemId]: {
              ...current.readings[itemId],
              [field]: undefined,
            },
          },
        }));
        clearFormError();
      };

    const reportErrors: ReservationPostponementSubmission["reportErrors"] =
      (nextErrors) => {
        setErrors(nextErrors);
        clearFormError();
      };

    const submit: ReservationPostponementSubmission["submit"] =
      (input) =>
        runLocked(async () => {
          setFormError(STRING.Empty);
          try {
            const result =
              await postponeReservationAction(input);
            if (result.ok) {
              setErrors(NO_ERRORS);
              setIsSubmitted(true);
              return;
            }
            setErrors(result.errors);
            setFormError(result.formError ?? STRING.Empty);
          } catch {
            setFormError(
              RESERVATION_POSTPONEMENT_FEEDBACK_COPY.SUBMIT_ERROR
            );
          }
        });

    return {
      clearFieldError,
      clearReadingError,
      errors,
      formError,
      isPending: isSubmitting,
      isStale,
      isSubmitted,
      reportErrors,
      submit,
    };
  };
