import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import {
  BAR_FILL_SELECTOR,
  BAR_WIDTH_ATTRIBUTE,
} from "./DailyIncome.constants";

export const createDailyIncomePage = () => {
  const getRegion = (name: string) =>
    screen.getByRole(ARIA_ROLE.REGION, { name });

  const getList = (name: string) =>
    screen.getByRole(ARIA_ROLE.LIST, { name });

  const queryList = () =>
    screen.queryByRole(ARIA_ROLE.LIST);

  const getRows = (name: string) =>
    within(getList(name)).getAllByRole(ARIA_ROLE.LISTITEM);

  const getBarWidths = (name: string) =>
    getRows(name).map((row) =>
      row
        .querySelector(BAR_FILL_SELECTOR)
        ?.getAttribute(BAR_WIDTH_ATTRIBUTE)
    );

  const getLeafByExactText = (
    container: HTMLElement,
    text: string
  ) =>
    within(container).getByText(
      (_, element) =>
        element?.children.length === 0 &&
        element.textContent === text
    );

  const queryText = (text: string) =>
    screen.queryByText(text);

  const getHeadings = (level: number) =>
    screen.getAllByRole(ARIA_ROLE.HEADING, { level });

  const queryRegions = () =>
    screen.queryAllByRole(ARIA_ROLE.REGION);

  const getAlert = () => screen.getByRole(ARIA_ROLE.ALERT);

  const getStatus = () =>
    screen.getByRole(ARIA_ROLE.STATUS);

  const getMain = () => screen.getByRole(ARIA_ROLE.MAIN);

  const getText = (text: string) => screen.getByText(text);

  return {
    getAlert,
    getBarWidths,
    getHeadings,
    getMain,
    getStatus,
    getText,
    queryRegions,
    getLeafByExactText,
    getList,
    getRegion,
    getRows,
    queryList,
    queryText,
  };
};
