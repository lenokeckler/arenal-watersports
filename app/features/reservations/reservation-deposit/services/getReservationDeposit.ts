import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { RESERVATION_DEPOSIT_NO_PROPOSAL } from "../constants/ReservationDepositDefaults.constants";
import type { ReservationDeposit } from "../models/ReservationDeposit.interface";
import { mapReservationDeposit } from "../utils/mapReservationDeposit";
import { resolveReservationDepositUnavailableReason } from "../utils/resolveReservationDepositUnavailableReason";
import { readReservationDepositProposal } from "./readReservationDepositProposal";
import { readReservationDepositRow } from "./readReservationDepositRow";

export const getReservationDeposit = async (
  reservationId: string
): Promise<NullableRef<ReservationDeposit>> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const row = await readReservationDepositRow(
    supabase,
    reservationId
  );

  if (row === null) {
    return null;
  }

  const deposit = mapReservationDeposit(
    row,
    RESERVATION_DEPOSIT_NO_PROPOSAL
  );

  if (resolveReservationDepositUnavailableReason(deposit)) {
    return deposit;
  }

  return {
    ...deposit,
    proposal: await readReservationDepositProposal(
      supabase,
      reservationId
    ),
  };
};
