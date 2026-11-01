import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "@/app/features/board/equipment-board/constants/EquipmentBoardCopy.constants";
import {
  E2E_BOARD_CARD_SELECTOR,
  E2E_BOARD_LAYOUT,
} from "../constants/E2eBoard.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createBoardPage = (page: Page) => {
  const main = getMainRegion(page);

  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.BOARD);
  };

  const getHeading = (): Locator =>
    main.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: EQUIPMENT_BOARD_COPY.PAGE_TITLE,
    });

  const getSubtitle = (): Locator =>
    main.getByText(EQUIPMENT_BOARD_COPY.PAGE_DESCRIPTION, {
      exact: true,
    });

  const getGrid = (): Locator =>
    main.getByRole(ARIA_ROLE.LIST, {
      name: EQUIPMENT_BOARD_COPY.GRID_LABEL,
    });

  const getCards = (): Locator =>
    getGrid().locator(
      E2E_BOARD_CARD_SELECTOR(ARIA_ROLE.LISTITEM)
    );

  const getCard = (label: string): Locator =>
    getCards().filter({
      has: page.getByRole(ARIA_ROLE.HEADING, {
        exact: true,
        name: label,
      }),
    });

  const getCardText = (
    card: Locator,
    text: string
  ): Locator => card.getByText(text, { exact: true });

  const getButtons = (card: Locator): Locator =>
    card.getByRole(ARIA_ROLE.BUTTON);

  const getTextInMain = (text: string): Locator =>
    main.getByText(text);

  const countCardsInFirstRow = (): Promise<number> =>
    getCards().evaluateAll((cards, tolerance: number) => {
      const tops = cards.map(
        (card) => card.getBoundingClientRect().top
      );
      const [firstTop] = tops;

      return tops.filter(
        (top) => Math.abs(top - firstTop) <= tolerance
      ).length;
    }, E2E_BOARD_LAYOUT.ROW_TOLERANCE_PX);

  return {
    countCardsInFirstRow,
    getCard,
    getButtons,
    getCards,
    getCardText,
    getGrid,
    getHeading,
    getSubtitle,
    getTextInMain,
    goTo,
  };
};
