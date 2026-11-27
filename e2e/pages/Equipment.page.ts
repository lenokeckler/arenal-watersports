import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { SCREEN_BACK_COPY } from "@/app/components/screen-back/constants/ScreenBackCopy.constants";
import { EQUIPMENT_BOARD_COPY } from "@/app/features/board/equipment-board/constants/EquipmentBoardCopy.constants";
import { EQUIPMENT_HUB_COPY } from "@/app/features/operations/equipment-hub/constants/EquipmentHubCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createEquipmentPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getBoardButton: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: new RegExp(
          `^${EQUIPMENT_BOARD_COPY.TEAM_TITLE}`
        ),
      }),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: EQUIPMENT_HUB_COPY.HEADING,
        exact: true,
      }),
    goBack: (): Promise<void> =>
      main
        .getByRole(ARIA_ROLE.LINK, {
          name: new RegExp(SCREEN_BACK_COPY.LABEL),
        })
        .click(),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.BOARD);
    },
    openCard: (title: string): Promise<void> =>
      main
        .getByRole(ARIA_ROLE.LINK, {
          name: new RegExp(`^\\S*\\s*${title}`),
        })
        .first()
        .click(),
  };
};
