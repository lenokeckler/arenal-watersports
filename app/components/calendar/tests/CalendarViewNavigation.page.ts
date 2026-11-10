import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, CALENDAR_TEXT } from "@/app/constants";
import type { CalendarView } from "@/app/types";

export const createCalendarViewNavigationPage = () => {
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
      screen.getByRole(ARIA_ROLE.BUTTON, { name: label })
    );
  };
  return { getView, navigate, selectView };
};
