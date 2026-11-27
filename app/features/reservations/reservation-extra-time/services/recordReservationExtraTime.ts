import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_EXTRA_TIME_ERROR } from "../constants/ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_QUERY as QUERY } from "../constants/ReservationExtraTimeQuery.constants";
import type { ReservationExtraTimeCommand } from "../models/ReservationExtraTimeCommand.interface";
import type { ReservationExtraTimeRecorded } from "../models/ReservationExtraTimeRecorded.interface";
import { mapReservationExtraTimeRecorded } from "../utils/mapReservationExtraTimeRecorded";

const { PAYLOAD_KEY } = QUERY;

export const recordReservationExtraTime = async (
  command: ReservationExtraTimeCommand
): Promise<ReservationExtraTimeRecorded> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    QUERY.RPC.RECORD,
    {
      [PAYLOAD_KEY.PAYLOAD]: {
        [PAYLOAD_KEY.OUTCOME]: command.outcome,
        [PAYLOAD_KEY.RESERVATION_ID]: command.reservationId,
        ...(command.charge === null
          ? {}
          : {
              [PAYLOAD_KEY.AMOUNT]: command.charge.amount,
              [PAYLOAD_KEY.CURRENCY]:
                command.charge.currency,
              [PAYLOAD_KEY.PAYMENT_METHOD]:
                command.charge.paymentMethod,
            }),
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_EXTRA_TIME_ERROR.OPERATION.RECORD
  );

  const [row] = data ?? [];

  if (!row) {
    throw new Error(
      RESERVATION_EXTRA_TIME_ERROR.OPERATION.MISSING_RECORD
    );
  }

  return mapReservationExtraTimeRecorded(row);
};
