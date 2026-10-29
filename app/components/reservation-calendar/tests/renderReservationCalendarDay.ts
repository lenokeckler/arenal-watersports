import { render, renderHook } from "@testing-library/react";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import { useReservationCalendarDayContent } from "../hooks/useReservationCalendarDayContent";
import { CALENDAR_DAY_DATE } from "./ReservationCalendarDay.constants";

export const renderReservationCalendarDay = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  showCoverageMessages?: boolean
): void => {
  const { result } = renderHook(() =>
    useReservationCalendarDayContent(snapshot, {
      showCoverageMessages,
    })
  );
  render(result.current(CALENDAR_DAY_DATE));
};
