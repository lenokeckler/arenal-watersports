import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import { getCostaRicaTime } from "@/app/utils/costa-rica-day/getCostaRicaTime";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import type { ReservationRefund } from "../models/ReservationRefund.interface";
import type { ReservationRefundRow } from "../models/ReservationRefundRow.type";

export const mapReservationRefund = (
  row: ReservationRefundRow,
  refundable: ReservationRefundableAmount[]
): ReservationRefund => {
  const startsAt = new Date(row.starts_at);

  return {
    code: row.code,
    customerName: row.customer_name,
    date: getCostaRicaDayRange(startsAt).date,
    id: row.id,
    parentReservationId: row.parent_reservation_id,
    refundable,
    status: row.status,
    time: getCostaRicaTime(startsAt),
  };
};
