import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { CalendarSnapshotReader } from "../models/CalendarSnapshotReader.type";
import type { CalendarSnapshotState } from "../models/CalendarSnapshotState.interface";
import { useCalendarSnapshotRequest } from "./useCalendarSnapshotRequest";
import { useCalendarSnapshotPeriod } from "./useCalendarSnapshotPeriod";

export const useCalendarSnapshot = <
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
>(
  initialSnapshot: Snapshot,
  readSnapshot: CalendarSnapshotReader
): CalendarSnapshotState<Snapshot> => {
  const resources = useCalendarSnapshotRequest(
    initialSnapshot,
    readSnapshot
  );
  const handlers = useCalendarSnapshotPeriod(resources);
  return {
    ...resources,
    ...handlers,
    hasRefreshError: resources.refreshError !== null,
  };
};
