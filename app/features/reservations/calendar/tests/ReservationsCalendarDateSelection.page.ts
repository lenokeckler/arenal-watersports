import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  STRING,
} from "@/app/constants";
import type {
  CalendarDate,
  CalendarView,
} from "@/app/types";
import { formatCalendarDate } from "@/app/components/calendar/utils/formatCalendarPresentation";

const getDaySelection = (date: CalendarDate): HTMLElement =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: new RegExp(`^${formatCalendarDate(date)}`),
  });

const getMonthSelection = (
  date: CalendarDate
): HTMLElement =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: formatCalendarDate(date, true),
  });

export const createReservationsCalendarDateSelectionPage =
  () => {
    const user = userEvent.setup();
    const getView = (view: CalendarView): HTMLElement =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CALENDAR_TEXT.LABELS[view],
      });
    const selectView = async (
      view: CalendarView
    ): Promise<void> => {
      await user.click(getView(view));
    };
    const selectDay = async (
      date: CalendarDate
    ): Promise<void> => {
      await user.click(getDaySelection(date));
    };
    const selectMonth = async (
      date: CalendarDate
    ): Promise<void> => {
      await user.click(getMonthSelection(date));
    };
    const getMonthSelectionCardClassName = (
      date: CalendarDate
    ): string =>
      getMonthSelection(date).parentElement?.parentElement
        ?.className ?? STRING.Empty;
    return {
      getDaySelection,
      getMonthSelection,
      getMonthSelectionCardClassName,
      getView,
      selectDay,
      selectMonth,
      selectView,
    };
  };
