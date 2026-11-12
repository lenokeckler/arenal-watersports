import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_RESERVATION_CHARGE_SQL as sql } from "../constants/E2eReservationChargeSql.constants";
import type { ReservationChargeTariff } from "./models/ReservationChargeTariff.interface";
import { runWorkerSql } from "./runWorkerSql";

export const readReservationChargeTariff = async (
  workerId: string,
  reservationId: string
): Promise<ReservationChargeTariff> => {
  const row = await runWorkerSql(
    values.TARIFF_OPERATION,
    sql.TARIFF,
    workerId,
    { reservation: reservationId }
  );
  const [amountUsd, amountCrc] = row.split(
    values.FIELD_SEPARATOR
  );

  return {
    amountCrc: Number(amountCrc),
    amountUsd: Number(amountUsd),
  };
};
