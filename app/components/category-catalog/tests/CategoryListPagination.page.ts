import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

export const createCategoryListPaginationPage = () => {
  const getNavigation = () =>
    screen.queryByRole("navigation", {
      name: CATEGORY_CATALOG_COPY.PAGINATION_NAV_LABEL,
    });

  const getPreviousLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.PAGINATION_PREVIOUS,
    });

  const getNextLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.PAGINATION_NEXT,
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
