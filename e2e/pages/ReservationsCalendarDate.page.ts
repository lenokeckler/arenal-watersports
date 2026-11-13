import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { CalendarDate } from "@/app/types";
import { formatCalendarDate } from "@/app/components/calendar/utils/formatCalendarPresentation";
import { getMainRegion } from "../support/mainRegion";

export const createReservationsCalendarDatePage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getDaySelection = (
    date: CalendarDate,
    count: number
  ): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: `${formatCalendarDate(date)}${RESERVATIONS_CALENDAR_COPY.RESERVATION_COUNT_SEPARATOR}${RESERVATIONS_CALENDAR_COPY.RESERVATION_COUNT_LABEL(count)}`,
      exact: true,
    });
  const getMonthSelection = (date: CalendarDate): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: formatCalendarDate(date, true),
      exact: true,
    });

  return {
    getDaySelection,
    getMonthSelection,
    getDayReservationCount: (
      date: CalendarDate,
      count: number
    ): Locator =>
      getDaySelection(date, count).getByText(
        count.toString(),
        { exact: true }
      ),
    selectDay: async (
      date: CalendarDate,
      count: number
    ): Promise<void> => {
      await getDaySelection(date, count).click();
    },
    selectMonth: async (
      date: CalendarDate
    ): Promise<void> => {
      await getMonthSelection(date).click();
    },
  };
};
