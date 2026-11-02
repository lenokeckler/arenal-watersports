import type { ReservationDetailDispatch } from "../models/ReservationDetailDispatch.interface";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";

export const mapReservationDetailDispatches = (
  source: ReservationDetailReservationSource
): ReservationDetailDispatch[] =>
  source.reservation_dispatches.map((dispatch) => ({
    actualArrivalAt: dispatch.closed_at,
    actualDepartureAt: dispatch.dispatched_at,
    categoryName: dispatch.category?.name ?? null,
    expectedReturnAt: dispatch.ends_at,
    id: dispatch.id,
  }));
