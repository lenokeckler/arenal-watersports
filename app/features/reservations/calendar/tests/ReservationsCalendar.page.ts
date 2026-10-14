import { screen } from "@testing-library/react";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { CalendarView } from "@/app/types";

export const createReservationsCalendarPage = () => {
  const getView = (view: CalendarView) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CALENDAR_TEXT.LABELS[view],
    });
  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: RESERVATIONS_CALENDAR_COPY.TITLE,
    });

  return { getHeading, getView };
};
