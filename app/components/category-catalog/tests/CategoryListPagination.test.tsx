import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryListPagination from "../components/CategoryListPagination";
import { resolveCategoryListPageHref } from "../utils/resolveCategoryListPageHref";
import { createCategoryListPaginationPage } from "./CategoryListPagination.page";

describe("CategoryListPagination", () => {
  it("renders nothing when every category fits in one page", () => {
    render(
      <CategoryListPagination
        currentPage={1}
        pageCount={1}
      />
    );
    const paginationPage =
      createCategoryListPaginationPage();

    expect(paginationPage.getNavigation()).toBeNull();
  });

  it("shows only the next link on the first page", () => {
    render(
      <CategoryListPagination
        currentPage={1}
        pageCount={3}
      />
    );
    const paginationPage =
      createCategoryListPaginationPage();

    expect(
      paginationPage.getStatus("Página 1 de 3")
    ).toBeInTheDocument();
    expect(paginationPage.getPreviousLink()).toBeNull();
    expect(paginationPage.getNextLink()).toHaveAttribute(
      "href",
      resolveCategoryListPageHref(2)
    );
  });

  it("shows both links on a middle page", () => {
    render(
      <CategoryListPagination
        currentPage={2}
        pageCount={3}
      />
    );
    const paginationPage =
      createCategoryListPaginationPage();

    expect(
      paginationPage.getPreviousLink()
    ).toHaveAttribute(
      "href",
      resolveCategoryListPageHref(1)
    );
    expect(paginationPage.getNextLink()).toHaveAttribute(
      "href",
      resolveCategoryListPageHref(3)
    );
  });

  it("shows only the previous link on the last page", () => {
    render(
      <CategoryListPagination
        currentPage={3}
        pageCount={3}
      />
    );
    const paginationPage =
      createCategoryListPaginationPage();

    expect(
      paginationPage.getPreviousLink()
    ).toBeInTheDocument();
    expect(paginationPage.getNextLink()).toBeNull();
  });
});
