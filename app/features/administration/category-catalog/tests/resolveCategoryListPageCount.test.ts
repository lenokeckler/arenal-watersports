import { describe, expect, it } from "vitest";
import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";
import { resolveCategoryListPageCount } from "../utils/resolveCategoryListPageCount";

describe("resolveCategoryListPageCount", () => {
  it("returns zero pages for an empty catalog", () => {
    expect(resolveCategoryListPageCount(0)).toBe(0);
  });

  it("keeps a full page as one page", () => {
    expect(
      resolveCategoryListPageCount(
        CATEGORY_LIST_PAGINATION.PAGE_SIZE
      )
    ).toBe(1);
  });

  it("adds a page for the first row past a full page", () => {
    expect(
      resolveCategoryListPageCount(
        CATEGORY_LIST_PAGINATION.PAGE_SIZE + 1
      )
    ).toBe(2);
  });
});
