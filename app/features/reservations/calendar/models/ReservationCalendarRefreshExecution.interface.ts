import type { Dispatch, SetStateAction } from "react";
import type { ReservationCalendarRefreshState } from "./ReservationCalendarRefreshState.interface";
import type { ReservationCalendarRefreshSequenceController } from "./ReservationCalendarRefreshSequenceController.interface";
import type { ReservationCalendarPeriodRequest } from "./ReservationCalendarPeriodRequest.interface";
import type { ReservationCalendarPeriodRefreshCompleteHandler } from "./ReservationCalendarPeriodRefreshHandler.type";

export interface ReservationCalendarRefreshExecution {
  onComplete: ReservationCalendarPeriodRefreshCompleteHandler;
  request: ReservationCalendarPeriodRequest;
  requestKey: string;
  requestSequence: number;
  sequence: ReservationCalendarRefreshSequenceController;
  setState: Dispatch<
    SetStateAction<ReservationCalendarRefreshState>
  >;
}
