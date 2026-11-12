import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";

const keepTextAsIs = (text: string): string => text;

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

  const queryPrice = (name: string, price: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, { name })
    ).queryByText(price, { normalizer: keepTextAsIs });

  const queryCardButton = (
    name: string,
    buttonName: string
  ) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, { name })
    ).queryByRole(ARIA_ROLE.BUTTON, { name: buttonName });

  const queryRemoveButton = (name: string) =>
    queryCardButton(name, EXTRA_CATALOG_COPY.REMOVE_BUTTON);

  const queryRemovingButton = (name: string) =>
    queryCardButton(
      name,
      EXTRA_CATALOG_COPY.LOADING_TEXT_DELETING
    );

  const queryReactivateButton = (name: string) =>
    queryCardButton(
      name,
      EXTRA_CATALOG_COPY.REACTIVATE_BUTTON
    );

  const queryReactivatingButton = (name: string) =>
    queryCardButton(
      name,
      EXTRA_CATALOG_COPY.LOADING_TEXT_UPDATING
    );

  const queryCancelButton = (name: string) =>
    queryCardButton(name, EXTRA_CATALOG_COPY.CANCEL_BUTTON);

  const queryRemovalConfirmMessage = (name: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, { name })
    ).queryByText(
      EXTRA_CATALOG_COPY.REMOVAL_CONFIRM_MESSAGE
    );

  const clickCardButton = async (
    name: string,
    buttonName: string
  ): Promise<void> => {
    await user.click(
      within(
        screen.getByRole(ARIA_ROLE.GROUP, { name })
      ).getByRole(ARIA_ROLE.BUTTON, { name: buttonName })
    );
  };

  const clickRemove = (name: string): Promise<void> =>
    clickCardButton(name, EXTRA_CATALOG_COPY.REMOVE_BUTTON);

  const clickCancel = (name: string): Promise<void> =>
    clickCardButton(name, EXTRA_CATALOG_COPY.CANCEL_BUTTON);

  const clickReactivate = (name: string): Promise<void> =>
    clickCardButton(
      name,
      EXTRA_CATALOG_COPY.REACTIVATE_BUTTON
    );

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
    clickCancel,
    clickReactivate,
    clickRemove,
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
    queryCancelButton,
    queryPrice,
    queryReactivateButton,
    queryReactivatingButton,
    queryRemovalConfirmMessage,
    queryRemoveButton,
    queryRemovingButton,
  };
};
