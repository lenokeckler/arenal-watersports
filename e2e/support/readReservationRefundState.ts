import { STRING } from "@/app/constants";
import { E2E_RESERVATION_REFUND as values } from "../constants/E2eReservationRefund.constants";
import { E2E_RESERVATION_REFUND_SQL as sql } from "../constants/E2eReservationRefundSql.constants";
import type { ReservationRefundState } from "./models/ReservationRefundState.interface";
import { runWorkerSql } from "./runWorkerSql";

export const readReservationRefundState = async (
  workerId: string,
  reservationId: string
): Promise<ReservationRefundState> => {
  const row = await runWorkerSql(
    values.READ_OPERATION,
    sql.READ,
    workerId,
    { reservation: reservationId }
  );
  const [
    refunds,
    amount,
    currency,
    reason,
    isAuthor,
    name,
  ] = row.split(values.FIELD_SEPARATOR);

  return {
    amount: Number(amount),
    currency,
    isAuthor: isAuthor === STRING.TRUE,
    reason,
    recordedByName: name,
    refunds: Number(refunds),
  };
};
