import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import CategoryListHeader from "../components/CategoryListHeader";
import { resolveCategoryInventoryLabel } from "../utils/resolveCategoryInventoryLabel";
import { createCategoryListHeaderPage } from "./CategoryListHeader.page";

const FAKE_TOTAL_COUNT = 13;

describe("CategoryListHeader", () => {
  it("renders the create-category link pointing at the create route", () => {
    render(
      <CategoryListHeader totalCount={FAKE_TOTAL_COUNT} />
    );
    const categoryListHeaderPage =
      createCategoryListHeaderPage();

    expect(
      categoryListHeaderPage.getCreateLink()
    ).toHaveAttribute(
      "href",
      PATHS.ADMINISTRATION.CATEGORIES_NEW
    );
  });

  it("renders the page title and the registered total as text", () => {
    render(
      <CategoryListHeader totalCount={FAKE_TOTAL_COUNT} />
    );
    const categoryListHeaderPage =
      createCategoryListHeaderPage();

    expect(
      categoryListHeaderPage.getTitle()
    ).toBeInTheDocument();
    expect(
      categoryListHeaderPage.getInventoryLabel(
        resolveCategoryInventoryLabel(FAKE_TOTAL_COUNT)
      )
    ).toBeInTheDocument();
  });
});
