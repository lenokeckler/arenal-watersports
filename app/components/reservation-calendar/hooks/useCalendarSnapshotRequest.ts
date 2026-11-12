import { useMemo } from "react";
import { useCalendarSnapshotState } from "./useCalendarSnapshotState";
import { useCalendarSnapshotReader } from "./useCalendarSnapshotReader";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { CalendarSnapshotReader } from "../models/CalendarSnapshotReader.type";

export const useCalendarSnapshotRequest = <
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
>(
  initialSnapshot: Snapshot,
  readSnapshot: CalendarSnapshotReader
) => {
  const state = useCalendarSnapshotState(initialSnapshot);
  const {
    snapshot,
    refreshError,
    isRefreshing,
    clearRefresh,
  } = state;
  const refresh = useCalendarSnapshotReader(
    state,
    readSnapshot
  );
  return useMemo(
    () => ({
      snapshot,
      refreshError,
      isRefreshing,
      refresh,
      clearRefresh,
    }),
    [
      snapshot,
      refreshError,
      isRefreshing,
      refresh,
      clearRefresh,
    ]
  );
};
