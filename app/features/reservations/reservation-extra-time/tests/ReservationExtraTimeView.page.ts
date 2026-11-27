import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as COPY } from "../constants/ReservationExtraTimeUiCopy.constants";
import { createReservationExtraTimeFormPage } from "./ReservationExtraTimeForm.page";

const DETAIL_TERM_SELECTOR = "dt";

export const createReservationExtraTimeViewPage = () => {
  const getGroupsRegion = () =>
    screen.getByRole(ARIA_ROLE.REGION, {
      name: COPY.GROUPS_TITLE,
    });

  return {
    ...createReservationExtraTimeFormPage(),
    findStatusText: async () =>
      (await screen.findByRole(ARIA_ROLE.STATUS))
        .textContent,
    getDetailValue: (label: string) =>
      screen.getByText(label, {
        selector: DETAIL_TERM_SELECTOR,
      }).nextElementSibling?.textContent,
    getGroupItems: () =>
      within(getGroupsRegion()).getAllByRole(
        ARIA_ROLE.LISTITEM
      ),
    getGroupsRegion,
    getHeading: () =>
      screen.getByRole(ARIA_ROLE.HEADING, { level: 1 }),
    getStatusText: () =>
      screen.getByRole(ARIA_ROLE.STATUS).textContent,
    getText: (text: string) => screen.getByText(text),
  };
};
