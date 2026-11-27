import type { ReservationDepositDecision } from "@/app/utils/reservations/models/ReservationDepositDecision.type";
import { resolveReservationDepositDecision } from "@/app/utils/reservations/resolveReservationDepositDecision";
import type { ReservationDetailDepositSource } from "../models/ReservationDetailDepositSource.interface";

export const mapReservationDetailDeposit = (
  source: ReservationDetailDepositSource
): ReservationDepositDecision =>
  resolveReservationDepositDecision({
    declined: source.deposit_declination !== null,
    deposits: source.deposits,
  });
