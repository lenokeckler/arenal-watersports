import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";

const keepTextAsIs = (text: string): string => text;

export const createComboListPage = () => {
  const user = userEvent.setup();

  const getCard = (name: string) =>
    within(screen.getByRole(ARIA_ROLE.GROUP, { name }));

  const queryCard = (name: string) =>
    screen.queryByRole(ARIA_ROLE.GROUP, { name });

  const queryText = (name: string, text: string) =>
    getCard(name).queryByText(text, {
      normalizer: keepTextAsIs,
    });

  const queryButton = (name: string, buttonName: string) =>
    getCard(name).queryByRole(ARIA_ROLE.BUTTON, {
      name: buttonName,
    });

  const getTitle = () =>
    screen.queryByRole(ARIA_ROLE.HEADING, {
      name: COMBO_CATALOG_COPY.LIST_TITLE,
    });

  const querySectionTitle = (title: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name: title });

  const queryEmptyMessage = (message: string) =>
    screen.queryByText(message);

  const getCreateLink = () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: COMBO_CATALOG_COPY.CREATE_CTA,
    });

  const getEditLink = (name: string) =>
    getCard(name).getByRole(ARIA_ROLE.LINK, {
      name: COMBO_CATALOG_COPY.EDIT_LINK,
    });

  const getErrorMessage = () =>
    screen.queryByText(
      COMBO_CATALOG_COPY.FETCH_ERROR_MESSAGE
    );

  const querySheet = () =>
    screen.queryByRole(ARIA_ROLE.DIALOG);

  const clickCardButton = async (
    name: string,
    buttonName: string
  ): Promise<void> => {
    await user.click(
      getCard(name).getByRole(ARIA_ROLE.BUTTON, {
        name: buttonName,
      })
    );
  };

  const clickRemove = (name: string): Promise<void> =>
    clickCardButton(name, COMBO_CATALOG_COPY.REMOVE_BUTTON);

  const clickReactivate = (name: string): Promise<void> =>
    clickCardButton(
      name,
      COMBO_CATALOG_COPY.REACTIVATE_BUTTON
    );

  const clickSheetButton = async (
    buttonName: string
  ): Promise<void> => {
    await user.click(
      within(screen.getByRole(ARIA_ROLE.DIALOG)).getByRole(
        ARIA_ROLE.BUTTON,
        { name: buttonName }
      )
    );
  };

  const confirmRemoval = (): Promise<void> =>
    clickSheetButton(COMBO_CATALOG_COPY.REMOVE_BUTTON);

  const cancelRemoval = (): Promise<void> =>
    clickSheetButton(COMBO_CATALOG_COPY.CANCEL_BUTTON);

  const clickRetry = async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_CATALOG_COPY.RETRY_BUTTON,
      })
    );
  };

  return {
    cancelRemoval,
    clickRemove,
    clickReactivate,
    clickRetry,
    confirmRemoval,
    getCreateLink,
    getEditLink,
    getErrorMessage,
    getTitle,
    queryButton,
    queryCard,
    queryEmptyMessage,
    querySectionTitle,
    querySheet,
    queryText,
  };
};
