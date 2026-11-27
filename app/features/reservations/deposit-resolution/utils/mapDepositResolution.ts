import type { NullableRef } from "@/app/types";
import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionRow } from "../models/DepositResolutionRow.type";

export const mapDepositResolution = (
  row: DepositResolutionRow
): NullableRef<DepositResolution> =>
  row.reservation === null
    ? null
    : {
        amount: row.amount,
        code: row.reservation.code,
        currency: row.currency,
        customerName: row.reservation.customer_name,
        id: row.id,
        reservationId: row.reservation.id,
        reservationStatus: row.reservation.status,
        status: row.status,
      };
