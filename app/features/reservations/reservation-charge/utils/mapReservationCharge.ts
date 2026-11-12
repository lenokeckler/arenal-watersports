import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import { getCostaRicaTime } from "@/app/utils/costa-rica-day/getCostaRicaTime";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeRow } from "../models/ReservationChargeRow.type";

export const mapReservationCharge = (
  row: ReservationChargeRow,
  proposal: ReservationChargeProposal
): ReservationCharge => {
  const startsAt = new Date(row.starts_at);

  return {
    code: row.code,
    customerName: row.customer_name,
    date: getCostaRicaDayRange(startsAt).date,
    durationMinutes: row.duration_minutes,
    id: row.id,
    parentReservationId: row.parent_reservation_id,
    peopleCount: row.people_count,
    proposal,
    status: row.status,
    time: getCostaRicaTime(startsAt),
  };
};
