import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_QUERY } from "../constants/ReservationRefundQuery.constants";
import { mapReservationRefundableNet } from "../utils/mapReservationRefundableNet";

export const readReservationRefundableNet = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<ReservationRefundableAmount[]> => {
  const { data, error } = await supabase.rpc(
    RESERVATION_REFUND_QUERY.RPC.NET,
    {
      [RESERVATION_REFUND_QUERY.NET_ARGS.RESERVATION_ID]:
        reservationId,
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_REFUND_ERROR.OPERATION.READ_NET
  );

  return mapReservationRefundableNet(data ?? []);
};
