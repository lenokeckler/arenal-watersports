import { readReservationCalendarPeriod } from "../actions/readReservationCalendarPeriod";
import type { ReservationCalendarRefreshExecution } from "../models/ReservationCalendarRefreshExecution.interface";

export const executeReservationCalendarRefresh = async ({
  onComplete,
  request,
  requestKey,
  requestSequence,
  sequence,
  setState,
}: ReservationCalendarRefreshExecution): Promise<void> => {
  setState((previousState) => ({
    ...previousState,
    hasRefreshError: false,
    isRefreshing: true,
  }));
  try {
    const snapshot =
      await readReservationCalendarPeriod(request);
    if (sequence.isCurrent(requestSequence)) {
      setState((previousState) => ({
        ...previousState,
        snapshot,
      }));
    }
  } catch {
    if (sequence.isCurrent(requestSequence)) {
      setState((previousState) => ({
        ...previousState,
        hasRefreshError: true,
      }));
    }
  } finally {
    if (sequence.isCurrent(requestSequence)) {
      onComplete(requestKey);
      setState((previousState) => ({
        ...previousState,
        isRefreshing: false,
      }));
    }
  }
};
