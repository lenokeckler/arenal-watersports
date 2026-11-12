import { describe, expect, it } from "vitest";
import { LIST_PAGINATION } from "../constants/ListPagination.constants";
import { resolveListPage } from "../resolveListPage";

const THIRD_PAGE = 3;

describe("resolveListPage", () => {
  it("returns the requested page when it is a positive integer", () => {
    expect(resolveListPage(String(THIRD_PAGE))).toBe(
      THIRD_PAGE
    );
  });

  it("uses the first element when the parameter is repeated", () => {
    expect(resolveListPage([String(THIRD_PAGE), "5"])).toBe(
      THIRD_PAGE
    );
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
    expect(resolveListPage(pageParam)).toBe(
      LIST_PAGINATION.FIRST_PAGE
    );
  });
});
