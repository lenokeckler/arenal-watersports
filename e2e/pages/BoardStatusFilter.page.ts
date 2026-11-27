import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  BOARD_UNIT_FILTER_COPY,
  PATHS,
  type BoardUnitFilter,
} from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "@/app/features/board/category-units/constants/CategoryUnitsCopy.constants";
import { getMainRegion } from "../support/mainRegion";

const startingWith = (text: string): RegExp =>
  new RegExp(`^${text}`);

const chooseFilter = async (
  page: Page,
  trigger: Locator,
  filter: BoardUnitFilter
): Promise<void> => {
  await trigger.click();
  await page
    .getByRole(ARIA_ROLE.NAVIGATION, {
      name: BOARD_UNIT_FILTER_COPY.NAV_LABEL,
    })
    .getByRole(ARIA_ROLE.LINK, {
      name: startingWith(
        BOARD_UNIT_FILTER_COPY.LABELS[filter]
      ),
    })
    .click();
};

export const createBoardStatusFilterPage = (page: Page) => {
  const main = getMainRegion(page);
  const getUnit = (code: string): Locator =>
    main.getByText(code, { exact: true });
  const findLink = (
    region: Locator,
    name: string
  ): Locator =>
    region.getByRole(ARIA_ROLE.LINK, {
      name: new RegExp(name),
    });
  const getTrigger = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: startingWith(
        BOARD_UNIT_FILTER_COPY.TRIGGER_LABEL("")
      ),
    });

  return {
    choose: (filter: BoardUnitFilter): Promise<void> =>
      chooseFilter(page, getTrigger(), filter),
    getAccessLink: (name: string): Locator =>
      findLink(
        page.getByRole(ARIA_ROLE.NAVIGATION, {
          name: CATEGORY_UNITS_COPY.ACCESS_LABEL,
        }),
        name
      ),
    getCategoryCard: (name: string): Locator =>
      findLink(main, name),
    getTrigger,
    getUnit,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.BOARD);
    },
    openUnit: (code: string): Promise<void> =>
      getUnit(code).click(),
  };
};
