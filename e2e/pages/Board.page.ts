import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "@/app/features/access/system-navigation/constants/SystemNavigationCopy.constants";
import { EQUIPMENT_BOARD_COPY } from "@/app/features/board/equipment-board/constants/EquipmentBoardCopy.constants";
import {
  E2E_BOARD_CARD_SELECTOR,
  E2E_BOARD_LAYOUT,
} from "../constants/E2eBoard.constants";
import type { BoardRowMeasure } from "../models/BoardRowMeasure.interface";
import type { BoardRowMeasureInput } from "../models/BoardRowMeasureInput.interface";
import {
  E2E_COUNT,
  HEADING_LEVEL,
} from "../constants/E2eRuntime.constants";
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

  const getCardLinks = (): Locator =>
    getGrid().getByRole(ARIA_ROLE.LINK);

  const getLinksIn = (card: Locator): Locator =>
    card.getByRole(ARIA_ROLE.LINK);

  const clickCard = async (
    label: string
  ): Promise<void> => {
    await getGrid()
      .getByRole(ARIA_ROLE.LINK, {
        exact: true,
        name: label,
      })
      .click();
  };

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

  const resolveNavigationTop =
    async (): Promise<number> => {
      const navigation = page.getByRole(
        ARIA_ROLE.NAVIGATION,
        {
          name: SYSTEM_NAVIGATION_COPY.LABEL,
        }
      );

      if ((await navigation.count()) === E2E_COUNT.NONE) {
        return Number.POSITIVE_INFINITY;
      }

      const navigationBox = await navigation.boundingBox();

      return navigationBox === null
        ? Number.POSITIVE_INFINITY
        : navigationBox.y;
    };

  const measureCardRows =
    async (): Promise<BoardRowMeasure> => {
      const navigationTop = await resolveNavigationTop();

      return getCards().evaluateAll(
        (cards, input: BoardRowMeasureInput) => {
          const rects = cards.map((card) =>
            card.getBoundingClientRect()
          );
          const bottomLimit = Math.min(
            window.innerHeight,
            input.navigationTop
          );
          const rowTops: number[] = [];

          rects.forEach((rect) => {
            if (
              !rowTops.some(
                (top) =>
                  Math.abs(top - rect.top) <=
                  input.tolerance
              )
            ) {
              rowTops.push(rect.top);
            }
          });

          const fullyVisibleRows = rowTops.filter(
            (rowTop) =>
              rects
                .filter(
                  (rect) =>
                    Math.abs(rect.top - rowTop) <=
                    input.tolerance
                )
                .every(
                  (rect) =>
                    rect.top >= 0 &&
                    rect.bottom <= bottomLimit
                )
          ).length;

          return {
            fullyVisibleRows,
            totalRows: rowTops.length,
          };
        },
        {
          navigationTop,
          tolerance: E2E_BOARD_LAYOUT.ROW_TOLERANCE_PX,
        }
      );
    };

  return {
    clickCard,
    countCardsInFirstRow,
    measureCardRows,
    getCard,
    getButtons,
    getCardLinks,
    getCards,
    getCardText,
    getGrid,
    getHeading,
    getLinksIn,
    getSubtitle,
    getTextInMain,
    goTo,
  };
};
