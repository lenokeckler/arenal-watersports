import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { LIST_ITEM_ROLE } from "./UnorderedList.constants";

export const createUnorderedListPage = (
  container: HTMLElement
) => {
  const getList = (name?: string) =>
    screen.getByRole(ARIA_ROLE.LIST, { name });
  const getListElement = () =>
    container.querySelector("ul");
  const getItems = () =>
    screen.getAllByRole(LIST_ITEM_ROLE);
  const getItemByTestId = (testId: string) =>
    screen.getByTestId(testId);

  return {
    getItemByTestId,
    getItems,
    getList,
    getListElement,
  };
};
