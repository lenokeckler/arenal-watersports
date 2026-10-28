import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";

export const createPendingDepositsPage = () => {
  const getHeadings = (level: number) =>
    screen.getAllByRole(ARIA_ROLE.HEADING, { level });

  const getList = () =>
    screen.getByRole(ARIA_ROLE.LIST, {
      name: PENDING_DEPOSITS_COPY.LIST_ARIA_LABEL,
    });

  const queryList = () =>
    screen.queryByRole(ARIA_ROLE.LIST);

  const getRows = () =>
    within(getList()).getAllByRole(ARIA_ROLE.LISTITEM);

  const getAllRows = () =>
    screen.getAllByRole(ARIA_ROLE.LISTITEM);

  const getAlert = () => screen.getByRole(ARIA_ROLE.ALERT);

  const queryText = (text: string) =>
    screen.queryByText(text);

  const getStatus = () =>
    screen.getByRole(ARIA_ROLE.STATUS);

  const getMain = () => screen.getByRole(ARIA_ROLE.MAIN);

  const getText = (text: string) => screen.getByText(text);

  const getLeafByExactText = (
    row: HTMLElement,
    text: string
  ) =>
    within(row).getByText(
      (_, element) =>
        element?.children.length === 0 &&
        element.textContent === text
    );

  return {
    getAlert,
    getAllRows,
    getHeadings,
    getLeafByExactText,
    getList,
    getMain,
    getRows,
    getStatus,
    getText,
    queryList,
    queryText,
  };
};
