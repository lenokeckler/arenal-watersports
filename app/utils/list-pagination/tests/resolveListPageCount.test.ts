import { describe, expect, it } from "vitest";
import { LIST_PAGINATION } from "../constants/ListPagination.constants";
import { resolveListPageCount } from "../resolveListPageCount";

describe("resolveListPageCount", () => {
  it("returns zero pages for an empty catalog", () => {
    expect(resolveListPageCount(0)).toBe(0);
  });

  it("keeps a full page as one page", () => {
    expect(
      resolveListPageCount(LIST_PAGINATION.PAGE_SIZE)
    ).toBe(1);
  });

  it("adds a page for the first row past a full page", () => {
    expect(
      resolveListPageCount(LIST_PAGINATION.PAGE_SIZE + 1)
    ).toBe(2);
  });
});
