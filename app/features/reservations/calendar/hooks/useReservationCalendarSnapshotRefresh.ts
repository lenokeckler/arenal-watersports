import { useState } from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarSnapshotState } from "../models/ReservationCalendarSnapshotState.interface";
import type { ReservationCalendarRefreshState } from "../models/ReservationCalendarRefreshState.interface";
import { useRefreshReservationCalendarPeriod } from "./useRefreshReservationCalendarPeriod";
import { useReservationCalendarSelectionTracker } from "./useReservationCalendarSelectionTracker";
import { useHandleReservationCalendarPeriodChange } from "./useHandleReservationCalendarPeriodChange";
import { useRetryReservationCalendarPeriod } from "./useRetryReservationCalendarPeriod";

export const useReservationCalendarSnapshotRefresh = (
  initialSnapshot: NullableRef<ReservationCalendarSnapshot>
): ReservationCalendarSnapshotState => {
  const [state, setState] =
    useState<ReservationCalendarRefreshState>({
      hasRefreshError: false,
      isRefreshing: false,
      snapshot: initialSnapshot,
    });
  const refreshController =
    useRefreshReservationCalendarPeriod({ setState });
  const selectionTracker =
    useReservationCalendarSelectionTracker();
  const onPeriodChange =
    useHandleReservationCalendarPeriodChange({
      refreshController,
      selectionTracker,
      setState,
      snapshot: state.snapshot,
    });
  const onRetry = useRetryReservationCalendarPeriod({
    refreshPeriod: refreshController.refreshPeriod,
    selectionTracker,
  });
  return { ...state, onPeriodChange, onRetry };
};
