import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createUnorderedListPage = () => {
  const getList = () => screen.getByRole(ARIA_ROLE.LIST);

  const getItems = () =>
    screen.getAllByRole(ARIA_ROLE.LISTITEM);

  const getListElement = () =>
    document.querySelector("ul") as HTMLElement;

  return { getItems, getList, getListElement };
};
