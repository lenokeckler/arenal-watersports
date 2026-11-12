"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import {
  RESERVATION_CHARGE_NO_ERRORS,
  RESERVATION_CHARGE_NO_FORM_ERROR,
} from "../constants/ReservationChargeDefaults.constants";
import { RESERVATION_CHARGE_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationChargeFeedbackCopy.constants";
import type { ReservationChargeRecorded } from "../models/ReservationChargeRecorded.interface";
import type { ReservationChargeSubmission } from "../models/ReservationChargeSubmission.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeErrors } from "../utils/resolveReservationChargeErrors";

export const useReservationChargeSubmission = (
  reservationId: string,
  values: ReservationChargeValues
): ReservationChargeSubmission => {
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [errors, setErrors] = useState(
    RESERVATION_CHARGE_NO_ERRORS
  );
  const [formError, setFormError] = useState(
    RESERVATION_CHARGE_NO_FORM_ERROR
  );
  const [recorded, setRecorded] =
    useState<NullableRef<ReservationChargeRecorded>>(null);

  const clearErrors = (): void => {
    setErrors(RESERVATION_CHARGE_NO_ERRORS);
    setFormError(RESERVATION_CHARGE_NO_FORM_ERROR);
  };

  const submit = (): Promise<void> =>
    runLocked(async () => {
      setFormError(RESERVATION_CHARGE_NO_FORM_ERROR);
      try {
        const result = await recordReservationChargeAction({
          ...values,
          reservationId,
        });
        if (result.ok) {
          setRecorded(result.recorded);
          return;
        }
        setErrors(result.errors);
        setFormError(
          result.formError ??
            RESERVATION_CHARGE_NO_FORM_ERROR
        );
      } catch {
        setFormError(FEEDBACK.OFFLINE);
      }
    });

  const handleSubmit: ReservationChargeSubmission["handleSubmit"] =
    (event) => {
      event?.preventDefault();
      if (isSubmitting || recorded !== null) {
        return;
      }
      const nextErrors =
        resolveReservationChargeErrors(values);
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
      void submit();
    };

  return {
    clearErrors,
    errors,
    formError,
    handleSubmit,
    isPending: isSubmitting,
    recorded,
  };
};
