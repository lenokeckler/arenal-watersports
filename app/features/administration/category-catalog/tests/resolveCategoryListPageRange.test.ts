import { describe, expect, it } from "vitest";
import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";
import { resolveCategoryListPageRange } from "../utils/resolveCategoryListPageRange";

describe("resolveCategoryListPageRange", () => {
  it("starts the first page at the first row", () => {
    expect(
      resolveCategoryListPageRange(
        CATEGORY_LIST_PAGINATION.FIRST_PAGE
      )
    ).toEqual({
      from: 0,
      to: CATEGORY_LIST_PAGINATION.PAGE_SIZE - 1,
    });
  });

  it("starts the second page right after the first one", () => {
    expect(resolveCategoryListPageRange(2)).toEqual({
      from: CATEGORY_LIST_PAGINATION.PAGE_SIZE,
      to: CATEGORY_LIST_PAGINATION.PAGE_SIZE * 2 - 1,
    });
  });
});
