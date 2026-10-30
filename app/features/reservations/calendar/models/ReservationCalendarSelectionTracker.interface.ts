import type { NullableRef } from "@/app/types";
import type { ReservationCalendarPeriodRequest } from "./ReservationCalendarPeriodRequest.interface";

export interface ReservationCalendarSelectionTracker {
  completeRequest: (requestKey: string) => void;
  getCurrentRequest: () => NullableRef<ReservationCalendarPeriodRequest>;
  hasInFlightRequest: (requestKey: string) => boolean;
  selectRequest: (
    request: ReservationCalendarPeriodRequest,
    requestKey: string
  ) => void;
  setInFlightRequest: (requestKey: string) => void;
}
