import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { LIST_PAGINATION_COPY } from "../constants/ListPaginationCopy.constants";
import { LIST_PAGINATION_NAV_LABEL } from "./ListPagination.constants";

export const createListPaginationPage = () => {
  const getNavigation = () =>
    screen.queryByRole("navigation", {
      name: LIST_PAGINATION_NAV_LABEL,
    });

  const getPreviousLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.PREVIOUS,
    });

  const getNextLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.NEXT,
    });

  const getStatus = (text: string) =>
    screen.queryByText(text);

  return {
    getNavigation,
    getPreviousLink,
    getNextLink,
    getStatus,
  };
};
