import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import { getCostaRicaTime } from "@/app/utils/costa-rica-day/getCostaRicaTime";
import { resolveReservationDepositDecision } from "@/app/utils/reservations/resolveReservationDepositDecision";
import type { ReservationDeposit } from "../models/ReservationDeposit.interface";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";
import type { ReservationDepositRow } from "../models/ReservationDepositRow.type";

export const mapReservationDeposit = (
  row: ReservationDepositRow,
  proposal: ReservationDepositProposal
): ReservationDeposit => {
  const startsAt = new Date(row.starts_at);

  return {
    code: row.code,
    customerName: row.customer_name,
    date: getCostaRicaDayRange(startsAt).date,
    decision: resolveReservationDepositDecision({
      declined: row.deposit_declination !== null,
      deposits: row.deposits,
    }),
    id: row.id,
    parentReservationId: row.parent_reservation_id,
    proposal,
    status: row.status,
    time: getCostaRicaTime(startsAt),
  };
};
