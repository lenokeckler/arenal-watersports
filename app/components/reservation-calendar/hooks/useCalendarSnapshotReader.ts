import { useCallback } from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshotRequest } from "@/app/services/reservations/models/ReservationCalendarSnapshotRequest.interface";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { CalendarSnapshotReader } from "../models/CalendarSnapshotReader.type";
import type { CalendarSnapshotReaderResources } from "../models/CalendarSnapshotReaderResources.type";
import { executeCalendarSnapshotRequest } from "../utils/executeCalendarSnapshotRequest";

export const useCalendarSnapshotReader = <
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
>(
  resources: CalendarSnapshotReaderResources<Snapshot>,
  readSnapshot: CalendarSnapshotReader
) => {
  const {
    sequence,
    setSnapshot,
    setRefreshError,
    setIsRefreshing,
  } = resources;
  return useCallback(
    (request: ReservationCalendarSnapshotRequest) =>
      executeCalendarSnapshotRequest({
        request,
        readSnapshot,
        sequence,
        setSnapshot,
        setRefreshError,
        setIsRefreshing,
      }),
    [
      readSnapshot,
      sequence,
      setSnapshot,
      setRefreshError,
      setIsRefreshing,
    ]
  );
};
