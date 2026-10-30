import type { Dispatch, SetStateAction } from "react";
import type { ReservationCalendarRefreshState } from "./ReservationCalendarRefreshState.interface";
import type { ReservationCalendarRefreshSequenceController } from "./ReservationCalendarRefreshSequenceController.interface";

export interface ReservationCalendarRefreshSequenceDependencies {
  setState: Dispatch<
    SetStateAction<ReservationCalendarRefreshState>
  >;
  sequence: ReservationCalendarRefreshSequenceController;
}
