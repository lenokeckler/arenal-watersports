import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";

export const createReservationHistoryPage = () => {
  const getMain = () => screen.getByRole(ARIA_ROLE.MAIN);

  const getList = () =>
    screen.getByRole(ARIA_ROLE.LIST, {
      name: RESERVATION_HISTORY_COPY.LIST_ARIA_LABEL,
    });

  const queryList = () =>
    screen.queryByRole(ARIA_ROLE.LIST);

  const getRows = () =>
    within(getList()).getAllByRole(ARIA_ROLE.LISTITEM);

  const getRowLink = (row: HTMLElement) =>
    within(row).getByRole(ARIA_ROLE.LINK);

  const getInRow = (row: HTMLElement, text: string) =>
    within(row).getByText(text);

  const queryInRow = (row: HTMLElement, text: string) =>
    within(row).queryByText(text);

  const queryNavigation = () =>
    screen.queryByRole(ARIA_ROLE.NAVIGATION);

  const getNavigation = () =>
    screen.getByRole(ARIA_ROLE.NAVIGATION, {
      name: RESERVATION_HISTORY_COPY.PAGINATION_NAV_LABEL,
    });

  const getNavigationLink = (name: string) =>
    within(getNavigation()).getByRole(ARIA_ROLE.LINK, {
      name,
    });

  const queryNavigationLink = (name: string) =>
    within(getNavigation()).queryByRole(ARIA_ROLE.LINK, {
      name,
    });

  const getText = (text: string) => screen.getByText(text);

  return {
    getInRow,
    getNavigationLink,
    getList,
    getMain,
    getRowLink,
    getRows,
    getText,
    queryInRow,
    queryList,
    queryNavigation,
    queryNavigationLink,
  };
};
