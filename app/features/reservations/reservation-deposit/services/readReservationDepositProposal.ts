import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_DEPOSIT_ERROR } from "../constants/ReservationDepositError.constants";
import { RESERVATION_DEPOSIT_QUERY } from "../constants/ReservationDepositQuery.constants";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";
import { mapReservationDepositProposal } from "../utils/mapReservationDepositProposal";

export const readReservationDepositProposal = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<ReservationDepositProposal> => {
  const { data, error } = await supabase.rpc(
    RESERVATION_DEPOSIT_QUERY.RPC.PROPOSAL,
    {
      [RESERVATION_DEPOSIT_QUERY.PROPOSAL_ARGS
        .RESERVATION_ID]: reservationId,
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_DEPOSIT_ERROR.OPERATION.READ_PROPOSAL
  );

  return mapReservationDepositProposal(data);
};
