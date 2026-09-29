import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_PREVIEW,
} from "@/app/constants";
import { ReduxProvider } from "@/app/providers/ReduxProvider";
import { getCalendarToday } from "./utils";
import { CalendarView } from "./CalendarView";
import type { CalendarPreviewProps } from "./models/CalendarPreviewProps.interface";

export const CalendarPreviewEntry = ({
  example,
}: CalendarPreviewProps): ReactElement => {
  if (
    process.env.NODE_ENV !== CALENDAR_PREVIEW.DEVELOPMENT
  ) {
    notFound();
  }
  const allowedViews =
    example === CALENDAR_PREVIEW.OPERATIONS_EXAMPLE
      ? CALENDAR_ALLOWED_VIEWS.OPERATIONS
      : CALENDAR_ALLOWED_VIEWS.RESERVATIONS;
  return (
    <ReduxProvider>
      <CalendarView
        today={getCalendarToday(new Date())}
        allowedViews={allowedViews}
      />
    </ReduxProvider>
  );
};
