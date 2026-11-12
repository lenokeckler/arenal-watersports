import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CANCELLATION_UI_COPY } from "../constants/ReservationCancellationUiCopy.constants";

const HREF_ATTRIBUTE = "href";

export const createReservationCancellationPage = () => ({
  getCalendarLinkTargets: () =>
    screen
      .getAllByRole(ARIA_ROLE.LINK, {
        name: RESERVATION_CANCELLATION_UI_COPY.BACK_TO_CALENDAR,
      })
      .map((link) => link.getAttribute(HREF_ATTRIBUTE)),
  getHeading: (name: string) =>
    screen.getByRole(ARIA_ROLE.HEADING, { name }),
  getListItemTexts: () =>
    screen
      .getAllByRole(ARIA_ROLE.LISTITEM)
      .map((item) => item.textContent),
  getStatusText: () =>
    screen.getByRole(ARIA_ROLE.STATUS).textContent,
  queryStatus: () => screen.queryByRole(ARIA_ROLE.STATUS),
  queryText: (text: string) => screen.queryByText(text),
});
