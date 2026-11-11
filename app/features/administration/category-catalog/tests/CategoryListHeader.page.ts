import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

export const createCategoryListHeaderPage = () => {
  const getCreateLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.CREATE_CTA,
    });

  const getTitle = () =>
    screen.queryByRole(ARIA_ROLE.HEADING, {
      name: CATEGORY_CATALOG_COPY.LIST_TITLE,
    });

  const getInventoryLabel = (label: string) =>
    screen.queryByText(label);

  return {
    getCreateLink,
    getInventoryLabel,
    getTitle,
  };
};
