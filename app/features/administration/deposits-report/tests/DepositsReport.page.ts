import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createDepositsReportPage = () => {
  const getList = (name: string) =>
    screen.getByRole(ARIA_ROLE.LIST, { name });

  const queryList = (name: string) =>
    screen.queryByRole(ARIA_ROLE.LIST, { name });

  const queryAnyList = () =>
    screen.queryByRole(ARIA_ROLE.LIST);

  const getRows = (name: string) =>
    within(getList(name)).getAllByRole(ARIA_ROLE.LISTITEM);

  const getAllRows = () =>
    screen.getAllByRole(ARIA_ROLE.LISTITEM);

  const getHeadings = (level: number) =>
    screen.getAllByRole(ARIA_ROLE.HEADING, { level });

  const getText = (text: string) => screen.getByText(text);

  const queryText = (text: string) =>
    screen.queryByText(text);

  const queryTextMatching = (pattern: RegExp) =>
    screen.queryByText(pattern);

  const getAlert = () => screen.getByRole(ARIA_ROLE.ALERT);

  const getStatus = () =>
    screen.getByRole(ARIA_ROLE.STATUS);

  const getInRow = (row: HTMLElement, text: string) =>
    within(row).getByText(text);

  const queryInRow = (row: HTMLElement, text: string) =>
    within(row).queryByText(text);

  const getLeafByExactText = (
    row: HTMLElement,
    text: string
  ) =>
    within(row).getByText(
      (_, element) =>
        element?.children.length === 0 &&
        element.textContent === text
    );

  const getByRawText = (row: HTMLElement, text: string) =>
    within(row).getByText(
      (_, element) =>
        element?.children.length === 0 &&
        element.textContent === text,
      { normalizer: (value) => value }
    );

  return {
    getAlert,
    getAllRows,
    getByRawText,
    getHeadings,
    getInRow,
    getLeafByExactText,
    getList,
    getRows,
    getStatus,
    getText,
    queryAnyList,
    queryInRow,
    queryList,
    queryText,
    queryTextMatching,
  };
};
