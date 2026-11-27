import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_DEPOSIT_ERROR } from "../constants/ReservationDepositError.constants";
import { RESERVATION_DEPOSIT_QUERY } from "../constants/ReservationDepositQuery.constants";
import type { ReservationDepositCommand } from "../models/ReservationDepositCommand.type";
import type { ReservationDepositRecorded } from "../models/ReservationDepositRecorded.interface";
import { mapReservationDepositRecorded } from "../utils/mapReservationDepositRecorded";

const { PAYLOAD_KEY } = RESERVATION_DEPOSIT_QUERY;

const buildPayload = (
  command: ReservationDepositCommand
) =>
  command.hasDeposit
    ? {
        [PAYLOAD_KEY.AMOUNT]: command.amount,
        [PAYLOAD_KEY.CURRENCY]: command.currency,
        [PAYLOAD_KEY.HAS_DEPOSIT]: true,
        [PAYLOAD_KEY.RESERVATION_ID]: command.reservationId,
      }
    : {
        [PAYLOAD_KEY.HAS_DEPOSIT]: false,
        [PAYLOAD_KEY.RESERVATION_ID]: command.reservationId,
      };

export const recordReservationDeposit = async (
  command: ReservationDepositCommand
): Promise<ReservationDepositRecorded> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    RESERVATION_DEPOSIT_QUERY.RPC.RECORD,
    { [PAYLOAD_KEY.PAYLOAD]: buildPayload(command) }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_DEPOSIT_ERROR.OPERATION.RECORD
  );

  const [row] = data ?? [];

  if (!row) {
    throw new Error(
      RESERVATION_DEPOSIT_ERROR.OPERATION.MISSING_DEPOSIT
    );
  }

  return mapReservationDepositRecorded(row);
};
