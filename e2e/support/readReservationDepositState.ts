import { STRING } from "@/app/constants";
import { E2E_RESERVATION_DEPOSIT as values } from "../constants/E2eReservationDeposit.constants";
import { E2E_RESERVATION_DEPOSIT_SQL as sql } from "../constants/E2eReservationDepositSql.constants";
import type { ReservationDepositState } from "./models/ReservationDepositState.interface";
import { runWorkerSql } from "./runWorkerSql";

export const readReservationDepositState = async (
  workerId: string,
  reservationId: string
): Promise<ReservationDepositState> => {
  const row = await runWorkerSql(
    values.READ_OPERATION,
    sql.READ,
    workerId,
    { reservation: reservationId }
  );
  const [
    deposits,
    declinations,
    amount,
    currency,
    status,
    isAuthor,
  ] = row.split(values.FIELD_SEPARATOR);

  return {
    amount: Number(amount),
    currency,
    declinations: Number(declinations),
    deposits: Number(deposits),
    isAuthor: isAuthor === STRING.TRUE,
    status,
  };
};
