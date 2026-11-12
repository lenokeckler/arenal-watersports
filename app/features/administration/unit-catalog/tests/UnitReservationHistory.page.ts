import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { UNIT_RESERVATION_HISTORY_COPY } from "../constants/UnitReservationHistoryCopy.constants";

export const createUnitReservationHistoryPage = () => {
  const user = userEvent.setup();

  const getSection = () =>
    screen.getByRole(ARIA_ROLE.REGION, {
      name: UNIT_RESERVATION_HISTORY_COPY.TITLE,
    });

  const getRows = () =>
    within(getSection()).queryAllByRole(ARIA_ROLE.LISTITEM);

  const getRowTexts = () =>
    getRows().map((row) => row.textContent);

  const getRowLinks = () =>
    within(getSection()).queryAllByRole(ARIA_ROLE.LINK);

  const getEmptyStateTitle = () =>
    screen.queryByRole(ARIA_ROLE.HEADING, {
      name: UNIT_RESERVATION_HISTORY_COPY.EMPTY_STATE_TITLE,
    });

  const getErrorMessage = () =>
    screen.queryByText(
      UNIT_RESERVATION_HISTORY_COPY.FETCH_ERROR_MESSAGE
    );

  const getPreviousLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.PREVIOUS,
    });

  const getNextLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.NEXT,
    });

  const clickRetry = async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: UNIT_RESERVATION_HISTORY_COPY.RETRY_BUTTON,
      })
    );
  };

  return {
    clickRetry,
    getEmptyStateTitle,
    getErrorMessage,
    getNextLink,
    getPreviousLink,
    getRowLinks,
    getRows,
    getRowTexts,
    getSection,
  };
};
