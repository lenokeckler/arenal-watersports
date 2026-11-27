import {
  expect,
  type Locator,
  type Page,
} from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCompatibilityCopy.constants";
import {
  E2E_COMPATIBILITY_SAVE_ENABLED_TIMEOUT_MS,
  E2E_COMPATIBILITY_SELECTOR,
} from "../constants/E2eExtraCompatibility.constants";

export const createExtraCompatibilityUnitsPage = (
  page: Page
) => {
  const getOpenSection = (): Locator =>
    page.getByRole(ARIA_ROLE.REGION).filter({
      has: page.locator(
        E2E_COMPATIBILITY_SELECTOR.OPEN_SECTION_TOGGLE
      ),
    });

  const getInstruction = (): Locator =>
    page.getByText(
      EXTRA_COMPATIBILITY_COPY.BOATS_SUBTITLE,
      {
        exact: true,
      }
    );

  const getUnitCheckbox = (unitCode: string): Locator =>
    page.getByRole(ARIA_ROLE.CHECKBOX, { name: unitCode });

  const getUnitRow = (unitCode: string): Locator =>
    page
      .locator(E2E_COMPATIBILITY_SELECTOR.UNIT_ROW)
      .filter({ has: getUnitCheckbox(unitCode) });

  const getSelectAllButton = (): Locator =>
    getOpenSection().getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.SELECT_ALL_BUTTON,
    });

  const getClearAllButton = (): Locator =>
    getOpenSection().getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.CLEAR_ALL_BUTTON,
    });

  const getSaveButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.SAVE_BUTTON,
    });

  const getBackButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.BACK_BUTTON,
      exact: true,
    });

  const getLeaveWithoutSavingButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.LEAVE_DISCARD_BUTTON,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message, { exact: true });

  const changeSelection = (
    change: () => Promise<void>
  ): Promise<void> =>
    expect(async () => {
      await change();
      await expect(getSaveButton()).toBeEnabled({
        timeout: E2E_COMPATIBILITY_SAVE_ENABLED_TIMEOUT_MS,
      });
    }).toPass();

  const selectUnit = (unitCode: string): Promise<void> =>
    changeSelection(async () => {
      await getUnitCheckbox(unitCode).setChecked(false);
      await getUnitCheckbox(unitCode).check();
    });

  const selectAllUnits = (): Promise<void> =>
    changeSelection(() => getSelectAllButton().click());

  const clearAllUnits = (): Promise<void> =>
    changeSelection(() => getClearAllButton().click());

  const saveAndWait = async (): Promise<void> => {
    await getSaveButton().click();
    await expect(
      getToastMessage(
        EXTRA_COMPATIBILITY_COPY.SAVE_SUCCESS_TOAST
      )
    ).toBeVisible();
  };

  return {
    clearAllUnits,
    saveAndWait,
    selectAllUnits,
    selectUnit,
    getBackButton,
    getClearAllButton,
    getInstruction,
    getLeaveWithoutSavingButton,
    getSaveButton,
    getSelectAllButton,
    getToastMessage,
    getUnitCheckbox,
    getUnitRow,
  };
};
