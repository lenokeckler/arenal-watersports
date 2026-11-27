"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { RESERVATION_DEPOSIT_NO_ERRORS } from "../constants/ReservationDepositDefaults.constants";
import type { ReservationDepositErrorsState } from "../models/ReservationDepositErrorsState.interface";
import type { ReservationDepositRecorded } from "../models/ReservationDepositRecorded.interface";
import type { ReservationDepositSend } from "../models/ReservationDepositSend.interface";
import type { ReservationDepositValues } from "../models/ReservationDepositValues.interface";
import { submitReservationDeposit } from "../utils/submitReservationDeposit";

export const useReservationDepositSend = (
  reservationId: string,
  values: ReservationDepositValues,
  showErrors: ReservationDepositErrorsState["showErrors"]
): ReservationDepositSend => {
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [mayBeRecorded, setMayBeRecorded] = useState(false);
  const [recorded, setRecorded] =
    useState<NullableRef<ReservationDepositRecorded>>(null);

  const send = (): Promise<void> =>
    runLocked(async () => {
      showErrors(RESERVATION_DEPOSIT_NO_ERRORS);
      const { mayBeRecorded: unconfirmed, result } =
        await submitReservationDeposit({
          ...values,
          reservationId,
        });
      if (unconfirmed) {
        setMayBeRecorded(true);
      }
      if (result.ok) {
        setRecorded(result.recorded);
        return;
      }
      showErrors(result.errors, result.formError);
    });

  return { isSubmitting, mayBeRecorded, recorded, send };
};
