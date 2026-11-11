"use client";

import { useState } from "react";
import { STRING } from "@/app/constants";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import { splitReservationAction } from "../actions/splitReservationAction";
import type { ReservationSplitCreatedDeparture } from "../models/ReservationSplitCreatedDeparture.interface";
import type { ReservationSplitErrors } from "../models/ReservationSplitErrors.interface";
import type { ReservationSplitInput } from "../models/ReservationSplitInput.interface";
import type { ReservationSplitSubmission } from "../models/ReservationSplitSubmission.interface";

const NO_ERRORS: ReservationSplitErrors = {
  departures: [],
};
const NO_DEPARTURES: ReservationSplitCreatedDeparture[] =
  [];

export const useReservationSplitSubmission =
  (): ReservationSplitSubmission => {
    const { isSubmitting, runLocked } = useSubmissionLock();
    const [errors, setErrors] = useState(NO_ERRORS);
    const [formError, setFormError] = useState<string>(
      STRING.Empty
    );
    const [createdDepartures, setCreatedDepartures] =
      useState(NO_DEPARTURES);
    const isStale =
      formError === RESERVATION_SPLIT_FEEDBACK_COPY.STALE;

    const clearFormError = (): void =>
      setFormError((current) =>
        current === RESERVATION_SPLIT_FEEDBACK_COPY.STALE
          ? current
          : STRING.Empty
      );

    const clearErrors = (): void => {
      setErrors(NO_ERRORS);
      clearFormError();
    };

    const reportErrors = (
      nextErrors: ReservationSplitErrors
    ): void => {
      setErrors(nextErrors);
      clearFormError();
    };

    const clearDepartureError: ReservationSplitSubmission["clearDepartureError"] =
      (index, field) => {
        setErrors((current) => ({
          ...current,
          departures: current.departures.map(
            (departure, position) =>
              position === index
                ? { ...departure, [field]: undefined }
                : departure
          ),
        }));
        clearFormError();
      };

    const submit = (
      input: ReservationSplitInput
    ): Promise<void> =>
      runLocked(async () => {
        setFormError(STRING.Empty);
        try {
          const result =
            await splitReservationAction(input);
          if (result.ok) {
            setErrors(NO_ERRORS);
            setFormError(STRING.Empty);
            setCreatedDepartures(result.departures);
            return;
          }
          setErrors(result.errors);
          setFormError(result.formError ?? STRING.Empty);
        } catch {
          setFormError(
            RESERVATION_SPLIT_FEEDBACK_COPY.NETWORK_ERROR
          );
        }
      });

    return {
      clearDepartureError,
      clearErrors,
      createdDepartures,
      errors,
      formError,
      isPending: isSubmitting,
      isStale,
      reportErrors,
      submit,
    };
  };
