"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { RESERVATION_CHARGE_NO_ERRORS } from "../constants/ReservationChargeDefaults.constants";
import type { ReservationChargeErrorsState } from "../models/ReservationChargeErrorsState.interface";
import type { ReservationChargeRecorded } from "../models/ReservationChargeRecorded.interface";
import type { ReservationChargeSend } from "../models/ReservationChargeSend.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { submitReservationCharge } from "../utils/submitReservationCharge";

export const useReservationChargeSend = (
  reservationId: string,
  values: ReservationChargeValues,
  showErrors: ReservationChargeErrorsState["showErrors"]
): ReservationChargeSend => {
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [recorded, setRecorded] =
    useState<NullableRef<ReservationChargeRecorded>>(null);

  const send = (): Promise<void> =>
    runLocked(async () => {
      showErrors(RESERVATION_CHARGE_NO_ERRORS);
      const result = await submitReservationCharge({
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
