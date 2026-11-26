import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";

const keepTextAsIs = (text: string): string => text;

export const createTariffListPage = () => {
  const user = userEvent.setup();

  const getCard = (name: string) =>
    within(screen.getByRole(ARIA_ROLE.GROUP, { name }));

  const queryCard = (name: string) =>
    screen.queryByRole(ARIA_ROLE.GROUP, { name });

  const queryCardText = (name: string, text: string) =>
    getCard(name).queryByText(text, {
      normalizer: keepTextAsIs,
    });

  const queryCardUnits = (name: string) =>
    getCard(name).queryAllByText(
      TARIFF_CATALOG_COPY.UNIT_PER_HOUR
    );

  const getEditLink = (name: string) =>
    getCard(name).getByRole(ARIA_ROLE.LINK, {
      name: TARIFF_CATALOG_COPY.EDIT_LINK,
    });

  const getTitle = () =>
    screen.queryByRole(ARIA_ROLE.HEADING, {
      name: TARIFF_CATALOG_COPY.LIST_TITLE,
    });

  const queryEmptyMessage = () =>
    screen.queryByText(TARIFF_CATALOG_COPY.EMPTY_MESSAGE);

  const queryErrorMessage = () =>
    screen.queryByText(
      TARIFF_CATALOG_COPY.FETCH_ERROR_MESSAGE
    );

  const clickRetry = async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: TARIFF_CATALOG_COPY.RETRY_BUTTON,
      })
    );
  };

  return {
    clickRetry,
    getEditLink,
    getTitle,
    queryCard,
    queryCardText,
    queryCardUnits,
    queryEmptyMessage,
    queryErrorMessage,
  };
};
