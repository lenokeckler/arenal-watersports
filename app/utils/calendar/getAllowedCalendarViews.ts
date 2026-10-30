import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_WORK_AREA,
} from "@/app/constants";
import type {
  CalendarView,
  CalendarWorkArea,
} from "@/app/types";

export const getAllowedCalendarViews = (
  verifiedWorkArea: CalendarWorkArea
): readonly CalendarView[] => {
  if (verifiedWorkArea === CALENDAR_WORK_AREA.OPERATIONS) {
    return CALENDAR_ALLOWED_VIEWS.OPERATIONS;
  }
  if (
    verifiedWorkArea === CALENDAR_WORK_AREA.RESERVATIONS
  ) {
    return CALENDAR_ALLOWED_VIEWS.RESERVATIONS;
  }
  return [];
};
