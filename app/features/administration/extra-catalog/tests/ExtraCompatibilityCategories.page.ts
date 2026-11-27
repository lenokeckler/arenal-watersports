import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";

export const createExtraCompatibilityCategoriesPage =
  () => {
    const getTitle = () =>
      screen.queryByRole(ARIA_ROLE.HEADING, {
        name: EXTRA_COMPATIBILITY_COPY.CATEGORIES_TITLE,
      });

    const getInstruction = (extraName: string) =>
      screen.queryByText(
        EXTRA_COMPATIBILITY_COPY.CATEGORIES_INSTRUCTION(
          extraName
        )
      );

    const getCategoryLink = (categoryName: string) =>
      screen
        .queryAllByRole(ARIA_ROLE.LINK)
        .find((link) =>
          within(link).queryByText(categoryName)
        );

    const queryCategoryProgress = (
      categoryName: string,
      progressLabel: string
    ) => {
      const link = getCategoryLink(categoryName);
      return link
        ? within(link).queryByText(progressLabel)
        : null;
    };

    const getEmptyStateTitle = () =>
      screen.queryByRole(ARIA_ROLE.HEADING, {
        name: EXTRA_COMPATIBILITY_COPY.CATEGORIES_EMPTY_TITLE,
      });

    const getBackLink = () =>
      screen.queryByRole(ARIA_ROLE.LINK, {
        name: EXTRA_COMPATIBILITY_COPY.BACK_TO_EXTRAS_LINK,
      });

    return {
      getBackLink,
      getCategoryLink,
      getEmptyStateTitle,
      getInstruction,
      getTitle,
      queryCategoryProgress,
    };
  };
