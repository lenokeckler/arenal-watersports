import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

const HREF_ATTRIBUTE = "href";

export const createReservationChargePage = () => ({
  getBackLinkTargets: () =>
    screen
      .getAllByRole(ARIA_ROLE.LINK)
      .map((link) => link.getAttribute(HREF_ATTRIBUTE)),
  getDefinitionValue: (label: string) =>
    screen.getByText(label).nextElementSibling?.textContent,
  getHeading: (name: string) =>
    screen.getByRole(ARIA_ROLE.HEADING, { name }),
  getLink: (name: string) =>
    screen.getByRole(ARIA_ROLE.LINK, { name }),
  getStatusText: () =>
    screen.getByRole(ARIA_ROLE.STATUS).textContent,
  queryStatus: () => screen.queryByRole(ARIA_ROLE.STATUS),
  queryText: (text: string) => screen.queryByText(text),
});
