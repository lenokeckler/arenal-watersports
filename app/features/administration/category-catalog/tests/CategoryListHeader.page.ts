import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

export const createCategoryListHeaderPage = () => {
  const getCreateLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.CREATE_CTA,
    });

  return {
    getCreateLink,
  };
};
