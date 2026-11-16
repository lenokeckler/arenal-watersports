import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import ExtraCompatibilityCategoryListView from "../ExtraCompatibilityCategoryListView";
import { buildExtraCompatibilityProgressLabel } from "../utils/buildExtraCompatibilityProgressLabel";
import { resolveExtraCompatibilityCategoryPath } from "../utils/resolveExtraCompatibilityCategoryPath";
import { FAKE_EXTRA_NAME } from "./Extra.constants";
import {
  COMPATIBILITY_CATEGORIES,
  COMPATIBILITY_CATEGORY_SUMMARY,
  COMPATIBILITY_EXTRA_ID,
  NO_COMPATIBILITY_CATEGORIES,
  SINGLE_UNIT_CATEGORY_SUMMARY,
} from "./ExtraCompatibility.constants";
import { createExtraCompatibilityCategoriesPage } from "./ExtraCompatibilityCategories.page";

const CATEGORY_SUMMARIES = [
  COMPATIBILITY_CATEGORY_SUMMARY,
  SINGLE_UNIT_CATEGORY_SUMMARY,
];

describe("ExtraCompatibilityCategoryListView", () => {
  it("titles the screen and names the extra", () => {
    render(
      <ExtraCompatibilityCategoryListView
        {...COMPATIBILITY_CATEGORIES}
      />
    );
    const categoriesPage =
      createExtraCompatibilityCategoriesPage();

    expect(categoriesPage.getTitle()).toBeInTheDocument();
    expect(
      categoriesPage.getInstruction(FAKE_EXTRA_NAME)
    ).toBeInTheDocument();
  });

  it.each(CATEGORY_SUMMARIES)(
    "links the $name category to its units screen",
    (category) => {
      render(
        <ExtraCompatibilityCategoryListView
          {...COMPATIBILITY_CATEGORIES}
        />
      );

      expect(
        createExtraCompatibilityCategoriesPage().getCategoryLink(
          category.name
        )
      ).toHaveAttribute(
        "href",
        resolveExtraCompatibilityCategoryPath(
          COMPATIBILITY_EXTRA_ID,
          category.id
        )
      );
    }
  );

  it.each(CATEGORY_SUMMARIES)(
    "shows how many units of the $name category are linked",
    (category) => {
      render(
        <ExtraCompatibilityCategoryListView
          {...COMPATIBILITY_CATEGORIES}
        />
      );

      expect(
        createExtraCompatibilityCategoriesPage().queryCategoryProgress(
          category.name,
          buildExtraCompatibilityProgressLabel(
            category.linkedUnitCount,
            category.unitCount
          )
        )
      ).toBeInTheDocument();
    }
  );

  it("shows the empty state when no by-unit category has units", () => {
    render(
      <ExtraCompatibilityCategoryListView
        {...NO_COMPATIBILITY_CATEGORIES}
      />
    );

    expect(
      createExtraCompatibilityCategoriesPage().getEmptyStateTitle()
    ).toBeInTheDocument();
  });

  it("links back to the extras list", () => {
    render(
      <ExtraCompatibilityCategoryListView
        {...COMPATIBILITY_CATEGORIES}
      />
    );

    expect(
      createExtraCompatibilityCategoriesPage().getBackLink()
    ).toHaveAttribute("href", PATHS.ADMINISTRATION.EXTRAS);
  });
});
