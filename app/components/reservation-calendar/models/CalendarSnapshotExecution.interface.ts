import type {
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshotRequest } from "@/app/services/reservations/models/ReservationCalendarSnapshotRequest.interface";
import type { ReservationCalendarSnapshot } from "./ReservationCalendarSnapshot.interface";
import type { CalendarSnapshotReader } from "./CalendarSnapshotReader.type";

export interface CalendarSnapshotExecution<
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
> {
  request: ReservationCalendarSnapshotRequest;
  readSnapshot: CalendarSnapshotReader;
  sequence: RefObject<number>;
  setSnapshot: Dispatch<
    SetStateAction<Snapshot | ReservationCalendarSnapshot>
  >;
  setRefreshError: Dispatch<
    SetStateAction<NullableRef<Error>>
  >;
  setIsRefreshing: Dispatch<SetStateAction<boolean>>;
}
