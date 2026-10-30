import { describe, expect, it } from "vitest";
import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";
import { resolveCategoryListPage } from "../utils/resolveCategoryListPage";

const THIRD_PAGE = 3;

describe("resolveCategoryListPage", () => {
  it("returns the requested page when it is a positive integer", () => {
    expect(
      resolveCategoryListPage(String(THIRD_PAGE))
    ).toBe(THIRD_PAGE);
  });

  it("uses the first element when the parameter is repeated", () => {
    expect(
      resolveCategoryListPage([String(THIRD_PAGE), "5"])
    ).toBe(THIRD_PAGE);
  });

  it.each([
    undefined,
    "",
    "0",
    "-2",
    "1.5",
    "abc",
    "1e400",
  ])("falls back to the first page for %s", (pageParam) => {
    expect(resolveCategoryListPage(pageParam)).toBe(
      CATEGORY_LIST_PAGINATION.FIRST_PAGE
    );
  });
});
