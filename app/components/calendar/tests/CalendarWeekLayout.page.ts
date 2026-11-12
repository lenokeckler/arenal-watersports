import { screen } from "@testing-library/react";
import type { CalendarDate } from "@/app/types";
import { formatCalendarDate } from "../utils/formatCalendarPresentation";

export const createCalendarWeekLayoutPage = () => {
  const getDayCardClassName = (date: CalendarDate) => {
    const dateLabel = screen.getByText(
      formatCalendarDate(date),
      { selector: "p" }
    );
    return dateLabel.parentElement?.className;
  };
  const getDayGridClassName = (date: CalendarDate) => {
    const dateLabel = screen.getByText(
      formatCalendarDate(date),
      { selector: "p" }
    );
    return dateLabel.parentElement?.parentElement
      ?.className;
  };
  return { getDayCardClassName, getDayGridClassName };
};
