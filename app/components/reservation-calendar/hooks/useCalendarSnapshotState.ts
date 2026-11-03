import { useRef, useState } from "react";
import { useCalendarSnapshotInvalidation } from "./useCalendarSnapshotInvalidation";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";

export const useCalendarSnapshotState = <
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
>(
  initialSnapshot: Snapshot
) => {
  const [snapshot, setSnapshot] = useState<
    Snapshot | ReservationCalendarSnapshot
  >(initialSnapshot);
  const [refreshError, setRefreshError] =
    useState<NullableRef<Error>>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const sequence = useRef(0);
  const clearRefresh = useCalendarSnapshotInvalidation(
    sequence,
    setRefreshError,
    setIsRefreshing
  );
  return {
    snapshot,
    refreshError,
    isRefreshing,
    setSnapshot,
    setRefreshError,
    setIsRefreshing,
    sequence,
    clearRefresh,
  };
};
