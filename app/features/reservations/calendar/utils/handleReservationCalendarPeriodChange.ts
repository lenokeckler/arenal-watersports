import type { ReservationCalendarPeriodChangeInput } from "../models/ReservationCalendarPeriodChangeInput.interface";
import { buildReservationCalendarPeriodRequestKey } from "./buildReservationCalendarPeriodRequestKey";
import { buildReservationCalendarPeriodRequest } from "./buildReservationCalendarPeriodRequest";
import { isReservationCalendarSnapshotCompleteForPeriod } from "./isReservationCalendarSnapshotCompleteForPeriod";

export const handleReservationCalendarPeriodChange = ({
  period,
  refreshController,
  selectionTracker,
  setState,
  snapshot,
}: ReservationCalendarPeriodChangeInput): void => {
  const request =
    buildReservationCalendarPeriodRequest(period);
  const requestKey =
    buildReservationCalendarPeriodRequestKey(request);
  if (selectionTracker.hasInFlightRequest(requestKey)) {
    return;
  }
  selectionTracker.selectRequest(request, requestKey);
  refreshController.invalidate();
  setState((previousState) => ({
    ...previousState,
    hasRefreshError: false,
    isRefreshing: false,
  }));
  if (
    isReservationCalendarSnapshotCompleteForPeriod(
      snapshot,
      period
    )
  ) {
    return;
  }
  selectionTracker.setInFlightRequest(requestKey);
  refreshController.refreshPeriod(
    request,
    requestKey,
    selectionTracker.completeRequest
  );
};
