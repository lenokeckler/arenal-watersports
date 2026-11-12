import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_CHARGE_ERROR } from "../constants/ReservationChargeError.constants";
import { RESERVATION_CHARGE_QUERY } from "../constants/ReservationChargeQuery.constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import { mapReservationChargeProposal } from "../utils/mapReservationChargeProposal";

export const readReservationChargeProposal = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<ReservationChargeProposal> => {
  const { data, error } = await supabase.rpc(
    RESERVATION_CHARGE_QUERY.RPC.PROPOSAL,
    {
      [RESERVATION_CHARGE_QUERY.PROPOSAL_ARGS
        .RESERVATION_ID]: reservationId,
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_CHARGE_ERROR.OPERATION.READ_PROPOSAL
  );

  return mapReservationChargeProposal(data);
};
