import { useCallback, useRef } from "react";
import type { NullableRef } from "@/app/types";
import type { CalendarPeriod } from "@/app/components/calendar/models";
import type { ReservationCalendarSnapshotRequest } from "@/app/services/reservations/models/ReservationCalendarSnapshotRequest.interface";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import { selectCalendarSnapshotPeriod } from "../utils/selectCalendarSnapshotPeriod";

import type { CalendarSnapshotPeriodOptions } from "../models/CalendarSnapshotPeriodOptions.interface";

export const useCalendarSnapshotPeriod = <
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
>(
  resources: CalendarSnapshotPeriodOptions<Snapshot>
) => {
  const currentRequest =
    useRef<NullableRef<ReservationCalendarSnapshotRequest>>(
      null
    );
  const onPeriodChange = useCallback(
    (period: CalendarPeriod): void =>
      selectCalendarSnapshotPeriod({
        resources,
        currentRequest,
        period,
      }),
    [resources]
  );
  const onRetry = useCallback(async (): Promise<void> => {
    if (currentRequest.current !== null) {
      await resources.refresh(currentRequest.current);
    }
  }, [resources]);
  return { onPeriodChange, onRetry };
};
