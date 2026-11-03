import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
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

  const queryList = () =>
    screen.queryByRole(ARIA_ROLE.LIST);

  const getPageText = (text: string) =>
    screen.getByText(text);

  const queryPageText = (text: string) =>
    screen.queryByText(text);

  const queryNextLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.NEXT,
    });

  const queryPreviousLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.PREVIOUS,
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
    getMain,
    getPageText,
    getRetryButton,
    getStatus,
    getTitle,
    queryList,
    queryNextLink,
    queryPageText,
    queryPreviousLink,
    retry,
  };
};
