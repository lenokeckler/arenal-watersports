import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_QUERY } from "../constants/ReservationRefundQuery.constants";
import type { ReservationRefundCommand } from "../models/ReservationRefundCommand.interface";
import type { ReservationRefundRecorded } from "../models/ReservationRefundRecorded.interface";
import { mapReservationRefundRecorded } from "../utils/mapReservationRefundRecorded";

const { PAYLOAD_KEY } = RESERVATION_REFUND_QUERY;

export const recordReservationRefund = async (
  command: ReservationRefundCommand
): Promise<ReservationRefundRecorded> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    RESERVATION_REFUND_QUERY.RPC.RECORD,
    {
      [PAYLOAD_KEY.PAYLOAD]: {
        [PAYLOAD_KEY.AMOUNT]: command.amount,
        [PAYLOAD_KEY.CURRENCY]: command.currency,
        [PAYLOAD_KEY.REASON]: command.reason,
        [PAYLOAD_KEY.RESERVATION_ID]: command.reservationId,
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_REFUND_ERROR.OPERATION.RECORD
  );

  const [row] = data ?? [];

  if (!row) {
    throw new Error(
      RESERVATION_REFUND_ERROR.OPERATION.MISSING_REFUND
    );
  }

  return mapReservationRefundRecorded(row);
};
