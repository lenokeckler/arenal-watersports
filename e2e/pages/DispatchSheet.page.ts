import type { Locator, Page } from "@playwright/test";
import { ACTION_SHEET_COPY } from "@/app/components/action-sheet/constants/ActionSheetCopy.constants";
import { DISPATCH_SHEET_COPY } from "@/app/components/dispatch-board/constants/DispatchSheetCopy.constants";
import { ARIA_ROLE } from "@/app/constants";

export const createDispatchSheetPage = (page: Page) => {
  const dialog = page.getByRole(ARIA_ROLE.DIALOG);

  return {
    getClose: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: ACTION_SHEET_COPY.CLOSE,
      }),
    getDialog: (): Locator => dialog,
    getOpenButton: (customerName: string): Locator =>
      page.getByRole(ARIA_ROLE.BUTTON, {
        name: `${DISPATCH_SHEET_COPY.ACTION_LABEL_PREFIX}${customerName}`,
      }),
    getFuelField: (code: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByLabel(DISPATCH_SHEET_COPY.FUEL_FIELD_LABEL),
    getFuelPreset: (code: string, name: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByRole(ARIA_ROLE.BUTTON, { name }),
    getUsageField: (code: string, label: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByLabel(label),
    getSubmit: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: DISPATCH_SHEET_COPY.SUBMIT,
      }),
    getUnit: (code: string): Locator =>
      dialog.getByRole(ARIA_ROLE.CHECKBOX, { name: code }),
  };
};
