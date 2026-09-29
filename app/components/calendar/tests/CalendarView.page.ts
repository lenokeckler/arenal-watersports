import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, CALENDAR_TEXT } from "@/app/constants";
import type { CalendarView } from "../models";

export const createCalendarViewPage = () => {
  const user = userEvent.setup();
  const getView = (view: CalendarView) =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CALENDAR_TEXT.LABELS[view],
    });
  const selectView = async (view: CalendarView) => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CALENDAR_TEXT.LABELS[view],
      })
    );
  };
  const navigate = async (label: string) => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: label,
      })
    );
  };
  const getTitle = () =>
    screen
      .getAllByRole(ARIA_ROLE.HEADING)
      .find(
        (heading) =>
          heading.textContent !== CALENDAR_TEXT.TITLE
      );
  const getError = () => screen.getByRole(ARIA_ROLE.ALERT);
  return {
    getView,
    selectView,
    navigate,
    getTitle,
    getError,
  };
};
