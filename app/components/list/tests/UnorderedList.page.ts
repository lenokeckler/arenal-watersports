import { screen } from "@testing-library/react";
import {
  LIST_ITEM_ROLE,
  LIST_ROLE,
} from "./UnorderedList.constants";

export const createUnorderedListPage = () => {
  const getList = (name?: string) =>
    screen.getByRole(LIST_ROLE, { name });
  const getItems = () =>
    screen.getAllByRole(LIST_ITEM_ROLE);
  const getItemByTestId = (testId: string) =>
    screen.getByTestId(testId);

  return { getItemByTestId, getItems, getList };
};
