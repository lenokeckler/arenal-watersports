import type { ReservationCalendarPeriodRefreshHandler } from "../models/ReservationCalendarPeriodRefreshHandler.type";
import type { ReservationCalendarRefreshSequenceDependencies } from "../models/ReservationCalendarRefreshSequenceDependencies.interface";
import { executeReservationCalendarRefresh } from "./executeReservationCalendarRefresh";

export const createReservationCalendarPeriodRefreshHandler =
  ({
    sequence,
    setState,
  }: ReservationCalendarRefreshSequenceDependencies): ReservationCalendarPeriodRefreshHandler =>
  (request, requestKey, onComplete): void => {
    const requestSequence = sequence.next();
    void executeReservationCalendarRefresh({
      onComplete,
      request,
      requestKey,
      requestSequence,
      sequence,
      setState,
    });
  };
