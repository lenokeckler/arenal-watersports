import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { COMBO_AUDIENCE_TITLE } from "@/app/features/administration/combo-catalog/constants/ComboAudienceCopy.constants";
import { COMBO_CATALOG_COPY } from "@/app/features/administration/combo-catalog/constants/ComboCatalogCopy.constants";
import type { ComboAudience } from "@/app/features/administration/combo-catalog/models/ComboAudience.type";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

const SECTION_SELECTOR = "section";

export const createComboListPage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.ADMINISTRATION.COMBOS);
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: COMBO_CATALOG_COPY.LIST_TITLE,
    });

  const getAudienceSection = (
    audience: ComboAudience
  ): Locator =>
    page.locator(SECTION_SELECTOR).filter({
      has: page.getByRole(ARIA_ROLE.HEADING, {
        name: COMBO_AUDIENCE_TITLE[audience],
      }),
    });

  const getCardIn = (
    audience: ComboAudience,
    comboName: string
  ): Locator =>
    getAudienceSection(audience).getByRole(
      ARIA_ROLE.GROUP,
      {
        name: comboName,
        exact: true,
      }
    );

  const getComboCard = (comboName: string): Locator =>
    page.getByRole(ARIA_ROLE.GROUP, {
      name: comboName,
      exact: true,
    });

  const getCardText = (
    comboName: string,
    text: string
  ): Locator =>
    getComboCard(comboName).getByText(text, {
      exact: true,
    });

  const getRemoveButton = (comboName: string): Locator =>
    getComboCard(comboName).getByRole(ARIA_ROLE.BUTTON, {
      name: COMBO_CATALOG_COPY.REMOVE_BUTTON,
    });

  const getReactivateButton = (
    comboName: string
  ): Locator =>
    getComboCard(comboName).getByRole(ARIA_ROLE.BUTTON, {
      name: COMBO_CATALOG_COPY.REACTIVATE_BUTTON,
    });

  const getRemovalConfirmButton = (): Locator =>
    page
      .getByRole(ARIA_ROLE.DIALOG)
      .getByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_CATALOG_COPY.REMOVE_BUTTON,
      });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message, { exact: true });

  const removeCombo = async (
    comboName: string
  ): Promise<void> => {
    await getRemoveButton(comboName).click();
    await getRemovalConfirmButton().click();
  };

  return {
    goTo,
    getHeading,
    getCardIn,
    getComboCard,
    getCardText,
    getRemoveButton,
    getReactivateButton,
    getRemovalConfirmButton,
    getToastMessage,
    removeCombo,
  };
};
