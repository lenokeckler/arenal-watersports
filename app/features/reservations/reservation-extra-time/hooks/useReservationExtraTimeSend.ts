"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { RESERVATION_EXTRA_TIME_NO_ERRORS } from "../constants/ReservationExtraTimeDefaults.constants";
import type { ReservationExtraTimeErrorsState } from "../models/ReservationExtraTimeErrorsState.interface";
import type { ReservationExtraTimeRecorded } from "../models/ReservationExtraTimeRecorded.interface";
import type { ReservationExtraTimeSend } from "../models/ReservationExtraTimeSend.interface";
import type { ReservationExtraTimeValues } from "../models/ReservationExtraTimeValues.interface";
import { submitReservationExtraTime } from "../utils/submitReservationExtraTime";

export const useReservationExtraTimeSend = (
  reservationId: string,
  values: ReservationExtraTimeValues,
  showErrors: ReservationExtraTimeErrorsState["showErrors"]
): ReservationExtraTimeSend => {
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [recorded, setRecorded] =
    useState<NullableRef<ReservationExtraTimeRecorded>>(
      null
    );

  const send = (): Promise<void> =>
    runLocked(async () => {
      showErrors(RESERVATION_EXTRA_TIME_NO_ERRORS);
      const result = await submitReservationExtraTime({
        ...values,
        reservationId,
      });
      if (result.ok) {
        setRecorded(result.recorded);
        return;
      }
      showErrors(result.errors, result.formError);
    });

  return { isSubmitting, recorded, send };
};
