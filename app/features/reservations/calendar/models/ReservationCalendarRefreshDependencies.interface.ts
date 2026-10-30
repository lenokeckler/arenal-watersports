import type { Dispatch, SetStateAction } from "react";
import type { ReservationCalendarRefreshState } from "./ReservationCalendarRefreshState.interface";

export interface ReservationCalendarRefreshDependencies {
  setState: Dispatch<
    SetStateAction<ReservationCalendarRefreshState>
  >;
}
