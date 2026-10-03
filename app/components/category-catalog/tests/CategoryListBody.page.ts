import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

export const createCategoryListBodyPage = () => {
  const user = userEvent.setup();

  const getErrorMessage = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.FETCH_ERROR_MESSAGE
    );

  const getRetryButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.RETRY_BUTTON,
    });

  const getEmptyStateTitle = () =>
    screen.queryByRole(ARIA_ROLE.HEADING, {
      name: CATEGORY_CATALOG_COPY.EMPTY_STATE_TITLE,
    });

  const getCreateCtaButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CREATE_CTA,
    });

  const getCategoryHeading = (name: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name });

  const clickRetry = async () => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_CATALOG_COPY.RETRY_BUTTON,
      })
    );
  };

  const clickCreateCta = async () => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_CATALOG_COPY.CREATE_CTA,
      })
    );
  };

  return {
    getErrorMessage,
    getRetryButton,
    getEmptyStateTitle,
    getCreateCtaButton,
    getCategoryHeading,
    clickRetry,
    clickCreateCta,
  };
};
