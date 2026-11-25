import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { ACTION_SHEET_COPY } from "@/app/components/action-sheet/constants/ActionSheetCopy.constants";
import { DISPATCH_SHEET_COPY } from "@/app/components/dispatch-board/constants/DispatchSheetCopy.constants";
import { ARIA_ROLE } from "@/app/constants";

export const createDispatchSheetPage = (page: Page) => {
  const dialog = page.getByRole(ARIA_ROLE.DIALOG);

  return {
    confirm: async (): Promise<void> => {
      const submit = dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: DISPATCH_SHEET_COPY.SUBMIT,
      });

      await expect(submit).toBeEnabled();
      await submit.click();
    },
    getChangeUnits: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: DISPATCH_SHEET_COPY.CHANGE_UNITS,
      }),
    getClose: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: ACTION_SHEET_COPY.CLOSE,
      }),
    getDialog: (): Locator => dialog,
    getGaugeLine: (code: string, name: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByRole(ARIA_ROLE.BUTTON, { name }),
    getOpenButton: (customerName: string): Locator =>
      page.getByRole(ARIA_ROLE.BUTTON, {
        name: `${DISPATCH_SHEET_COPY.ACTION_LABEL_PREFIX}${customerName}`,
      }),
    getRadio: (): Locator =>
      dialog.getByLabel(
        DISPATCH_SHEET_COPY.RADIO_FIELD_LABEL
      ),
    getSubmit: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: DISPATCH_SHEET_COPY.SUBMIT,
      }),
    getTakeLess: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: DISPATCH_SHEET_COPY.TAKE_LESS,
      }),
    getUnit: (code: string): Locator =>
      dialog.getByRole(ARIA_ROLE.CHECKBOX, { name: code }),
  };
};
