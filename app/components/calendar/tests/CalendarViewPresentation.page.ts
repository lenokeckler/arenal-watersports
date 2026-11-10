import { screen } from "@testing-library/react";
import { ARIA_ROLE, CALENDAR_TEXT } from "@/app/constants";
import { CALENDAR_TEST } from "./CalendarPresentation.constants";

export const createCalendarViewPresentationPage = () => {
  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, { level: 1 });
  const getTitle = () =>
    screen.getByRole(ARIA_ROLE.HEADING, { level: 2 });
  const getNavigationControls = () =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: CALENDAR_TEXT.NAVIGATION,
    });
  const getError = () => screen.getByRole(ARIA_ROLE.ALERT);
  const getToday = () =>
    screen
      .queryByRole(ARIA_ROLE.REGION)
      ?.querySelector(CALENDAR_TEST.TODAY_SELECTOR);
  return {
    getError,
    getHeading,
    getNavigationControls,
    getToday,
    getTitle,
  };
};
