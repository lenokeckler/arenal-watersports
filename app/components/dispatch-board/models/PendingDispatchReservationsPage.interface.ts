import type { PendingDispatchReservation } from "./PendingDispatchReservation.interface";

export interface PendingDispatchReservationsPage {
  hasNextPage: boolean;
  page: number;
  reservations: PendingDispatchReservation[];
}
