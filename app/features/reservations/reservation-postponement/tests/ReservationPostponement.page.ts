import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";

const HREF_ATTRIBUTE = "href";

export const createReservationPostponementPage = () => {
  const queryText = (text: string) =>
    screen.queryByText(text);

  const queryStatus = () =>
    screen.queryByRole(ARIA_ROLE.STATUS);

  const getText = (text: string) => screen.getByText(text);

  const getHeading = (name: string) =>
    screen.getByRole(ARIA_ROLE.HEADING, { name });

  const getCalendarLinkTargets = () =>
    screen
      .getAllByRole(ARIA_ROLE.LINK, {
        name: RESERVATION_POSTPONEMENT_UI_COPY.BACK_TO_CALENDAR,
      })
      .map((link) => link.getAttribute(HREF_ATTRIBUTE));

  const getStatusText = () =>
    screen.getByRole(ARIA_ROLE.STATUS).textContent;

  const getListItemTexts = () =>
    screen
      .getAllByRole(ARIA_ROLE.LISTITEM)
      .map((item) => item.textContent);

  return {
    getCalendarLinkTargets,
    getHeading,
    getListItemTexts,
    getStatusText,
    getText,
    queryStatus,
    queryText,
  };
};
