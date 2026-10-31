import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { CalendarSnapshotPeriodSelection } from "../models/CalendarSnapshotPeriodSelection.interface";
import { buildReservationCalendarContent } from "./buildReservationCalendarContent";

export const selectCalendarSnapshotPeriod = <
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
>({
  resources,
  currentRequest,
  period,
}: CalendarSnapshotPeriodSelection<Snapshot>): void => {
  const request = {
    anchor: period.start,
    view: period.view,
  };
  if (
    resources.isRefreshing &&
    JSON.stringify(currentRequest.current) ===
      JSON.stringify(request)
  ) {
    return;
  }
  currentRequest.current = request;
  resources.clearRefresh();
  const content = buildReservationCalendarContent(
    resources.snapshot ?? undefined,
    period
  );
  if (!content.coversPeriod || !content.hasAllResults) {
    void resources.refresh(request);
  }
};
