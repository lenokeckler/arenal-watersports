import type { ReservationDetailMoneyMovement } from "../models/ReservationDetailMoneyMovement.interface";

export const compareReservationDetailMoneyMovements = (
  first: ReservationDetailMoneyMovement,
  second: ReservationDetailMoneyMovement
): number =>
  Date.parse(second.createdAt) -
    Date.parse(first.createdAt) ||
  second.id.localeCompare(first.id);
