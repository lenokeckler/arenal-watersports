import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { UNIT_LIST_COPY } from "../constants/UnitListCopy.constants";

export const createUnitListPage = () => {
  const user = userEvent.setup();

  const getCard = (code: string) =>
    screen.queryByRole(ARIA_ROLE.GROUP, { name: code });

  const getEditLink = (code: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, { name: code })
    ).queryByRole(ARIA_ROLE.LINK, {
      name: UNIT_LIST_COPY.EDIT_LINK,
    });

  const getText = (text: string) =>
    screen.queryByText(text);

  const getTitle = (title: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name: title });

  const getBackLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: UNIT_LIST_COPY.BACK_TO_CATEGORIES_LINK,
    });

  const getPreviousLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.PREVIOUS,
    });

  const getNextLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.NEXT,
    });

  const getEmptyStateTitle = () =>
    getTitle(UNIT_LIST_COPY.EMPTY_STATE_TITLE);

  const getErrorMessage = () =>
    getText(UNIT_LIST_COPY.FETCH_ERROR_MESSAGE);

  const getRetryButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: UNIT_LIST_COPY.RETRY_BUTTON,
    });

  const clickRetry = async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: UNIT_LIST_COPY.RETRY_BUTTON,
      })
    );
  };

  return {
    clickRetry,
    getBackLink,
    getCard,
    getEditLink,
    getNextLink,
    getPreviousLink,
    getEmptyStateTitle,
    getErrorMessage,
    getRetryButton,
    getText,
    getTitle,
  };
};
