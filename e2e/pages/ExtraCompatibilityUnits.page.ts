import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { EXTRA_COMPATIBILITY_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCompatibilityCopy.constants";
import { resolveExtraCompatibilityCategoryPath } from "@/app/features/administration/extra-catalog/utils/resolveExtraCompatibilityCategoryPath";
import { E2E_COMPATIBILITY_SELECTOR } from "../constants/E2eExtraCompatibility.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

export const createExtraCompatibilityUnitsPage = (
  page: Page
) => {
  const goTo = async (
    extraId: string,
    categoryId: string
  ): Promise<void> => {
    await page.goto(
      resolveExtraCompatibilityCategoryPath(
        extraId,
        categoryId
      )
    );
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: EXTRA_COMPATIBILITY_COPY.UNITS_TITLE,
    });

  const getInstruction = (
    extraName: string,
    categoryName: string
  ): Locator =>
    page.getByText(
      EXTRA_COMPATIBILITY_COPY.UNITS_INSTRUCTION(
        extraName,
        categoryName
      ),
      { exact: true }
    );

  const getUnitCheckbox = (unitCode: string): Locator =>
    page.getByRole(ARIA_ROLE.CHECKBOX, { name: unitCode });

  const getUnitRow = (unitCode: string): Locator =>
    page
      .locator(E2E_COMPATIBILITY_SELECTOR.UNIT_ROW)
      .filter({ has: getUnitCheckbox(unitCode) });

  const getSelectAllButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.SELECT_ALL_BUTTON,
    });

  const getClearAllButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.CLEAR_ALL_BUTTON,
    });

  const getSaveButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.SAVE_BUTTON,
    });

  const getCancelButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message, { exact: true });

  return {
    goTo,
    getCancelButton,
    getClearAllButton,
    getHeading,
    getInstruction,
    getSaveButton,
    getSelectAllButton,
    getToastMessage,
    getUnitCheckbox,
    getUnitRow,
  };
};
