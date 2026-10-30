import type { NullableRef } from "@/app/types";
import type { ReservationCalendarPeriodRequest } from "../models/ReservationCalendarPeriodRequest.interface";
import type { ReservationCalendarSelectionTracker } from "../models/ReservationCalendarSelectionTracker.interface";

export const createReservationCalendarSelectionTracker =
  (): ReservationCalendarSelectionTracker => {
    let currentRequest: NullableRef<ReservationCalendarPeriodRequest> =
      null;
    let currentKey: NullableRef<string> = null;
    let inFlightKey: NullableRef<string> = null;
    return {
      completeRequest: (requestKey): void => {
        if (inFlightKey === requestKey) {
          inFlightKey = null;
        }
      },
      getCurrentRequest:
        (): NullableRef<ReservationCalendarPeriodRequest> =>
          currentRequest,
      hasInFlightRequest: (requestKey): boolean =>
        currentKey === requestKey &&
        inFlightKey === requestKey,
      selectRequest: (request, requestKey): void => {
        currentRequest = request;
        currentKey = requestKey;
        inFlightKey = null;
      },
      setInFlightRequest: (requestKey): void => {
        inFlightKey = requestKey;
      },
    };
  };
