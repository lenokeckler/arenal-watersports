"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { DEPOSIT_RESOLUTION_NO_ERRORS } from "../constants/DepositResolutionDefaults.constants";
import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionErrorsState } from "../models/DepositResolutionErrorsState.interface";
import type { DepositResolutionRecorded } from "../models/DepositResolutionRecorded.interface";
import type { DepositResolutionSend } from "../models/DepositResolutionSend.interface";
import type { DepositResolutionValues } from "../models/DepositResolutionValues.interface";
import { submitDepositResolution } from "../utils/submitDepositResolution";
import { toDepositResolutionInput } from "../utils/toDepositResolutionInput";

export const useDepositResolutionSend = (
  deposit: Pick<DepositResolution, "amount" | "id">,
  values: DepositResolutionValues,
  showErrors: DepositResolutionErrorsState["showErrors"]
): DepositResolutionSend => {
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [mayBeRecorded, setMayBeRecorded] = useState(false);
  const [recorded, setRecorded] =
    useState<NullableRef<DepositResolutionRecorded>>(null);

  const send = (): Promise<void> =>
    runLocked(async () => {
      showErrors(DEPOSIT_RESOLUTION_NO_ERRORS);
      const { mayBeRecorded: unconfirmed, result } =
        await submitDepositResolution(
          toDepositResolutionInput(values, deposit)
        );
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
