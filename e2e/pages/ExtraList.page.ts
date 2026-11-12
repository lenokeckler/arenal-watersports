import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

export const createExtraListPage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.ADMINISTRATION.EXTRAS);
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: EXTRA_CATALOG_COPY.LIST_TITLE,
    });

  const getExtraCard = (extraName: string): Locator =>
    page.getByRole(ARIA_ROLE.GROUP, {
      name: extraName,
      exact: true,
    });

  const getExtraStatusChip = (
    extraName: string,
    statusLabel: string
  ): Locator =>
    getExtraCard(extraName).getByText(statusLabel, {
      exact: true,
    });

  const getExtraEditLink = (extraName: string): Locator =>
    getExtraCard(extraName).getByRole(ARIA_ROLE.LINK, {
      name: EXTRA_CATALOG_COPY.EDIT_LINK,
    });

  const getCreateLink = (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: EXTRA_CATALOG_COPY.CREATE_CTA,
    });

  const getRemoveButton = (extraName: string): Locator =>
    getExtraCard(extraName).getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_CATALOG_COPY.REMOVE_BUTTON,
    });

  const getRemovalConfirmMessage = (
    extraName: string
  ): Locator =>
    getExtraCard(extraName).getByText(
      EXTRA_CATALOG_COPY.REMOVAL_CONFIRM_MESSAGE
    );

  const getReactivateButton = (
    extraName: string
  ): Locator =>
    getExtraCard(extraName).getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_CATALOG_COPY.REACTIVATE_BUTTON,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message, { exact: true });

  return {
    goTo,
    getHeading,
    getExtraCard,
    getExtraStatusChip,
    getExtraEditLink,
    getCreateLink,
    getRemoveButton,
    getRemovalConfirmMessage,
    getReactivateButton,
    getToastMessage,
  };
};
