import { useCallback } from "react";
import type { ReservationCalendarRetryController } from "../models/ReservationCalendarRetryController.interface";
import { buildReservationCalendarPeriodRequestKey } from "../utils/buildReservationCalendarPeriodRequestKey";

export const useRetryReservationCalendarPeriod = ({
  refreshPeriod,
  selectionTracker,
}: ReservationCalendarRetryController): (() => void) =>
  useCallback((): void => {
    const request = selectionTracker.getCurrentRequest();
    if (request === null) {
      return;
    }
    const requestKey =
      buildReservationCalendarPeriodRequestKey(request);
    selectionTracker.setInFlightRequest(requestKey);
    refreshPeriod(
      request,
      requestKey,
      selectionTracker.completeRequest
    );
  }, [refreshPeriod, selectionTracker]);
