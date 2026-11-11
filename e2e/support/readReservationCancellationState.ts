import { STRING } from "@/app/constants";
import {
  E2E_RESERVATION_CANCELLATION as values,
  E2E_RESERVATION_CANCELLATION_SQL as sql,
} from "../constants/E2eReservationCancellation.constants";
import type { ReservationCancellationState } from "./models/ReservationCancellationState.interface";
import { runWorkerSql } from "./runWorkerSql";

export const readReservationCancellationState = async (
  workerId: string,
  reservationId: string
): Promise<ReservationCancellationState> => {
  const row = await runWorkerSql(
    values.READ_OPERATION,
    sql.READ,
    workerId,
    { reservation: reservationId }
  );
  const [
    status,
    reason,
    isAuthor,
    items,
    charges,
    deposits,
  ] = row.split(values.FIELD_SEPARATOR);

  return {
    charges: Number(charges),
    deposits: Number(deposits),
    isAuthor: isAuthor === STRING.TRUE,
    items: Number(items),
    reason,
    status,
  };
};
