import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "@/app/features/board/category-units/constants/CategoryUnitsCopy.constants";
import { resolveBoardCategoryPath } from "@/app/utils/board-paths/resolveBoardCategoryPath";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createBoardCategoryUnitsPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(resolveBoardCategoryPath(categoryId));
  };

  const getHeading = (categoryName: string): Locator =>
    main.getByRole(ARIA_ROLE.HEADING, {
      exact: true,
      level: HEADING_LEVEL.PAGE,
      name: categoryName,
    });

  const getUnitHeading = (unitCode: string): Locator =>
    main.getByRole(ARIA_ROLE.HEADING, {
      exact: true,
      level: HEADING_LEVEL.SCREEN,
      name: unitCode,
    });

  const getSelectUnit = (unitCode: string): Locator =>
    main.getByRole(ARIA_ROLE.CHECKBOX, {
      name: CATEGORY_UNITS_COPY.DISPATCH_SELECT_UNIT(
        unitCode
      ),
    });

  const selectUnit = async (
    unitCode: string
  ): Promise<void> => {
    await getUnitHeading(unitCode).click();
  };

  const getDispatchBar = (selectedCount: number): Locator =>
    main.getByText(
      CATEGORY_UNITS_COPY.DISPATCH_SELECTED(selectedCount)
    );

  const getDispatchAction = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.DISPATCH_ACTION,
    });

  const getPickerAction = (customerName: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.PICKER_DISPATCH(
        customerName
      ),
    });

  const getBackLink = (): Locator =>
    main.getByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_UNITS_COPY.BACK_TO_BOARD,
    });

  const getGroupSwitch = (): Locator =>
    main.getByRole(ARIA_ROLE.NAVIGATION, {
      name: CATEGORY_UNITS_COPY.GROUP_SWITCH_LABEL,
    });

  const getSwitchLink = (name: string): Locator =>
    getGroupSwitch().getByRole(ARIA_ROLE.LINK, {
      exact: true,
      name,
    });

  const clickSwitchLink = async (
    name: string
  ): Promise<void> => {
    await getSwitchLink(name).click();
  };

  const getNotFoundTitle = (): Locator =>
    main.getByText(CATEGORY_UNITS_COPY.NOT_FOUND_TITLE, {
      exact: true,
    });

  return {
    clickSwitchLink,
    getBackLink,
    getDispatchAction,
    getDispatchBar,
    getGroupSwitch,
    getHeading,
    getNotFoundTitle,
    getPickerAction,
    getSelectUnit,
    selectUnit,
    getSwitchLink,
    getUnitHeading,
    goTo,
  };
};
