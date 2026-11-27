"use client";

import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionViewModel } from "../models/DepositResolutionViewModel.interface";
import { createDepositResolutionEdit } from "../utils/createDepositResolutionEdit";
import { useDepositResolutionSubmission } from "./useDepositResolutionSubmission";
import { useDepositResolutionValues } from "./useDepositResolutionValues";

export const useDepositResolutionViewModel = (
  deposit: DepositResolution
): DepositResolutionViewModel => {
  const {
    keptAmount,
    setReasonText,
    setReturnedText,
    setReturnsAll,
    values,
  } = useDepositResolutionValues(deposit);
  const {
    clearErrors,
    errors,
    formError,
    handleSubmit,
    isPending,
    mayBeRecorded,
    recorded,
  } = useDepositResolutionSubmission(deposit, values);

  const edit = createDepositResolutionEdit(
    isPending,
    clearErrors
  );

  return {
    ...values,
    errors,
    formError,
    handleSubmit,
    isPending,
    isSubmitDisabled:
      isPending || mayBeRecorded || recorded !== null,
    keptAmount,
    mayBeRecorded,
    recorded,
    setReasonText: edit(setReasonText),
    setReturnedText: edit(setReturnedText),
    setReturnsAll: edit(setReturnsAll),
  };
};
