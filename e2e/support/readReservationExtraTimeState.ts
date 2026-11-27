import { E2E_RESERVATION_EXTRA_TIME as values } from "../constants/E2eReservationExtraTime.constants";
import { E2E_RESERVATION_EXTRA_TIME_SQL as sql } from "../constants/E2eReservationExtraTimeSql.constants";
import type { ReservationExtraTimeState } from "./models/ReservationExtraTimeState.interface";
import { runWorkerSql } from "./runWorkerSql";

export const readReservationExtraTimeState = async (
  workerId: string,
  reservationId: string
): Promise<ReservationExtraTimeState> => {
  const [outcome, minutes, charges, chargeRows] = (
    await runWorkerSql(
      values.READ_OPERATION,
      sql.READ,
      workerId,
      {
        reservation: reservationId,
      }
    )
  ).split(values.FIELD_SEPARATOR);

  return {
    chargeRows,
    charges: Number(charges),
    minutes,
    outcome,
  };
};
