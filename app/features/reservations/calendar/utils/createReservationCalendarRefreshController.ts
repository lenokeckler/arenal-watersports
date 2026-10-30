import type { Dispatch, SetStateAction } from "react";
import type { ReservationCalendarRefreshState } from "../models/ReservationCalendarRefreshState.interface";
import type { ReservationCalendarRefreshController } from "../models/ReservationCalendarRefreshController.interface";
import { createReservationCalendarRefreshSequence } from "./createReservationCalendarRefreshSequence";
import { createReservationCalendarPeriodRefreshHandler } from "./createReservationCalendarPeriodRefreshHandler";

export const createReservationCalendarRefreshController = (
  setState: Dispatch<
    SetStateAction<ReservationCalendarRefreshState>
  >
): ReservationCalendarRefreshController => {
  const sequence =
    createReservationCalendarRefreshSequence();
  const refreshPeriod =
    createReservationCalendarPeriodRefreshHandler({
      sequence,
      setState,
    });
  return { invalidate: sequence.invalidate, refreshPeriod };
};
