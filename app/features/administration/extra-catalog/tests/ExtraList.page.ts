import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";

export const createExtraListPage = () => {
  const user = userEvent.setup();

  const getCard = (name: string) =>
    screen.queryByRole(ARIA_ROLE.GROUP, { name });

  const getEditLink = (name: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, { name })
    ).queryByRole(ARIA_ROLE.LINK, {
      name: EXTRA_CATALOG_COPY.EDIT_LINK,
    });

  const getStatusLabel = (name: string, label: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, { name })
    ).queryByText(label);

  const getTitle = () =>
    screen.queryByRole(ARIA_ROLE.HEADING, {
      name: EXTRA_CATALOG_COPY.LIST_TITLE,
    });

  const getCreateLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: EXTRA_CATALOG_COPY.CREATE_CTA,
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
    screen.queryByRole(ARIA_ROLE.HEADING, {
      name: EXTRA_CATALOG_COPY.EMPTY_STATE_TITLE,
    });

  const getErrorMessage = () =>
    screen.queryByText(
      EXTRA_CATALOG_COPY.FETCH_ERROR_MESSAGE
    );

  const getRetryButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_CATALOG_COPY.RETRY_BUTTON,
    });

  const clickRetry = async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: EXTRA_CATALOG_COPY.RETRY_BUTTON,
      })
    );
  };

  return {
    clickRetry,
    getCard,
    getCreateLink,
    getEditLink,
    getEmptyStateTitle,
    getErrorMessage,
    getNextLink,
    getPreviousLink,
    getRetryButton,
    getStatusLabel,
    getTitle,
  };
};
