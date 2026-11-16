"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { RESERVATION_REFUND_NO_ERRORS } from "../constants/ReservationRefundDefaults.constants";
import type { ReservationRefundErrorsState } from "../models/ReservationRefundErrorsState.interface";
import type { ReservationRefundRecorded } from "../models/ReservationRefundRecorded.interface";
import type { ReservationRefundSend } from "../models/ReservationRefundSend.interface";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";
import { submitReservationRefund } from "../utils/submitReservationRefund";

export const useReservationRefundSend = (
  reservationId: string,
  values: ReservationRefundValues,
  showErrors: ReservationRefundErrorsState["showErrors"]
): ReservationRefundSend => {
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [recorded, setRecorded] =
    useState<NullableRef<ReservationRefundRecorded>>(null);

  const send = (): Promise<void> =>
    runLocked(async () => {
      showErrors(RESERVATION_REFUND_NO_ERRORS);
      const { result } = await submitReservationRefund({
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
