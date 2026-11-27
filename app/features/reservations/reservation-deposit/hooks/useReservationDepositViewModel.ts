"use client";

import type { ReservationDeposit } from "../models/ReservationDeposit.interface";
import type { ReservationDepositViewModel } from "../models/ReservationDepositViewModel.interface";
import { createReservationDepositEdit } from "../utils/createReservationDepositEdit";
import { useReservationDepositSubmission } from "./useReservationDepositSubmission";
import { useReservationDepositValues } from "./useReservationDepositValues";

export const useReservationDepositViewModel = (
  deposit: ReservationDeposit
): ReservationDepositViewModel => {
  const {
    proposal,
    setAmountText,
    setCurrency,
    setHasDeposit,
    values,
  } = useReservationDepositValues(deposit.proposal);
  const {
    clearErrors,
    errors,
    formError,
    handleSubmit,
    isPending,
    mayBeRecorded,
    recorded,
  } = useReservationDepositSubmission(deposit.id, values);

  const edit = createReservationDepositEdit(
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
    mayBeRecorded,
    proposal,
    recorded,
    setAmountText: edit(setAmountText),
    setCurrency: edit(setCurrency),
    setHasDeposit: edit(setHasDeposit),
  };
};
