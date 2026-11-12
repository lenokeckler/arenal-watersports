import { STRING } from "@/app/constants";
import { E2E_RESERVATION_POSTPONEMENT as values } from "../constants/E2eReservationPostponement.constants";
import { E2E_RESERVATION_POSTPONEMENT_SQL as sql } from "../constants/E2eReservationPostponementSql.constants";
import type { ReservationPostponementState } from "./models/ReservationPostponementState.interface";
import { runWorkerSql } from "./runWorkerSql";

export const readReservationPostponementState = async (
  workerId: string,
  reservationId: string
): Promise<ReservationPostponementState> => {
  const row = await runWorkerSql(
    values.READ_OPERATION,
    sql.READ,
    workerId,
    { reservation: reservationId }
  );
  const [
    status,
    startsAt,
    charges,
    deposits,
    openDispatches,
    cause,
    reason,
    isAuthor,
    wasDispatched,
    readings,
  ] = row.split(values.FIELD_SEPARATOR);

  return {
    cause,
    charges: Number(charges),
    deposits: Number(deposits),
    isAuthor: isAuthor === STRING.TRUE,
    openDispatches: Number(openDispatches),
    readings: Number(readings),
    reason,
    startsAt,
    status,
    wasDispatched: wasDispatched === STRING.TRUE,
  };
};
