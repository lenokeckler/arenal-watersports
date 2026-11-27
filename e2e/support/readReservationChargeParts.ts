import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_RESERVATION_CHARGE_SQL as sql } from "../constants/E2eReservationChargeSql.constants";
import type { ReservationChargePartRow } from "./models/ReservationChargePartRow.interface";
import type { ReservationChargeParts } from "./models/ReservationChargeParts.interface";
import { runWorkerSql } from "./runWorkerSql";

const toNullableNumber = (
  text: string
): NullableRef<number> =>
  text === STRING.Empty ? null : Number(text);

const toPartRow = (
  text: string
): ReservationChargePartRow => {
  const [currency, amount, kind, method, isAuthor] =
    text.split(values.PART_FIELD_SEPARATOR);

  return {
    amount: Number(amount),
    currency,
    isAuthor: isAuthor === STRING.TRUE,
    kind,
    method,
  };
};

export const readReservationChargeParts = async (
  workerId: string,
  reservationId: string
): Promise<ReservationChargeParts> => {
  const row = await runWorkerSql(
    values.READ_PARTS_OPERATION,
    sql.READ_PARTS,
    workerId,
    { reservation: reservationId }
  );
  const [charges, agreedUsd, agreedCrc, pricingRows] =
    row.split(values.FIELD_SEPARATOR);

  return {
    agreedAmountCrc: toNullableNumber(agreedCrc),
    agreedAmountUsd: toNullableNumber(agreedUsd),
    charges: charges
      .split(values.PART_SEPARATOR)
      .filter((part) => part !== STRING.Empty)
      .map(toPartRow),
    pricingRows: Number(pricingRows),
  };
};
