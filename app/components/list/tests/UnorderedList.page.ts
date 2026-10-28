import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createUnorderedListPage = () => {
  const getList = (name?: string) =>
    screen.getByRole(ARIA_ROLE.LIST, { name });

  const getItems = () =>
    screen.getAllByRole(ARIA_ROLE.LISTITEM);

  const getItemByTestId = (testId: string) =>
    screen.getByTestId(testId);

  const getListElement = () =>
    document.querySelector("ul") as HTMLElement;

  return {
    getItemByTestId,
    getItems,
    getList,
    getListElement,
  };
};
