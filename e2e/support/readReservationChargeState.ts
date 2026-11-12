import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_RESERVATION_CHARGE_SQL as sql } from "../constants/E2eReservationChargeSql.constants";
import type { ReservationChargeState } from "./models/ReservationChargeState.interface";
import { runWorkerSql } from "./runWorkerSql";

const toNullableNumber = (
  text: string
): NullableRef<number> =>
  text === STRING.Empty ? null : Number(text);

export const readReservationChargeState = async (
  workerId: string,
  reservationId: string
): Promise<ReservationChargeState> => {
  const row = await runWorkerSql(
    values.READ_OPERATION,
    sql.READ,
    workerId,
    { reservation: reservationId }
  );
  const [
    charges,
    kind,
    amount,
    currency,
    method,
    isAuthor,
    agreedUsd,
    agreedCrc,
    pricingRows,
    recordedByName,
  ] = row.split(values.FIELD_SEPARATOR);

  return {
    agreedAmountCrc: toNullableNumber(agreedCrc),
    agreedAmountUsd: toNullableNumber(agreedUsd),
    amount: Number(amount),
    charges: Number(charges),
    currency,
    isAuthor: isAuthor === STRING.TRUE,
    kind,
    method,
    pricingRows: Number(pricingRows),
    recordedByName,
  };
};
