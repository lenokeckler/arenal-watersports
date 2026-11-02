import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ListPagination from "../ListPagination";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { createListPaginationPage } from "./ListPagination.page";
import {
  LIST_PAGINATION_BASE_PATH,
  LIST_PAGINATION_NAV_LABEL,
} from "./ListPagination.constants";

describe("ListPagination", () => {
  it("renders nothing when every row fits in one page", () => {
    render(
      <ListPagination
        currentPage={1}
        basePath={LIST_PAGINATION_BASE_PATH}
        navLabel={LIST_PAGINATION_NAV_LABEL}
        pageCount={1}
      />
    );
    const paginationPage = createListPaginationPage();

    expect(paginationPage.getNavigation()).toBeNull();
  });

  it("shows only the next link on the first page", () => {
    render(
      <ListPagination
        currentPage={1}
        basePath={LIST_PAGINATION_BASE_PATH}
        navLabel={LIST_PAGINATION_NAV_LABEL}
        pageCount={3}
      />
    );
    const paginationPage = createListPaginationPage();

    expect(
      paginationPage.getStatus("Página 1 de 3")
    ).toBeInTheDocument();
    expect(paginationPage.getPreviousLink()).toBeNull();
    expect(paginationPage.getNextLink()).toHaveAttribute(
      "href",
      resolveListPageHref(LIST_PAGINATION_BASE_PATH, 2)
    );
  });

  it("shows both links on a middle page", () => {
    render(
      <ListPagination
        currentPage={2}
        basePath={LIST_PAGINATION_BASE_PATH}
        navLabel={LIST_PAGINATION_NAV_LABEL}
        pageCount={3}
      />
    );
    const paginationPage = createListPaginationPage();

    expect(
      paginationPage.getPreviousLink()
    ).toHaveAttribute(
      "href",
      resolveListPageHref(LIST_PAGINATION_BASE_PATH, 1)
    );
    expect(paginationPage.getNextLink()).toHaveAttribute(
      "href",
      resolveListPageHref(LIST_PAGINATION_BASE_PATH, 3)
    );
  });

  it("shows only the previous link on the last page", () => {
    render(
      <ListPagination
        currentPage={3}
        basePath={LIST_PAGINATION_BASE_PATH}
        navLabel={LIST_PAGINATION_NAV_LABEL}
        pageCount={3}
      />
    );
    const paginationPage = createListPaginationPage();

    expect(
      paginationPage.getPreviousLink()
    ).toBeInTheDocument();
    expect(paginationPage.getNextLink()).toBeNull();
  });
});
