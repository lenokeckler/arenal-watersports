import { unstable_rethrow } from "next/navigation";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { CalendarSnapshotExecution } from "../models/CalendarSnapshotExecution.interface";

const toRefreshError = (cause: unknown): Error =>
  cause instanceof Error
    ? cause
    : new Error(String(cause), { cause });

export const executeCalendarSnapshotRequest = async <
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
>(
  resources: CalendarSnapshotExecution<Snapshot>
): Promise<void> => {
  const {
    sequence,
    setSnapshot,
    setRefreshError,
    setIsRefreshing,
  } = resources;
  const requestSequence = ++sequence.current;
  setRefreshError(null);
  setIsRefreshing(true);
  try {
    const nextSnapshot = await resources.readSnapshot(
      resources.request
    );
    if (sequence.current === requestSequence) {
      setSnapshot(nextSnapshot);
    }
  } catch (error: unknown) {
    unstable_rethrow(error);
    if (sequence.current === requestSequence) {
      setRefreshError(toRefreshError(error));
    }
  } finally {
    if (sequence.current === requestSequence) {
      setIsRefreshing(false);
    }
  }
};
