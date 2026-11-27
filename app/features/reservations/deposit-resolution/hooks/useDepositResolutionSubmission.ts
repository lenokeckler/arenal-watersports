"use client";

import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionSubmission } from "../models/DepositResolutionSubmission.interface";
import type { DepositResolutionValues } from "../models/DepositResolutionValues.interface";
import { resolveDepositResolutionErrors } from "../utils/resolveDepositResolutionErrors";
import { useDepositResolutionErrors } from "./useDepositResolutionErrors";
import { useDepositResolutionSend } from "./useDepositResolutionSend";

export const useDepositResolutionSubmission = (
  deposit: Pick<
    DepositResolution,
    "amount" | "currency" | "id"
  >,
  values: DepositResolutionValues
): DepositResolutionSubmission => {
  const { clearErrors, errors, formError, showErrors } =
    useDepositResolutionErrors();
  const { isSubmitting, mayBeRecorded, recorded, send } =
    useDepositResolutionSend(deposit, values, showErrors);

  const keepErrorsWhileUnconfirmed = (): void => {
    if (!mayBeRecorded) {
      clearErrors();
    }
  };

  const handleSubmit: DepositResolutionSubmission["handleSubmit"] =
    (event) => {
      event?.preventDefault();
      if (
        isSubmitting ||
        mayBeRecorded ||
        recorded !== null
      ) {
        return;
      }
      const nextErrors = resolveDepositResolutionErrors(
        values,
        deposit
      );
      if (Object.keys(nextErrors).length > 0) {
        showErrors(nextErrors);
        return;
      }
      void send();
    };

  return {
    clearErrors: keepErrorsWhileUnconfirmed,
    errors,
    formError,
    handleSubmit,
    isPending: isSubmitting,
    mayBeRecorded,
    recorded,
  };
};
