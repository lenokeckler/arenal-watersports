import { useCallback, useRef, useState } from "react";
import type { CalendarPeriod } from "@/app/components/calendar/models/CalendarPeriod.interface";
import { toCalendarUtcDate } from "@/app/components/calendar/utils/calendarDateArithmetic";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarSnapshotRequest } from "@/app/services/reservations/models/ReservationCalendarSnapshotRequest.interface";
import type { OperationsCalendarSnapshotController } from "../models/OperationsCalendarSnapshotController.interface";
import { readOperationsCalendarPeriod } from "../actions/readOperationsCalendarPeriod";

const dateValue = (date: {
  day: number;
  month: number;
  year: number;
}): number => toCalendarUtcDate(date).getTime();

const coversPeriod = (
  snapshot: ReservationCalendarSnapshot,
  period: CalendarPeriod
): boolean =>
  dateValue(snapshot.startDate) <=
    dateValue(period.start) &&
  dateValue(snapshot.endDateExclusive) >
    dateValue(period.end);

export const useOperationsCalendarSnapshot = (
  initialSnapshot: ReservationCalendarSnapshot
): OperationsCalendarSnapshotController => {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [hasRefreshError, setHasRefreshError] =
    useState(false);
  const sequence = useRef(0);
  const currentRequest =
    useRef<ReservationCalendarSnapshotRequest | null>(null);

  const refresh = useCallback(
    (request: ReservationCalendarSnapshotRequest): void => {
      currentRequest.current = request;
      sequence.current += 1;
      const requestSequence = sequence.current;
      setHasRefreshError(false);
      void readOperationsCalendarPeriod(request)
        .then((nextSnapshot) => {
          if (sequence.current === requestSequence) {
            setSnapshot(nextSnapshot);
          }
        })
        .catch(() => {
          if (sequence.current === requestSequence) {
            setHasRefreshError(true);
          }
        });
    },
    []
  );

  const onPeriodChange = useCallback(
    (period: CalendarPeriod): void => {
      const request = {
        anchor: period.start,
        view: period.view,
      };
      currentRequest.current = request;
      if (coversPeriod(snapshot, period)) {
        return;
      }
      refresh(request);
    },
    [refresh, snapshot]
  );

  const onRetry = useCallback((): void => {
    if (currentRequest.current !== null) {
      refresh(currentRequest.current);
    }
  }, [refresh]);

  return {
    hasRefreshError,
    onPeriodChange,
    onRetry,
    snapshot,
  };
};
