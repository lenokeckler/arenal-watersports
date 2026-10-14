import type { ReactElement } from "react";
import { CALENDAR_ALLOWED_VIEWS } from "@/app/constants";
import { getCalendarToday } from "./utils";
import { CalendarView } from "./CalendarView.client";

export const CalendarFeature = (): ReactElement => (
  <CalendarView
    today={getCalendarToday(new Date())}
    allowedViews={CALENDAR_ALLOWED_VIEWS.RESERVATIONS}
  />
);
