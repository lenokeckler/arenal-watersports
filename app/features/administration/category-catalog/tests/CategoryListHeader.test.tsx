import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import CategoryListHeader from "../components/CategoryListHeader";
import { createCategoryListHeaderPage } from "./CategoryListHeader.page";

describe("CategoryListHeader", () => {
  it("renders the create-category link pointing at the create route", () => {
    render(<CategoryListHeader />);
    const categoryListHeaderPage =
      createCategoryListHeaderPage();

    expect(
      categoryListHeaderPage.getCreateLink()
    ).toHaveAttribute(
      "href",
      PATHS.ADMINISTRATION.CATEGORIES_NEW
    );
  });
});
