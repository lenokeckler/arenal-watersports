import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { ACTION_SHEET_COPY } from "@/app/components/action-sheet/constants/ActionSheetCopy.constants";
import {
  CLOSE_GROUP_COPY,
  CLOSE_GROUP_USAGE_COPY,
} from "@/app/features/operations/out-on-water/constants/CloseGroupCopy.constants";
import {
  DURATION_ADJUST_COPY,
  OUT_ON_WATER_COPY,
} from "@/app/features/operations/out-on-water/constants/OutOnWaterCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createOutOnWaterPage = (page: Page) => {
  const main = getMainRegion(page);

  const dialog = page.getByRole(ARIA_ROLE.DIALOG);

  return {
    getCloseArrival: (): Locator =>
      dialog.getByLabel(CLOSE_GROUP_COPY.ARRIVAL_LABEL),
    getCloseButton: (customerName: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: customerName })
        .getByRole(ARIA_ROLE.BUTTON, {
          name: CLOSE_GROUP_COPY.BUTTON,
        }),
    getCloseCause: (code: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByLabel(CLOSE_GROUP_COPY.CAUSE_LABEL),
    getCloseConfirm: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: CLOSE_GROUP_COPY.SUBMIT,
      }),
    getCloseMaintenance: (code: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByLabel(CLOSE_GROUP_COPY.MAINTENANCE_LABEL),
    getCloseDamage: (code: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByLabel(CLOSE_GROUP_COPY.DAMAGE_LABEL),
    getCloseDescription: (code: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByLabel(CLOSE_GROUP_COPY.DESCRIPTION_LABEL),
    getCloseFuelPreset: (
      code: string,
      name: string
    ): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByRole(ARIA_ROLE.BUTTON, { name }),
    getCloseUsage: (code: string): Locator =>
      dialog
        .getByRole(ARIA_ROLE.GROUP, {
          name: code,
          exact: true,
        })
        .getByLabel(
          CLOSE_GROUP_USAGE_COPY.engine_hours.LABEL
        ),
    getAdjustButton: (customerName: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: customerName })
        .getByRole(ARIA_ROLE.BUTTON, {
          name: OUT_ON_WATER_COPY.ADJUST_BUTTON,
        }),
    getAdjustDialog: (): Locator => dialog,
    getAdjustField: (): Locator =>
      dialog.getByLabel(DURATION_ADJUST_COPY.FIELD_LABEL),
    getAdjustPreset: (name: string): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, { name }),
    getAdjustSave: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: DURATION_ADJUST_COPY.SAVE,
      }),
    getAdjustClose: (): Locator =>
      dialog.getByRole(ARIA_ROLE.BUTTON, {
        name: ACTION_SHEET_COPY.CLOSE,
      }),
    getGroup: (customerName: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: customerName }),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: OUT_ON_WATER_COPY.HEADING,
      }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.OUT_ON_WATER);
    },
  };
};
