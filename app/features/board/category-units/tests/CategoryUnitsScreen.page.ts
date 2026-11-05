import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { HEADING_LEVEL_ONE } from "./CategoryUnitsScreen.constants";
import { createCategoryUnitsPage } from "./CategoryUnits.page";

export const createCategoryUnitsScreenPage = () => {
  const user = userEvent.setup();

  const getMain = () => screen.getByRole(ARIA_ROLE.MAIN);

  const getTitle = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL_ONE,
    });

  const getBackLink = () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_UNITS_COPY.BACK_TO_BOARD,
    });

  const getGroupSwitch = () =>
    screen.getByRole(ARIA_ROLE.NAVIGATION, {
      name: CATEGORY_UNITS_COPY.GROUP_SWITCH_LABEL,
    });

  const queryGroupSwitch = () =>
    screen.queryByRole(ARIA_ROLE.NAVIGATION, {
      name: CATEGORY_UNITS_COPY.GROUP_SWITCH_LABEL,
    });

  const getSwitchLinks = () =>
    within(getGroupSwitch()).getAllByRole(ARIA_ROLE.LINK);

  const getSwitchLink = (name: string) =>
    within(getGroupSwitch()).getByRole(ARIA_ROLE.LINK, {
      name,
    });

  const queryList = () =>
    screen.queryByRole(ARIA_ROLE.LIST);

  const getPageText = (text: string) =>
    screen.getByText(text);

  const queryPageText = (text: string) =>
    screen.queryByText(text);

  const queryNextLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_UNITS_COPY.PAGINATION_NEXT,
    });

  const queryPreviousLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_UNITS_COPY.PAGINATION_PREVIOUS,
    });

  const getPagination = () =>
    screen.getByRole(ARIA_ROLE.NAVIGATION, {
      name: CATEGORY_UNITS_COPY.PAGINATION_NAV_LABEL,
    });

  const getAlert = () => screen.getByRole(ARIA_ROLE.ALERT);

  const getStatus = () =>
    screen.getByRole(ARIA_ROLE.STATUS);

  const getRetryButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.RETRY,
    });

  const retry = async () => {
    await user.click(getRetryButton());
  };

  return {
    ...createCategoryUnitsPage(),
    getAlert,
    getBackLink,
    getGroupSwitch,
    getMain,
    getPagination,
    getPageText,
    getRetryButton,
    getStatus,
    getSwitchLink,
    getSwitchLinks,
    getTitle,
    queryGroupSwitch,
    queryList,
    queryNextLink,
    queryPageText,
    queryPreviousLink,
    retry,
  };
};
